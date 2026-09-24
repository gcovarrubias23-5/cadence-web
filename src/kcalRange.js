export const KCAL_BAND = 50

export function formatKcalRange(n) {
  const low = Math.round(Number(n) || 0)
  return `${low}–${low + KCAL_BAND}`
}
