export const STEAK_CUTS = [
  { id: 'flank', label: 'Flank steak', search: 'beef flank steak' },
  { id: 'sirloin', label: 'Sirloin steak', search: 'top sirloin steak' },
]

const RENAME = [
  [/kodiak/i, 'Kodiak pancake mix'],
  [/fairlife shake/i, 'Fairlife protein shake'],
  [/fairlife/i, 'Fairlife milk'],
  [/overnight oats|dry oats|rolled oats/i, 'old fashioned oats'],
  [/chia/i, 'chia seeds'],
  [/skyr/i, 'Icelandic yogurt'],
  [/whipped cottage|cottage cheese/i, 'cottage cheese'],
  [/greek yogurt|plain greek/i, 'Greek yogurt'],
  [/egg white/i, 'liquid egg whites'],
  [/^eggs?$/i, 'eggs'],
  [/rotisserie/i, 'rotisserie chicken'],
  [/chicken sausage/i, 'chicken sausage'],
  [/ground chicken/i, 'ground chicken'],
  [/chicken thigh/i, 'chicken thighs'],
  [/chicken breast/i, 'boneless chicken breast'],
  [/ground turkey/i, 'ground turkey'],
  [/turkey burger/i, 'turkey burgers'],
  [/sliced turkey|turkey deli/i, 'sliced turkey'],
  [/tuna pouch/i, 'tuna pouch'],
  [/canned tuna|tuna can/i, 'canned tuna'],
  [/ahi|tuna steak/i, 'ahi tuna'],
  [/canned salmon/i, 'canned salmon'],
  [/smoked salmon/i, 'smoked salmon'],
  [/salmon/i, 'salmon fillet'],
  [/shrimp/i, 'shrimp'],
  [/cod/i, 'cod fillet'],
  [/white fish/i, 'cod fillet'],
  [/pork tenderloin/i, 'pork tenderloin'],
  [/ground beef|lean ground/i, 'lean ground beef'],
  [/bison/i, 'ground beef'],
  [/extra firm tofu|tofu/i, 'extra firm tofu'],
  [/tempeh/i, 'tempeh'],
  [/edamame/i, 'edamame'],
  [/protein powder/i, 'protein powder'],
  [/protein bagel/i, 'bagel'],
  [/almond butter/i, 'almond butter'],
  [/peanut butter/i, 'peanut butter'],
  [/cashew butter/i, 'cashew butter'],
  [/olive oil/i, 'olive oil'],
  [/olives/i, 'olives'],
  [/pesto/i, 'pesto'],
  [/dark chocolate/i, 'dark chocolate'],
  [/ezekiel/i, 'Ezekiel bread'],
  [/sourdough/i, 'sourdough bread'],
  [/english muffin/i, 'English muffins'],
  [/pita/i, 'pita bread'],
  [/granola/i, 'granola'],
  [/chickpea pasta/i, 'chickpea pasta'],
  [/dry pasta|pasta/i, 'pasta'],
  [/flour tortilla/i, 'flour tortillas'],
  [/corn tortilla/i, 'corn tortillas'],
  [/brown rice/i, 'brown rice'],
  [/white rice/i, 'white rice'],
  [/quinoa/i, 'quinoa'],
  [/farro/i, 'farro'],
  [/black beans/i, 'black beans'],
  [/chickpeas/i, 'chickpeas'],
  [/lentils/i, 'lentils'],
  [/hummus/i, 'hummus'],
  [/salsa/i, 'salsa'],
  [/rice cake/i, 'rice cakes'],
  [/crackers/i, 'crackers'],
  [/pretzels/i, 'pretzels'],
  [/sweet potato/i, 'sweet potatoes'],
  [/butternut/i, 'butternut squash'],
  [/cauliflower rice/i, 'cauliflower rice'],
  [/cabbage slaw|coleslaw/i, 'coleslaw mix'],
  [/baby spinach|spinach/i, 'spinach'],
  [/romaine/i, 'romaine lettuce'],
  [/mixed greens|spring mix/i, 'spring mix'],
  [/bell pepper/i, 'bell peppers'],
  [/green beans/i, 'green beans'],
  [/sugar snap/i, 'sugar snap peas'],
  [/snap peas/i, 'sugar snap peas'],
  [/mixed berr|blueberr|strawberr|raspberr/i, 'mixed berries'],
  [/grape/i, 'red grapes'],
  [/pineapple/i, 'pineapple'],
  [/frozen mango|mango/i, 'frozen mango'],
  [/watermelon/i, 'watermelon'],
  [/banana/i, 'banana'],
  [/apple/i, 'apple'],
  [/orange/i, 'orange'],
  [/peach/i, 'peach'],
  [/kiwi/i, 'kiwi'],
  [/dates/i, 'Medjool dates'],
  [/avocado/i, 'avocado'],
  [/guacamole/i, 'guacamole'],
  [/string cheese/i, 'string cheese'],
  [/babybel/i, 'Mini Babybel'],
  [/halloumi/i, 'halloumi cheese'],
  [/cheddar/i, 'cheddar cheese'],
  [/parmesan/i, 'parmesan cheese'],
  [/feta/i, 'feta cheese'],
  [/butter\b/i, 'butter'],
  [/jicama/i, 'jicama'],
  [/kimchi/i, 'kimchi'],
  [/pickles/i, 'dill pickles'],
  [/asparagus/i, 'asparagus'],
  [/mushrooms/i, 'white mushrooms'],
  [/zucchini/i, 'zucchini'],
  [/cucumber/i, 'cucumber'],
  [/celery/i, 'celery'],
  [/kale/i, 'kale'],
  [/radish/i, 'radishes'],
  [/onion/i, 'yellow onion'],
  [/potatoes/i, 'russet potatoes'],
  [/peas\b/i, 'frozen peas'],
  [/corn\b/i, 'frozen corn'],
  [/carrots/i, 'carrots'],
  [/broccoli/i, 'broccoli'],
  [/cauliflower/i, 'cauliflower'],
  [/beets/i, 'beets'],
]

function tidy(name) {
  return String(name || '')
    .replace(/\d+%/g, ' ')
    .replace(/,\s*(cooked|raw|dry|fresh)\b/gi, ' ')
    .replace(/\b(leftover|cooked|grilled|chopped|sliced|fresh|raw|plain|nonfat|low[- ]fat|extra virgin|house|dry)\b/gi, ' ')
    .replace(/[,._/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isSteak(name) {
  return /flank|skirt|sirloin|\bsteak\b/i.test(name || '')
}

export function groceryHasSteak(grocery) {
  return (grocery || []).some((section) => section.items.some((item) => isSteak(item.name)))
}

export function shopSearchName(name, prefs = {}) {
  const raw = tidy(name)
  if (!raw) return ''
  if (isSteak(name) || isSteak(raw)) {
    const cut = STEAK_CUTS.find((c) => c.id === prefs.steak) || STEAK_CUTS[0]
    return cut.search
  }
  for (const [re, out] of RENAME) {
    if (re.test(raw) || re.test(String(name || ''))) return out
  }
  return raw
}

export function buildInstacartText(grocery, prefs = {}) {
  const seen = new Set()
  const lines = []
  grocery.forEach((section) => {
    section.items.forEach((item) => {
      const name = shopSearchName(item.name, prefs)
      const key = name.toLowerCase()
      if (!name || key.length < 3 || seen.has(key)) return
      seen.add(key)
      lines.push(name)
    })
  })
  return lines.join('\n')
}
