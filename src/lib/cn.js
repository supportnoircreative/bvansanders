/**
 * Tiny className combiner. Joins truthy values and dedupes.
 */
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default cn;