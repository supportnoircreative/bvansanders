export function formatUSD(value) {
  if (typeof value !== "number") return value;
  return "$" + value.toLocaleString("en-US");
}

export function pluralize(count, single, plural = single + "s") {
  return count === 1 ? single : plural;
}

export function formatSize(width, height, unit = "in") {
  const w = Number(width);
  const h = Number(height);
  if (unit === "in") return `${w}" × ${h}"`;
  if (unit === "cm" || unit === "ft") return `${w} × ${h} ${unit}`;
  return `${w} × ${h} ${unit}`;
}

const format = { formatUSD, pluralize, formatSize };

export default format;