export const AVOIDS = [
  { id: 'gluten', label: 'Gluten', line: 'Wheat bread, pasta, tortillas, oats unless certified.' },
  { id: 'dairy', label: 'Dairy', line: 'Milk, yogurt, cheese, cottage, butter.' },
  { id: 'egg', label: 'Egg', line: 'Whole eggs and egg whites.' },
  { id: 'peanut', label: 'Peanut', line: 'Peanut butter and peanut snacks.' },
  { id: 'treeNut', label: 'Tree nuts', line: 'Almond butter, cashew butter.' },
  { id: 'soy', label: 'Soy', line: 'Tofu, tempeh, edamame, soy sauce style sauces.' },
  { id: 'shellfish', label: 'Shellfish', line: 'Shrimp.' },
  { id: 'fish', label: 'Fish', line: 'Salmon, tuna, ahi, cod, white fish.' },
  { id: 'sesame', label: 'Sesame', line: 'Hummus and tahini-style dips.' },
]

const RULES = {
  gluten: /sourdough|bread|toast|bagel|english muffin|pita|flour tortilla|pasta|pancake|bun|granola|oat|overnight oats|farro|ezekiel|pretzel|cracker|teriyaki|flour/i,
  dairy: /yogurt|skyr|cottage|milk|fairlife|cheddar|feta|parmesan|butter|string cheese|babybel|halloumi|cheese/i,
  egg: /\begg|egg white|eggs\b/i,
  peanut: /peanut/i,
  treeNut: /almond|cashew/i,
  soy: /tofu|tempeh|edamame|soy|teriyaki/i,
  shellfish: /shrimp/i,
  fish: /salmon|tuna|ahi|cod|white fish|fish fillet/i,
  sesame: /hummus/i,
}

function blob(meal) {
  const foods = (meal.foods || []).map((f) => f.name).join(' ')
  return `${meal.name || ''} ${meal.id || ''} ${foods}`
}

export function mealHitsAvoid(meal, avoid = []) {
  if (!meal || !avoid.length) return false
  const text = blob(meal)
  return avoid.some((id) => RULES[id] && RULES[id].test(text))
}

export function safeMeals(list, avoid = []) {
  return (list || []).filter((m) => !mealHitsAvoid(m, avoid))
}
