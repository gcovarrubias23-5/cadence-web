import { portionFromPantry } from './pantry.js'
import { slotGoal } from './macros.js'

function scaleLine(line, factor) {
  return {
    ...line,
    grams: line.grams * factor,
    protein: line.protein * factor,
    carbs: line.carbs * factor,
    fat: line.fat * factor,
  }
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
  const line = { ...portionFromPantry(item, item.base), kind: item.kind }
  return fitLinesToSlot([...lines, line], target)
}

export function targetFor(goal, slotId) {
  return slotGoal(goal, slotId)
}
