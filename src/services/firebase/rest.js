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

/**
 * Fetch a single product's metadata (title/description) as raw JSON.
 * - Returns { title, description } when the document exists.
 * - Returns null only when the document genuinely doesn't exist (404).
 * - Returns FALLBACK_METADATA when the request failed for other reasons.
 */
export async function fetchProductMetadata(productId) {
  if (!PROJECT_ID || !API_KEY || !productId) return FALLBACK_METADATA;

  let response;
  try {
    response = await fetch(
      `${BASE_URL}/products/${encodeURIComponent(productId)}?key=${API_KEY}`,
      { signal: AbortSignal.timeout(8000) }
    );
  } catch (error) {
    console.error("[firebase rest] fetchProductMetadata:", error?.message ?? error);
    return FALLBACK_METADATA;
  }

  if (response.status === 404) return null;

  const payload = (await response.json().catch(() => null));
  if (!response.ok || !payload) {
    console.error(
      "[firebase rest] fetchProductMetadata: unexpected",
      response.status
    );
    return FALLBACK_METADATA;
  }

  // A GET of a single document returns the Document object directly;
  // wrapped forms (`document`) appear in commit/runQuery responses.
  const doc = payload.document ?? payload;
  const fields = doc?.fields;
  const title = stringField(fields, "title");
  if (!title) return null;

  return {
    title,
    description: stringField(fields, "description") ?? "",
  };
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