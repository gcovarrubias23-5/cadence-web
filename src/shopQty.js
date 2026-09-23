import { PANTRY } from './pantry.js'
import { FOOD_ALIAS } from './foodAlias.js'

function pantryOf(name) {
  const key = FOOD_ALIAS[name] || name
  return PANTRY.find((p) => p.name === key)
}

function ceil(n) {
  return Math.max(1, Math.ceil(n - 0.05))
}

export function shopQty(item) {
  const g = Number(item.grams) || 0
  const name = item.name || ''
  const key = name.toLowerCase()
  const src = pantryOf(name)

  if (key.includes('pineapple') || key.includes('mango') || key.includes('watermelon')) return g > 350 ? '2 packs' : '1 pack'
  if (key.includes('banana')) return `${ceil(g / 118)} banana`
  if (key === 'apple' || key.startsWith('apple ') || key.endsWith(' apple')) return `${ceil(g / 150)} apple`
  if (key.includes('orange')) return `${ceil(g / 130)} orange`
  if (key.includes('avocado')) return `${ceil(g / 150)} avocado`
  if (key.includes('peach')) return `${ceil(g / 150)} peach`
  if (key.includes('kiwi')) return `${ceil(g / 75)} kiwi`
  if (key.includes('lemon')) return `${ceil(g / 60)} lemon`
  if (key.includes('lime')) return `${ceil(g / 40)} lime`
  if (key.includes('grape')) return g > 250 ? '1 bag grapes' : '1 bunch grapes'
  if (key.includes('berr')) return g > 350 ? '2 packs' : '1 pack'
  if (key.includes('date')) return `${ceil(g / 24)} dates`

  if (key.includes('egg white')) return '1 carton egg whites'
  if (key === 'eggs' || key.endsWith('eggs')) {
    const n = ceil(g / 50)
    if (n >= 12) return '1 dozen eggs'
    if (n >= 6) return 'half dozen eggs'
    return `${n} eggs`
  }

  if (key.includes('yogurt') || key.includes('skyr') || key.includes('cottage')) return g / 240 >= 2 ? '1 large tub' : '1 tub'
  if (key.includes('milk') || key.includes('fairlife')) return g / 240 >= 4 ? '1 half gallon' : '1 quart'

  if (key.includes('peanut butter') || key.includes('almond butter') || key.includes('cashew butter')) return '1 jar'
  if (key.includes('olive oil') || key.includes('pesto')) return '1 bottle'
  if (key.includes('salsa') || key.includes('hummus')) return '1 jar'
  if (key.includes('granola') || key.includes('oat') || key.includes('kodiak')) return '1 canister'
  if (key.includes('sourdough') || key.includes('ezekiel') || key.includes('bread')) return '1 loaf'
  if (key.includes('bagel') || key.includes('english muffin') || key.includes('pita')) return '1 pack'
  if (key.includes('tortilla')) return '1 pack'
  if (key.includes('rice cake') || key.includes('cracker') || key.includes('pretzel')) return '1 bag'
  if (key.includes('pasta') || key.includes('quinoa') || key.includes('farro') || (key.includes('rice') && !key.includes('cake'))) return '1 bag'
  if (key.includes('black bean') || key.includes('chickpea') || key.includes('lentil')) return `${ceil(g / 400)} can`
  if (key.includes('tuna') || key.includes('canned salmon') || key.includes('can salmon')) return `${ceil(g / 113)} can`

  if (key.includes('cheddar') || key.includes('feta') || key.includes('parmesan') || key.includes('string') || key.includes('babybel') || key.includes('halloumi') || key.includes('cheese')) return '1 pack'

  if (/chicken|turkey|steak|beef|pork|bison|salmon|shrimp|fish|cod|ahi|tofu|tempeh|sausage/.test(key)) {
    const lb = g / 454
    if (lb >= 0.85) return `${Math.max(1, Math.ceil(lb))} lb`
    return `${Math.max(8, Math.ceil(g / 28.35 / 4) * 4)} oz`
  }

  if (src?.house && src.base) {
    const n = ceil(g / src.base)
    return `${n} ${src.house.replace(/^[\d./\s]+/, '')}`.replace(/\s+/g, ' ').trim()
  }

  const oz = g / 28.35
  if (oz >= 14) return `${Math.ceil(oz / 16)} lb`
  if (oz >= 1) return `${Math.ceil(oz)} oz`
  return '1 each'
}
