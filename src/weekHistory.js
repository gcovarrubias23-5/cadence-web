const KEY = 'cadence.weekHistory'

export function mondayOf(d = new Date()) {
  const x = new Date(d)
  const day = x.getDay()
  const diff = day === 0 ? -6 : 1 - day
  x.setDate(x.getDate() + diff)
  return x.toISOString().slice(0, 10)
}

export function weekRange(mondayIso) {
  const start = new Date(`${mondayIso || mondayOf()}T12:00:00`)
  if (Number.isNaN(start.getTime())) return 'This week'
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  const a = start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  const b = end.toLocaleDateString(undefined, { day: 'numeric' })
  return `${a}–${b}`
}

export function loadHistory() {
  try {
    const rows = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

function save(rows) {
  try { localStorage.setItem(KEY, JSON.stringify(rows.slice(0, 16))) } catch {}
}

function rowFrom(stats, extra = {}) {
  const plates = stats.plates || 0
  const plateGoal = stats.plateGoal || 42
  const drinks = stats.drinks || 0
  const waterGoal = stats.waterGoal || 56
  return {
    id: extra.id || mondayOf(),
    monday: extra.monday || mondayOf(),
    open: extra.open !== false,
    move: extra.move || '',
    plates,
    plateGoal,
    drinks,
    waterGoal,
    platePct: Math.round((plates / Math.max(plateGoal, 1)) * 100),
    waterPct: Math.round((drinks / Math.max(waterGoal, 1)) * 100),
    at: extra.at || new Date().toISOString(),
  }
}

export function writeCurrentWeek(stats) {
  const id = mondayOf()
  const hist = loadHistory().filter((h) => h.id !== id && h.monday !== id)
  save([rowFrom(stats, { id, monday: id, open: true }), ...hist])
}

export function archiveWeek(stats, move = '') {
  const monday = mondayOf()
  const closed = rowFrom(stats, { id: monday, monday, open: false, move, at: new Date().toISOString() })
  const hist = loadHistory().filter((h) => h.id !== monday && h.monday !== monday)
  save([closed, ...hist])
  return loadHistory()
}

export function closedWeeks() {
  const seen = new Set()
  return loadHistory()
    .filter((h) => !h.open)
    .filter((h) => {
      const key = h.monday || h.id
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
}
