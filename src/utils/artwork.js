import COLORS from "@/constants/colors";

const ART_BURSTS = [
  [COLORS.orange, COLORS.yellow],
  [COLORS.purple, COLORS.orange],
  [COLORS.blue, COLORS.yellow],
  [COLORS.ink, COLORS.orange],
  [COLORS.purple, COLORS.blue],
  [COLORS.yellow, COLORS.purple],
  [COLORS.orange, COLORS.ink],
  [COLORS.blue, COLORS.ink],
  [COLORS.yellow, COLORS.orange],
];

export const ART_BURST_COUNT = ART_BURSTS.length;

/**
 * Placeholder art treatment used while catalog photography is pending.
 * Mirrors the original prototype's procedural gradients.
 */
export function getArtGradient(index) {
  const [from, to] = ART_BURSTS[Math.abs(index) % ART_BURSTS.length];
  return `radial-gradient(circle at 30% 30%, ${from} 0%, ${to} 55%, ${COLORS.ink} 100%)`;
}

export default getArtGradient;