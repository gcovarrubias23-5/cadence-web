import { portionFromPantry } from './pantry.js'
import { slotGoal } from './macros.js'

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

export function lineFrom(item, grams) {
  const g = Number(grams) || item.base
  return {
    ...portionFromPantry(item, g),
    kind: item.kind,
    house: houseFor(item, g),
    base: item.base,
  }
}

export function addServing(lines, item) {
  return [...lines, lineFrom(item, item.base)]
}

export function bumpLine(lines, index, dir) {
  return lines.map((line, i) => {
    if (i !== index || line.kind === 'free') return line
    const step = (line.base || 50) / 2
    const grams = Math.max(step, line.grams + dir * step)
    return lineFrom(line, grams)
  })
}

export function fillRest(lines, index, target) {
  const line = lines[index]
  if (!line || line.kind === 'free') return lines
  const others = leftoverOf(lines.filter((_, i) => i !== index), target)
  const grams = gramsToHit(line, others[line.kind])
  return lines.map((row, i) => (i === index ? lineFrom(row, grams) : row))
}

export function targetFor(goal, slotId) {
  return slotGoal(goal, slotId)
}

export function fitLinesToSlot(lines, target) {
  return lines
}
