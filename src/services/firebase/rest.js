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