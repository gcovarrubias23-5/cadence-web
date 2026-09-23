import { PANTRY } from './pantry.js'
import { FOOD_ALIAS } from './foodAlias.js'

function pantryOf(name) {
  const key = FOOD_ALIAS[name] || name
  return PANTRY.find((p) => p.name === key)
}

function ceil(n) {
  return Math.max(1, Math.ceil(n - 0.05))
}

const EACH = [
  'Banana', 'Apple', 'Orange', 'Avocado', 'Peach', 'Kiwi', 'Lemon', 'Lime',
  'Protein bagel', 'English muffin', 'Pita', 'Flour tortilla',
]

function buyable(name, grams, src) {
  const g = Number(grams) || 0
  const key = name.toLowerCase()

  if (EACH.some((n) => key === n.toLowerCase() || key.includes(n.toLowerCase()))) {
    const unit = src?.base || 120
    return `${ceil(g / unit)}`
  }
  if (key.includes('grape')) return g > 250 ? '1 bag' : '1 bunch'
  if (key.includes('berr') || key.includes('strawberr') || key.includes('blueberr') || key.includes('mango')) {
    return g > 300 ? '2 packs' : '1 pack'
  }
  if (key.includes('egg white')) return `${ceil(g / 243)} carton`
  if (key === 'eggs' || key.endsWith('eggs')) {
    const n = ceil(g / 50)
    if (n >= 12) return '1 dozen'
    if (n >= 6) return '1 half dozen'
    return `${n} eggs`
  }
  if (key.includes('yogurt') || key.includes('skyr') || key.includes('cottage') || key.includes('milk') || key.includes('fairlife')) {
    const cups = g / 240
    if (cups >= 4) return '1 large tub'
    if (cups >= 2) return '1 tub'
    return '1 cup'
  }
  if (key.includes('butter') && (key.includes('peanut') || key.includes('almond') || key.includes('cashew'))) {
    return '1 jar'
  }
  if (key.includes('olive oil') || key === 'oil' || key.includes('pesto')) return '1 bottle'
  if (key.includes('salsa') || key.includes('hummus')) return '1 jar'
  if (key.includes('granola') || key.includes('oat') || key.includes('rice') && key.includes('cake')) {
    return '1 box'
  }
  if (key.includes('bread') || key.includes('sourdough') || key.includes('ezekiel') || key.includes('bagel')) return '1 loaf'
  if (key.includes('tortilla')) {
    const n = ceil(g / 25)
    return n >= 8 ? '1 pack' : `${n} tortillas`
  }
  if (key.includes('pasta') || key.includes('quinoa') || key.includes('farro') || key.includes('rice') && !key.includes('cake')) {
    return g >= 400 ? '1 bag' : '1 box'
  }
  if (key.includes('bean') || key.includes('chickpea') || key.includes('lentil') || key.includes('corn') && key.includes('can')) {
    return `${ceil(g / 400)} can`
  }
  if (key.includes('tuna') || key.includes('canned salmon') || key.includes('can salmon')) {
    return `${ceil(g / 113)} can`
  }
  if (key.includes('cheddar') || key.includes('feta') || key.includes('parmesan') || key.includes('string') || key.includes('babybel') || key.includes('halloumi')) {
    return g >= 200 ? '1 pack' : '1 pack'
  }
  if (key.includes('chicken') || key.includes('turkey') || key.includes('steak') || key.includes('beef') || key.includes('pork') || key.includes('bison') || key.includes('salmon') || key.includes('shrimp') || key.includes('fish') || key.includes('cod') || key.includes('ahi') || key.includes('tofu') || key.includes('tempeh') || key.includes('sausage')) {
    const lb = g / 454
    if (lb >= 0.9) return `${Math.ceil(lb)} lb`
    const oz = Math.ceil(g / 28.35 / 4) * 4
    return `${Math.max(4, oz)} oz`
  }
  if (src?.house && src.base) {
    const n = ceil(g / src.base)
    const m = String(src.house).match(/^(\d+(?:\.\d+)?)\s*(.*)$/)
    if (m) {
      const unit = m[2].replace(/^\d+(?:\.\d+)?\s*/, '').trim()
      if (/banana|apple|orange|avocado|peach|kiwi|lemon|lime|egg|tortilla|pita|bagel|muffin|date/i.test(src.house)) {
        return `${n} ${unit || src.house}`
      }
    }
  }
  const oz = g / 28.35
  if (oz >= 14) return `${Math.ceil(oz / 16)} lb`
  if (oz >= 1) return `${Math.ceil(oz)} oz`
  return '1 each'
}

export function shopQty(item) {
  const src = pantryOf(item.name)
  return buyable(item.name, item.grams, src)
}
