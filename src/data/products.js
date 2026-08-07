export const ORIGINALS = [
  {
    id: "static-bloom-original",
    title: "Static Bloom",
    size: '24" x 30"',
    dimensions: '24" x 30"',
    price: 2400,
    sold: false,
    kind: "original",
    frameLabel: "Original",
    description:
      "A storm of neon blooms pressed tight against the canvas. Layered acrylic impasto catches the light from every angle and spills the palette past the frame, as if the color can't be held still.",
  },
  {
    id: "neon-overload-original",
    title: "Neon Overload",
    size: '30" x 40"',
    dimensions: '30" x 40"',
    price: 3600,
    sold: true,
    kind: "original",
    frameLabel: "Original",
    description:
      "Saturated neon pushed to full volume — the studio palette at its loudest. A study in how far color can go before it stops whispering and starts shouting.",
  },
  {
    id: "corner-store-icon-original",
    title: "Corner Store Icon",
    size: '20" x 24"',
    dimensions: '20" x 24"',
    price: 1800,
    sold: false,
    kind: "original",
    frameLabel: "Original",
    description:
      "A storefront reduced to geometry: signage, brick and awning rebuilt in warm, deliberate acrylics. A bright, affectionate portrait of the everyday corner.",
  },
  {
    id: "after-the-signal-original",
    title: "After the Signal",
    size: '36" x 36"',
    dimensions: '36" x 36"',
    price: 4200,
    sold: false,
    kind: "original",
    frameLabel: "Original",
    description:
      "Painted after the lights went out. Cool blue and violet fields settle over the memory of screens, the leftover glow hanging low in the canvas like weather.",
  },
  {
    id: "rerun-culture-original",
    title: "Rerun Culture",
    size: '24" x 24"',
    dimensions: '24" x 24"',
    price: 2100,
    sold: true,
    kind: "original",
    frameLabel: "Original",
    description:
      "The same gesture repeated until it blurs into pattern. Pass after pass of acrylic stacking the loop into a palimpsest of what we keep watching anyway.",
  },
  {
    id: "channel-bleed-original",
    title: "Channel Bleed",
    size: '30" x 30"',
    dimensions: '30" x 30"',
    price: 2900,
    sold: false,
    kind: "original",
    frameLabel: "Original",
    description:
      "Broadcast gradients where the channels run together. Soft orange and blue bleed edge-to-edge like a signal lingering across tuned-static, tuned low and left on.",
  },
];

export const PRINTS = [
  {
    id: "static-bloom-print",
    title: "Static Bloom",
    size: 'Giclée · 18" x 24"',
    dimensions: '18" x 24"',
    price: 145,
    sold: false,
    kind: "print",
    frameLabel: "Giclée",
    description:
      "Archival reproduction of the painting Static Bloom, printed as a museum-quality giclée on heavyweight cotton paper. Color-matched in the studio, then hand-signed and numbered for the edition.",
  },
  {
    id: "neon-overload-print",
    title: "Neon Overload",
    size: 'Giclée · 18" x 24"',
    dimensions: '18" x 24"',
    price: 145,
    sold: false,
    kind: "print",
    frameLabel: "Giclée",
    description:
      "Archival reproduction of the painting Neon Overload on heavyweight cotton paper. Color-matched in the studio and issued as a limited, hand-signed and numbered edition.",
  },
  {
    id: "corner-store-icon-print",
    title: "Corner Store Icon",
    size: 'Giclée · 16" x 20"',
    dimensions: '16" x 20"',
    price: 110,
    sold: true,
    kind: "print",
    frameLabel: "Giclée",
    description:
      "Archival reproduction of the painting Corner Store Icon on heavyweight cotton paper. Studio color-matched, printed in a limited run and hand-signed by the artist.",
  },
  {
    id: "after-the-signal-print",
    title: "After the Signal",
    size: 'Giclée · 24" x 30"',
    dimensions: '24" x 30"',
    price: 195,
    sold: false,
    kind: "print",
    frameLabel: "Giclée",
    description:
      "Archival reproduction of the painting After the Signal on heavyweight cotton paper. Color-matched in the studio and issued as a limited, hand-signed and numbered edition.",
  },
  {
    id: "rerun-culture-print",
    title: "Rerun Culture",
    size: 'Giclée · 16" x 20"',
    dimensions: '16" x 20"',
    price: 110,
    sold: false,
    kind: "print",
    frameLabel: "Giclée",
    description:
      "Archival reproduction of the painting Rerun Culture on heavyweight cotton paper. Studio color-matched, with a limited run and hand-signed edition certificate.",
  },
  {
    id: "channel-bleed-print",
    title: "Channel Bleed",
    size: 'Giclée · 18" x 24"',
    dimensions: '18" x 24"',
    price: 145,
    sold: false,
    kind: "print",
    frameLabel: "Giclée",
    description:
      "Archival reproduction of the painting Channel Bleed on heavyweight cotton paper. Color-matched in the studio and printed as a limited, hand-signed and numbered edition.",
  },
];

export const PRODUCTS = [...ORIGINALS, ...PRINTS];

export const FEATURED_PRODUCTS = [
  ORIGINALS[0],
  PRINTS[0],
  ORIGINALS[3],
];

export default PRODUCTS;