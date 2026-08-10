/**
 * Build the contact-page URL for an inquiry about a specific piece.
 * Keeps the item details in the query string so the contact form can
 * pre-fill the message and the studio email shows what's being asked about.
 */
export function inquiryHref({ item = "", size = "", kind = "" } = {}) {
  const params = new URLSearchParams();
  if (item) params.set("item", item);
  if (size) params.set("size", size);
  if (kind) params.set("kind", kind);
  const query = params.toString();
  return query ? `/contact?${query}` : "/contact";
}

export default inquiryHref;