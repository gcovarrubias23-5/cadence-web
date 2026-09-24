const START = 'cadence.trialStart'
const PLAN = 'cadence.plan'
const DAYS = 14

export function startTrial() {
  const now = new Date().toISOString()
  try {
    if (!localStorage.getItem(START)) localStorage.setItem(START, now)
  } catch {}
  return now
}

export function trialDaysLeft(now = Date.now()) {
  try {
    const raw = localStorage.getItem(START)
    if (!raw) return DAYS
    const t = new Date(raw).getTime()
    if (!Number.isFinite(t)) return DAYS
    const left = DAYS - Math.floor((now - t) / 86400000)
    return Math.max(0, left)
  } catch {
    return DAYS
  }
}

export function setPlan(id) {
  try { localStorage.setItem(PLAN, id) } catch {}
}

export function readPlan() {
  try { return localStorage.getItem(PLAN) || 'trial' } catch { return 'trial' }
}
