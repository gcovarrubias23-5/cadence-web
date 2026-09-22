const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export function isCheckinDue(lastAt, now = Date.now()) {
  if (!lastAt) return true
  const t = new Date(lastAt).getTime()
  if (!Number.isFinite(t)) return true
  return now - t >= WEEK_MS
}

export function daysUntilCheckin(lastAt, now = Date.now()) {
  if (!lastAt) return 0
  const t = new Date(lastAt).getTime()
  if (!Number.isFinite(t)) return 0
  const left = WEEK_MS - (now - t)
  return Math.max(0, Math.ceil(left / (24 * 60 * 60 * 1000)))
}
