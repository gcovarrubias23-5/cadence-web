const KEY = 'cadence.weightLog'
const MONTH_MS = 30 * 24 * 60 * 60 * 1000

function loadLogs() {
  try {
    const rows = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(rows) ? [...rows].sort((a, b) => String(a.date).localeCompare(String(b.date))) : []
  } catch {
    return []
  }
}

function startedAt() {
  try {
    const trial = localStorage.getItem('cadence.trialStart')
    if (trial) {
      const t = new Date(trial.replace(/^"|"$/g, '')).getTime()
      if (Number.isFinite(t)) return t
    }
    const profile = JSON.parse(localStorage.getItem('cadence.profile') || '{}')
    const stamp = profile.startedAt || profile.goalReview
    if (stamp) {
      const t = new Date(stamp).getTime()
      if (Number.isFinite(t)) return t
    }
  } catch {}
  return Date.now()
}

export function inFirstMonth(now = Date.now()) {
  return now - startedAt() < MONTH_MS
}

function toLb(row, delta) {
  if (!row) return delta
  return row.kg ? delta * 2.20462 : delta
}

function unitLabel(row) {
  return row?.kg ? 'kg' : 'lb'
}

function pickMove({ lb, platePct, goalId, thinWeight }) {
  if (thinWeight) return 'right'
  if (goalId === 'lose') {
    if (lb <= -1.6 && platePct >= 45) return 'heavy'
    if (lb >= 0.7 && platePct >= 55) return 'heavy'
    return 'right'
  }
  if (goalId === 'strong') {
    if (lb <= -0.6 && platePct >= 50) return 'hungry'
    if (lb >= 1.8 && platePct >= 55) return 'heavy'
    return 'right'
  }
  if (lb <= -0.8 && platePct >= 50) return 'hungry'
  if (lb >= 0.8 && platePct >= 55) return 'heavy'
  return 'right'
}

export function adaptWeek({ platePct = 0, goalId = 'hold' } = {}) {
  const logs = loadLogs()
  const last = logs[logs.length - 1]
  const prev = logs.length >= 2 ? logs[logs.length - 2] : null
  const thinWeight = logs.length < 2
  const raw = thinWeight ? 0 : last.value - prev.value
  const lb = thinWeight ? 0 : toLb(last, raw)
  const shown = Math.round(Math.abs(raw) * 10) / 10
  const unit = unitLabel(last) || 'lb'
  const move = pickMove({ lb, platePct, goalId, thinWeight })
  const label = { hungry: 'a little more', right: 'stay', heavy: 'ease off' }[move]
  const plates = `Plates were ${Math.round(platePct)}%.`
  let weightLine = 'No weight line this week.'
  if (!thinWeight) {
    if (raw < -0.05) weightLine = `Weight eased ${shown} ${unit} this week.`
    else if (raw > 0.05) weightLine = `Weight climbed ${shown} ${unit} this week.`
    else weightLine = 'Weight held this week.'
  }
  const why = `${weightLine} ${plates} Suggested: ${label}.`
  return {
    move,
    label,
    why,
    platePct: Math.round(platePct),
    thin: thinWeight,
    firstMonth: inFirstMonth(),
    goalId,
    lb,
  }
}
