import { DEFAULT_MARKS } from './checkin.js'

export { DEFAULT_MARKS }

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
  return [day.breakfast, day.snack1, day.lunch, day.snack2, day.dinner, day.snack3].filter(Boolean)
}

export function dayTotals(day) {
  return sumFoods(mealsOf(day).flatMap((meal) => eatenFoods(meal.foods)))
}

export function scaleForGoal(day, goal) {
  const base = dayTotals(day)
  const byProtein = goal.protein / Math.max(base.protein, 1)
  const byKcal = goal.kcal / Math.max(kcalOf(base), 1)
  let factor = byProtein
  if (goal.kcal > 0 && kcalOf(base) * factor > goal.kcal * 1.2) {
    factor = (byProtein + byKcal) / 2
  }
  return factor
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
    const factor = factorByDay[day.id] || 1
    mealsOf(day).forEach((meal) => {
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
