/**
 * Lightweight Firestore access via the REST API, used only by server
 * components (e.g. generateMetadata) where the web SDK's auth module is
 * not available. Reads rely on the public security rules — products are
 * publicly readable. No Firebase SDK imported here.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Used when metadata can't be resolved due to a transient failure — better
// than mislabeling an existing product as "not found". Only a real HTTP
// 404 from Firestore means the product is missing.
const FALLBACK_METADATA = { title: "Artwork" };

function stringField(fields, name) {
  return fields?.[name]?.stringValue ?? null;
}

function numericField(fields, name) {
  const value = fields?.[name];
  if (value?.integerValue != null) return Number(value.integerValue);
  if (value?.doubleValue != null) return Number(value.doubleValue);
  return null;
}

function booleanField(fields, name) {
  const value = fields?.[name]?.booleanValue;
  return typeof value === "boolean" ? value : null;
}

/**
 * Parse a Firestore REST document into a serializable product object.
 * Only fields the storefront actually uses are read.
 */
export function parseProductDoc(doc) {
  const fields = doc?.fields;
  if (!fields) return null;
  return {
    id: doc.name?.split("/").pop() ?? null,
    title: stringField(fields, "title"),
    description: stringField(fields, "description") ?? "",
    price: numericField(fields, "price"),
    size: stringField(fields, "size") ?? "",
    dimensions: stringField(fields, "dimensions") ?? "",
    kind: stringField(fields, "kind") ?? null,
    frameLabel: stringField(fields, "frameLabel") ?? "",
    medium: stringField(fields, "medium") ?? "",
    edition: stringField(fields, "edition") ?? "",
    image: stringField(fields, "image") ?? null,
    sold: booleanField(fields, "sold") ?? false,
    featured: booleanField(fields, "featured") ?? false,
    isActive: booleanField(fields, "isActive") ?? true,
    createdAt: fields?.createdAt?.timestampValue ?? null,
    updatedAt: fields?.updatedAt?.timestampValue ?? null,
  };
}

async function fetchDoc(url) {
  let response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  } catch (error) {
    console.error("[firebase rest] request failed:", error?.message ?? error);
    return { status: 0, payload: null };
  }
  if (response.status === 404) return { status: 404, payload: null };
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload) {
    console.error("[firebase rest] unexpected response:", response.status);
    return { status: response.status, payload: null };
  }
  return { status: response.status, payload };
}

/**
 * Fetch a single product document as plain JSON. Returns the parsed
 * product (title, description, price, image, kind, sold, dimensions,
 * medium, edition, …) when it exists, null on a genuine 404, or
 * FALLBACK_METADATA when the request fails for other reasons.
 */
export async function fetchProductMetadata(productId) {
  if (!PROJECT_ID || !API_KEY || !productId) return FALLBACK_METADATA;

  const { status, payload } = await fetchDoc(
    `${BASE_URL}/products/${encodeURIComponent(productId)}?key=${API_KEY}`
  );
  if (status === 404) return null;
  if (!payload) return FALLBACK_METADATA;

  // A GET of a single document returns the Document object directly;
  // wrapped forms (`document`) appear in commit/runQuery responses.
  const doc = payload.document ?? payload;
  const product = parseProductDoc(doc);
  if (!product?.title) return null;

  return product;
}

/**
 * List all product documents via the Firestore REST API (products are
 * publicly readable). Follows pagination tokens. Used by server-side
 * code (e.g. the sitemap) where the web SDK isn't available. Returns []
 * when the request fails.
 */
export async function fetchAllProducts({ pageSize = 300 } = {}) {
  if (!PROJECT_ID || !API_KEY) return [];
  const products = [];
  let nextToken = null;

  do {
    const params = new URLSearchParams({ key: API_KEY, pageSize: String(pageSize) });
    if (nextToken) params.set("pageToken", nextToken);

    const payload = await fetchDoc(
      `${BASE_URL}/products?${params.toString()}`
    );
    if (!payload) break;

    for (const doc of payload.documents ?? []) {
      const product = parseProductDoc(doc);
      if (product?.id && product.title) products.push(product);
    }
    nextToken = payload.nextPageToken ?? null;
  } while (nextToken);

  return products;
}

/**
 * Verify a Firebase ID token server-side via the Identity Toolkit REST
 * API. Returns the user's uid when the token is valid, otherwise null.
 * Keeps server routes dependency-free of the Firebase web SDK.
 */
export async function verifyIdToken(idToken) {
  if (!API_KEY || !idToken) return null;
  let response;
  try {
    response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );
  } catch (error) {
    console.error("[firebase rest] verifyIdToken:", error?.message ?? error);
    return null;
  }
  if (!response.ok) return null;
  const payload = (await response.json().catch(() => null));
  return payload?.users?.[0]?.localId ?? null;
}

/**
 * Fetch catalog prices for a set of product ids via the Firestore REST
 * API (products are publicly readable). Used by server routes to
 * re-validate cart totals so clients can't change what they pay. Products
 * that can't be resolved are omitted; callers decide how to handle that.
 */
export async function fetchProductsById(productIds) {
  const ids = [...new Set(productIds ?? [])].filter(Boolean);
  if (!PROJECT_ID || !API_KEY || ids.length === 0) return new Map();
  const results = new Map();
  await Promise.all(
    ids.map(async (productId) => {
      try {
        const response = await fetch(
          `${BASE_URL}/products/${encodeURIComponent(productId)}?key=${API_KEY}`,
          { signal: AbortSignal.timeout(8000) }
        );
        if (!response.ok) return;
        const payload = await response.json();
        const doc = payload.document ?? payload;
        const fields = doc?.fields;
        const title = stringField(fields, "title");
        const price = numericField(fields, "price");
        if (title && price != null) results.set(productId, { title, price });
      } catch (error) {
        console.error("[firebase rest] fetchProductsById:", error?.message ?? error);
      }
    })
  );
  return results;
}