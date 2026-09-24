function cleanHouse(house) {
  return String(house || '')
    .replace(/palm[- ]size /i, '')
    .replace(/palm of /i, '')
    .replace(/\bpalm\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function oz(g) {
  const n = g / 28.35
  if (n >= 10) return `${Math.round(n)} oz`
  const tenths = Math.round(n * 2) / 2
  return `${tenths % 1 === 0 ? tenths.toFixed(0) : tenths.toFixed(1)} oz`
}

function isProteinCut(name) {
  return /chicken|turkey|steak|beef|pork|bison|salmon|shrimp|fish|cod|ahi|tofu|tempeh|sausage/.test(name)
    && !/broth/.test(name)
}

export function formatPortion(food) {
  const g = Number(food?.grams) || 0
  const name = String(food?.name || '').toLowerCase()
  const house = cleanHouse(food?.house)

  if (!g) return house

  if (name === 'eggs' || name.endsWith(' eggs') || name === 'egg') {
    const n = Math.max(1, Math.round(g / 50))
    return n === 1 ? '1 large egg' : `${n} large eggs`
  }

  if (name.includes('egg white')) {
    const n = Math.max(1, Math.round(g / 30))
    return `${n} Tbsp egg whites`
  }

  if (isProteinCut(name)) {
    const cooked = /cooked|rotisserie|fillet|steak|deli|sliced|sausage/.test(name) || food.aisle === 'Protein'
    return cooked ? `${oz(g)} cooked` : oz(g)
  }

  if (/olive oil|oil\b/.test(name) && !/broth/.test(name)) {
    const tsp = g / 4.5
    if (tsp < 1.5) return '1 tsp oil'
    if (tsp < 2.6) return '2 tsp oil'
    return `${Math.round(tsp / 3)} Tbsp oil`
  }

  if (/butter/.test(name) && !/peanut|almond|cashew/.test(name)) {
    const tsp = g / 5
    if (tsp < 1.6) return '1 tsp butter'
    return `${Math.round(g / 14)} Tbsp butter`
  }

  if (/peanut butter|almond butter|cashew butter/.test(name)) {
    const tbsp = g / 16
    if (tbsp < 0.75) return '1 tsp nut butter'
    if (tbsp < 1.4) return '1 Tbsp nut butter'
    return `${Math.round(tbsp)} Tbsp nut butter`
  }

  if (/yogurt|skyr|cottage|milk/.test(name)) {
    const cups = g / 245
    if (cups < 0.4) return '1/4 cup'
    if (cups < 0.7) return '1/2 cup'
    if (cups < 0.9) return '3/4 cup'
    return cups < 1.3 ? '1 cup' : `${Math.round(cups * 2) / 2} cups`
  }

  if (/rice, cooked|quinoa, cooked|farro, cooked|oats|granola/.test(name)) {
    const cups = /oat|granola/.test(name) ? g / 80 : g / 158
    if (cups < 0.4) return '1/4 cup cooked'
    if (cups < 0.7) return '1/2 cup cooked'
    if (cups < 0.9) return '3/4 cup cooked'
    return '1 cup cooked'
  }

  if (house) return house
  return ''
}
