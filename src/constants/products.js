export const MEDIUM_BY_KIND = {
  print: "Giclée on gloss cover stock",
  original: "Acrylic on canvas",
  gallery: "Acrylic on canvas",
};

export const EDITION_BY_KIND = {
  print: "Signed",
  original: "One of one",
  gallery: "One of one",
};

export function defaultMedium(kind) {
  return MEDIUM_BY_KIND[kind] ?? MEDIUM_BY_KIND.original;
}

export function defaultEdition(kind) {
  return EDITION_BY_KIND[kind] ?? EDITION_BY_KIND.original;
}