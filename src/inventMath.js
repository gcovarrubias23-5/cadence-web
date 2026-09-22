import { PANTRY, portionFromPantry } from './pantry.js'
import { slotGoal } from './macros.js'

function srcOf(item) {
  return PANTRY.find((p) => p.name === item.name) || item
}

export function houseFor(item, grams) {
  const src = srcOf(item)
  const g = Math.max(1, Number(grams) || src.base || 100)
  const base = src.base || 100
  const raw = src.house || src.name
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
  const src = srcOf(item)
  if (!src || src.kind === 'free') return src?.base || 80
  const per100 = Number(src[src.kind]) || 0
  if (per100 < 0.2) return src.base || 80
  return (Math.max(leftover, 0.5) / per100) * 100
}

export function lineFrom(item, grams) {
  const src = srcOf(item)
  const g = Number(grams) || src.base
  return {
    ...portionFromPantry(src, g),
    kind: src.kind,
    house: houseFor(src, g),
    base: src.base,
  }
}

export function addServing(lines, item) {
  return [...lines, lineFrom(item, item.base)]
}

export function bumpLine(lines, index, dir) {
  return lines.map((line, i) => {
    if (i !== index || line.kind === 'free') return line
    const step = (line.base || 50) / 2
    return lineFrom(line, Math.max(step, line.grams + dir * step))
  })
}

export function fillRest(lines, index, target) {
  const line = lines[index]
  if (!line || line.kind === 'free') return lines
  const others = leftoverOf(lines.filter((_, i) => i !== index), target)
  return lines.map((row, i) => (i === index ? lineFrom(row, gramsToHit(row, others[row.kind])) : row))
}

export function targetFor(goal, slotId) {
  return slotGoal(goal, slotId)
}

export function fitLinesToSlot(lines) {
  return lines
}
