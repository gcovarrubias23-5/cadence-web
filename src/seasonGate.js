const KEY = 'cadence.goalReview'
const DAYS = 90

export function readReview() {
  try {
    return localStorage.getItem(KEY) || JSON.parse(localStorage.getItem('cadence.profile') || '{}').goalReview || null
  } catch {
    return null
  }
}

export function writeReview(iso) {
  const value = iso || new Date().toISOString()
  try { localStorage.setItem(KEY, value) } catch {}
  return value
}

export function daysSinceReview(from = readReview()) {
  if (!from) return 0
  const then = new Date(from).getTime()
  if (!then) return 0
  return Math.floor((Date.now() - then) / 86400000)
}

export function isSeasonDue(from = readReview()) {
  if (!from) return false
  return daysSinceReview(from) >= DAYS
}

export function pretendSeasonDue() {
  const past = new Date(Date.now() - (DAYS + 1) * 86400000).toISOString()
  writeReview(past)
  return past
}
