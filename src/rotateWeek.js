import { DEFAULT_WEEK, SLOTS, optionsFor, poolOf } from './plan.js'
import { mondayOf } from './weekHistory.js'
import { readStyle } from './dietStyle.js'

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

// Builds a week with no meal twice in one day, and spreads each list of meals
// across the week: the least-used meal is picked first, and the seed only
// breaks ties, so a meal repeats at most ceil(uses / meals in that list) times.
// The three snacks share one list. If a list runs out for a day (heavy skips),
// the slot is left empty ("Choose a plate") instead of repeating a meal.
export function buildVariedWeek(custom = [], avoid = [], seed = 1, style = readStyle()) {
  const counts = {}
  const optionCache = {}
  return DEFAULT_WEEK.map((day, di) => {
    const next = { id: day.id, day: day.day }
    const today = new Set()
    SLOTS.forEach((slot, si) => {
      const pool = poolOf(slot.id)
      counts[pool] ||= new Map()
      optionCache[slot.id] ||= optionsFor(slot.id, custom, avoid, style).map((m) => m.id).filter(Boolean)
      const open = optionCache[slot.id].filter((id) => !today.has(id))
      if (!open.length) {
        next[slot.id] = ''
        return
      }
      const used = (id) => counts[pool].get(id) || 0
      const least = Math.min(...open.map(used))
      const ties = open.filter((id) => used(id) === least)
      const id = ties[Math.abs(seed * 13 + di * 7 + si * 5 + seed * di) % ties.length]
      counts[pool].set(id, least + 1)
      today.add(id)
      next[slot.id] = id
    })
    return next
  })
}

export function nextVariedWeek(custom, avoid, seed, style = readStyle()) {
  const n = (Number(seed) || 0) + 1
  return { seed: n, picks: buildVariedWeek(custom, avoid, n, style) }
}
