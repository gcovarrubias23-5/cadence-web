import { PANTRY } from './pantry.js'
import { FOOD_ALIAS } from './foodAlias.js'

function pantryOf(name) {
  const key = FOOD_ALIAS[name] || name
  return PANTRY.find((p) => p.name === key)
}

function scaleHouse(house, times) {
  const m = String(house || '').match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!m) return house
  const n = Number(m[1]) * times
  const shown = n >= 10 ? Math.round(n) : Math.round(n * 2) / 2
  return `${shown}${m[2]}`
}

export function shopQty(item) {
  const grams = Number(item.grams) || 0
  const src = pantryOf(item.name)
  if (src?.house && src.base) {
    const times = grams / src.base
    if (times > 0.2) return scaleHouse(src.house, times)
  }
  const oz = grams / 28.35
  if (oz >= 16) {
    const lb = oz / 16
    return `${lb >= 10 ? Math.round(lb) : Math.round(lb * 10) / 10} lb`
  }
  if (oz >= 0.5) return `${oz >= 10 ? Math.round(oz) : Math.round(oz * 2) / 2} oz`
  if (grams >= 1) return `${Math.round(grams)} g`
  return 'a little'
}
