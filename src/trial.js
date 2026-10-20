const START = 'cadence.trialStart'
const PLAN = 'cadence.plan'
export const TRIAL_DAYS = 14
const DAYS = TRIAL_DAYS

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

// What the person can use right now.
//   'subscribed' - a current App Store subscription
//   'trial'      - inside the free two weeks
//   'expired'    - trial over and no subscription: show the paywall
export function accessState(entitlement, now = Date.now()) {
  const daysLeft = trialDaysLeft(now)
  if (entitlement?.active) return { status: 'subscribed', daysLeft, productId: entitlement.productId }
  if (daysLeft > 0) return { status: 'trial', daysLeft, productId: null }
  return { status: 'expired', daysLeft: 0, productId: null }
}
