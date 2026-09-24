import { DEFAULT_WEEK, SLOTS, optionsFor } from './plan.js'
import { mondayOf } from './weekHistory.js'

const SEED_KEY = 'cadence.weekSeed'
const START_KEY = 'cadence.weekStart'

export function loadSeed() {
  try {
    return Number(JSON.parse(localStorage.getItem(SEED_KEY) || '0')) || 0
  } catch {
    return 0
  }
}

export function saveSeed(n) {
  try {
    localStorage.setItem(SEED_KEY, JSON.stringify(n))
    localStorage.setItem(START_KEY, JSON.stringify(mondayOf()))
  } catch {}
}

export function weekTurned() {
  try {
    const start = JSON.parse(localStorage.getItem(START_KEY) || '""')
    return start && start !== mondayOf()
  } catch {
    return false
  }
}

export function buildVariedWeek(custom = [], avoid = [], seed = 1) {
  const used = {}
  SLOTS.forEach((slot) => { used[slot.id] = new Set() })
  return DEFAULT_WEEK.map((day, di) => {
    const next = { id: day.id, day: day.day }
    SLOTS.forEach((slot, si) => {
      const opts = optionsFor(slot.id, custom, avoid)
      const ids = opts.map((m) => m.id).filter(Boolean)
      const fresh = ids.filter((id) => !used[slot.id].has(id))
      const pool = fresh.length ? fresh : ids
      if (!pool.length) {
        next[slot.id] = day[slot.id]
        return
      }
      const idx = Math.abs(seed * 13 + di * 7 + si * 5 + seed * di) % pool.length
      const id = pool[idx]
      used[slot.id].add(id)
      next[slot.id] = id
    })
    return next
  })
}

export function nextVariedWeek(custom, avoid, seed) {
  const n = (Number(seed) || 0) + 1
  return { seed: n, picks: buildVariedWeek(custom, avoid, n) }
}
