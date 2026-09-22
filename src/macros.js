import { DEFAULT_MARKS } from './checkin.js'

export { DEFAULT_MARKS }

export const SLOT_SHARE = {
  breakfast: { protein: 15 / 120, carbs: 30 / 150, fat: 0 / 60 },
  snack1: { protein: 15 / 120, carbs: 20 / 150, fat: 15 / 60 },
  lunch: { protein: 30 / 120, carbs: 40 / 150, fat: 15 / 60 },
  snack2: { protein: 15 / 120, carbs: 20 / 150, fat: 0 / 60 },
  dinner: { protein: 30 / 120, carbs: 30 / 150, fat: 15 / 60 },
  snack3: { protein: 15 / 120, carbs: 10 / 150, fat: 15 / 60 },
}

export function kcalOf({ protein, carbs, fat }) {
  return protein * 4 + carbs * 4 + fat * 9
}

export function goalFromMarks(t) {
  return {
    protein: Number(t.protein) || 0,
    carbs: Number(t.carbs) || 0,
    fat: Number(t.fat) || 0,
    kcal: kcalOf({
      protein: Number(t.protein) || 0,
      carbs: Number(t.carbs) || 0,
      fat: Number(t.fat) || 0,
    }),
    mealsPerDay: Number(t.mealsPerDay) || 6,
    weekMark: t.weekMark || 5,
  }
}

export function slotGoal(goal, slotId) {
  const share = SLOT_SHARE[slotId] || { protein: 1 / 6, carbs: 1 / 6, fat: 1 / 6 }
  const protein = goal.protein * share.protein
  const carbs = goal.carbs * share.carbs
  const fat = goal.fat * share.fat
  return { protein, carbs, fat, kcal: kcalOf({ protein, carbs, fat }) }
}

export function eatenFoods(foods) {
  return (foods || []).filter((f) => !f.prep)
}

export function sumFoods(foods) {
  return foods.reduce(
    (acc, f) => ({
      grams: acc.grams + f.grams,
      protein: acc.protein + f.protein,
      carbs: acc.carbs + f.carbs,
      fat: acc.fat + f.fat,
    }),
    { grams: 0, protein: 0, carbs: 0, fat: 0 },
  )
}

export function scaleFood(food, factor) {
  return {
    ...food,
    grams: food.grams * factor,
    protein: food.protein * factor,
    carbs: food.carbs * factor,
    fat: food.fat * factor,
  }
}

export function mealsOf(day) {
  return [
    ['breakfast', day.breakfast],
    ['snack1', day.snack1],
    ['lunch', day.lunch],
    ['snack2', day.snack2],
    ['dinner', day.dinner],
    ['snack3', day.snack3],
  ].filter(([, meal]) => meal)
}

export function dayTotals(day, factors) {
  return sumFoods(
    mealsOf(day).flatMap(([slot, meal]) => {
      const factor = factors?.[slot] || 1
      return eatenFoods(meal.foods).map((food) => scaleFood(food, factor))
    }),
  )
}

export function scaleForSlot(meal, goalForSlot) {
  if (!meal) return 1
  const base = sumFoods(eatenFoods(meal.foods))
  const byProtein = goalForSlot.protein / Math.max(base.protein, 0.5)
  const byCarbs = goalForSlot.carbs / Math.max(base.carbs, 0.5)
  const byKcal = goalForSlot.kcal / Math.max(kcalOf(base), 1)
  let factor = (byProtein * 2 + byCarbs + byKcal) / 4
  if (!Number.isFinite(factor) || factor <= 0) factor = 1
  return Math.min(2.4, Math.max(0.45, factor))
}

export function factorsForDay(day, goal) {
  const next = {}
  mealsOf(day).forEach(([slot, meal]) => {
    next[slot] = scaleForSlot(meal, slotGoal(goal, slot))
  })
  return next
}

export function formatG(n) {
  if (n >= 10) return `${Math.round(n)} g`
  return `${n.toFixed(1)} g`
}

export function formatMacro(n) {
  return `${Math.round(n)}g`
}

export function groceryFromWeek(days, factorByDay) {
  const map = new Map()
  days.forEach((day) => {
    const factors = factorByDay[day.id] || {}
    mealsOf(day).forEach(([slot, meal]) => {
      const factor = factors[slot] || 1
      meal.foods.forEach((food) => {
        if (food.leftover || food.pantry) return
        const key = `${food.aisle}:${food.name}`
        const scaled = scaleFood(food, factor)
        const prev = map.get(key) || { aisle: food.aisle, name: food.name, grams: 0 }
        prev.grams += scaled.grams
        map.set(key, prev)
      })
    })
  })
  const sections = {}
  ;[...map.values()].forEach((item) => {
    if (!sections[item.aisle]) sections[item.aisle] = []
    sections[item.aisle].push(item)
  })
  return Object.entries(sections).map(([name, items]) => ({
    name,
    items: items.sort((a, b) => a.name.localeCompare(b.name)),
  }))
}
