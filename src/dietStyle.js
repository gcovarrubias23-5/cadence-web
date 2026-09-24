export const STYLES = [
  { id: '', label: 'No style', line: 'Any plate that fits your skips.' },
  { id: 'keto', label: 'Keto', line: 'Very little starch and fruit. Fat carries the calories.' },
  { id: 'carnivore', label: 'Carnivore', line: 'Animal foods. Eggs and dairy stay in.' },
]

const KETO_NO = /oat|granola|bread|toast|bagel|muffin|pita|tortilla|pasta|rice|quinoa|farro|bean|lentil|chickpea|hummus|potato|banana|grape|apple|orange|mango|peach|date|pineapple|pretzel|cracker|pancake|bun|teriyaki|honey|maple|overnight/i
const PLANT = /oat|granola|bread|toast|bagel|muffin|pita|tortilla|pasta|rice|quinoa|farro|bean|lentil|chickpea|hummus|potato|banana|grape|apple|orange|mango|peach|date|pineapple|pretzel|cracker|pancake|bun|berry|berries|spinach|lettuce|cabbage|broccoli|pepper|tomato|cucumber|avocado|salsa|lime|lemon|kiwi|asparagus|zucchini|mushroom|onion|garlic|carrot|celery|kale|edamame|tofu|tempeh|pea|corn|quinoa/i

function blob(meal) {
  const foods = (meal?.foods || []).map((f) => f.name).join(' ')
  return `${meal?.name || ''} ${meal?.id || ''} ${foods}`
}

function carbsOf(meal) {
  return (meal?.foods || []).reduce((n, f) => n + (Number(f.carbs) || 0), 0)
}

export function mealFitsStyle(meal, style) {
  if (!style || !meal) return true
  const text = blob(meal)
  if (style === 'keto') {
    if (KETO_NO.test(text)) return false
    return carbsOf(meal) <= 28
  }
  if (style === 'carnivore') {
    return !PLANT.test(text)
  }
  return true
}

export function readStyle() {
  try {
    return JSON.parse(localStorage.getItem('cadence.profile') || '{}').style || ''
  } catch {
    return ''
  }
}
