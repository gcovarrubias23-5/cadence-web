const KEY = 'cadence.weekHistory'

export function mondayOf(d = new Date()) {
  const x = new Date(d)
  const day = x.getDay()
  const diff = day === 0 ? -6 : 1 - day
  x.setDate(x.getDate() + diff)
  return x.toISOString().slice(0, 10)
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
  try { localStorage.setItem(KEY, JSON.stringify(rows)) } catch {}
}

export function writeCurrentWeek(stats) {
  const id = mondayOf()
  const row = {
    id,
    open: true,
    plates: stats.plates || 0,
    plateGoal: stats.plateGoal || 42,
    drinks: stats.drinks || 0,
    waterGoal: stats.waterGoal || 56,
    platePct: Math.round(((stats.plates || 0) / Math.max(stats.plateGoal || 42, 1)) * 100),
    waterPct: Math.round(((stats.drinks || 0) / Math.max(stats.waterGoal || 56, 1)) * 100),
    at: new Date().toISOString(),
  }
  const hist = loadHistory()
  save([row, ...hist.filter((h) => h.id !== id)].slice(0, 20))
}

export function archiveWeek(stats) {
  const row = {
    id: `${mondayOf()}-done-${Date.now()}`,
    open: false,
    plates: stats.plates || 0,
    plateGoal: stats.plateGoal || 42,
    drinks: stats.drinks || 0,
    waterGoal: stats.waterGoal || 56,
    platePct: Math.round(((stats.plates || 0) / Math.max(stats.plateGoal || 42, 1)) * 100),
    waterPct: Math.round(((stats.drinks || 0) / Math.max(stats.waterGoal || 56, 1)) * 100),
    at: new Date().toISOString(),
  }
  const hist = loadHistory().map((h) => (h.open ? { ...h, open: false } : h))
  save([row, ...hist.filter((h) => h.id !== mondayOf())].slice(0, 20))
  return loadHistory()
}
