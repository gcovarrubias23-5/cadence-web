import { portionFromPantry } from './pantry.js'
import { slotGoal } from './macros.js'

function scaleLine(line, factor) {
  const grams = line.grams * factor
  return {
    ...line,
    grams,
    protein: line.protein * factor,
    carbs: line.carbs * factor,
    fat: line.fat * factor,
    house: houseFor(line, grams),
  }
}

export function houseFor(item, grams) {
  const g = Math.max(1, Number(grams) || item.base || 100)
  const base = item.base || 100
  const raw = item.house || item.name
  const f = g / base
  const m = String(raw).match(/^(\d+(?:\.\d+)?)\s+(.*)$/)
  if (m) {
    const n = Number(m[1]) * f
    const pretty = n >= 10 ? Math.round(n) : Math.round(n * 2) / 2
    return `${pretty} ${m[2]} · ${Math.round(g)} g`
  }
  return `${Math.round(g)} g · ${raw}`
}

export function leftoverOf(lines, target) {
  const filled = { protein: 0, carbs: 0, fat: 0 }
  lines.forEach((f) => {
    if (f.kind === 'free') return
    if (f.kind === 'protein') filled.protein += f.protein
    if (f.kind === 'carbs') filled.carbs += f.carbs
    if (f.kind === 'fat') filled.fat += f.fat
  })
  return {
    protein: Math.max(0, target.protein - filled.protein),
    carbs: Math.max(0, target.carbs - filled.carbs),
    fat: Math.max(0, target.fat - filled.fat),
  }
}

export function gramsToHit(item, leftover) {
  if (!item || item.kind === 'free') return item?.base || 80
  const per100 = Number(item[item.kind]) || 0
  if (per100 < 0.2) return item.base || 80
  const need = Math.max(leftover, 0.5)
  return (need / per100) * 100
}

export function fitLinesToSlot(lines, target) {
  let next = lines.map((line) => ({ ...line }))
  ;['protein', 'carbs', 'fat'].forEach((key) => {
    const has = next.some((line) => line.kind === key)
    if (!has) return
    const sum = next.reduce((n, line) => (line.kind === key ? n + line[key] : n), 0)
    const factor = target[key] / Math.max(sum, 0.05)
    next = next.map((line) => (line.kind === key ? scaleLine(line, factor) : line))
  })
  return next
}

export function addFitted(lines, item, target) {
  const left = leftoverOf(lines, target)
  const grams = item.kind === 'free' ? item.base : gramsToHit(item, left[item.kind] || 0)
  const line = { ...portionFromPantry(item, grams), kind: item.kind, house: houseFor(item, grams) }
  return fitLinesToSlot([...lines, line], target)
}

export function targetFor(goal, slotId) {
  return slotGoal(goal, slotId)
}
