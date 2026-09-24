const RENAME = [
  [/overnight oats|rolled oats|old fashioned oats/i, 'rolled oats'],
  [/kodiak/i, 'kodiak pancake mix'],
  [/fairlife/i, 'Fairlife milk'],
  [/skyr/i, 'skyr yogurt'],
  [/greek yogurt|nonfat yogurt/i, 'Greek yogurt'],
  [/cottage cheese/i, 'cottage cheese'],
  [/egg white/i, 'egg whites'],
  [/^eggs?$/i, 'eggs'],
  [/rotisserie/i, 'rotisserie chicken'],
  [/chicken breast/i, 'chicken breast'],
  [/ground turkey/i, 'ground turkey'],
  [/turkey breast|sliced turkey/i, 'sliced turkey'],
  [/ahi|tuna steak/i, 'ahi tuna'],
  [/canned tuna|tuna can/i, 'canned tuna'],
  [/shrimp/i, 'shrimp'],
  [/salmon/i, 'salmon'],
  [/lean ground beef|bolognese beef|ground beef/i, 'ground beef'],
  [/steak|sirloin/i, 'sirloin steak'],
  [/tofu/i, 'tofu'],
  [/tempeh/i, 'tempeh'],
  [/almond butter/i, 'almond butter'],
  [/peanut butter/i, 'peanut butter'],
  [/olive oil/i, 'olive oil'],
  [/sourdough/i, 'sourdough bread'],
  [/ezekiel/i, 'Ezekiel bread'],
  [/english muffin/i, 'English muffins'],
  [/tortilla/i, 'flour tortillas'],
  [/rice cake/i, 'rice cakes'],
  [/sweet potato/i, 'sweet potatoes'],
  [/baby spinach|spinach/i, 'spinach'],
  [/mixed greens|spring mix/i, 'spring mix'],
  [/bell pepper/i, 'bell peppers'],
  [/grape/i, 'grapes'],
  [/strawberr|blueberr|raspberr|mixed berr/i, 'berries'],
  [/pineapple/i, 'canned pineapple'],
  [/banana/i, 'bananas'],
  [/apple/i, 'apples'],
]

const DROP = /leftover|cooked|grilled|chopped|sliced|fresh|raw|plain|nonfat|low fat|extra virgin|house/gi

export function shopSearchName(name) {
  const raw = String(name || '').trim()
  if (!raw) return ''
  for (const [re, out] of RENAME) {
    if (re.test(raw)) return out
  }
  return raw.replace(DROP, ' ').replace(/\s+/g, ' ').trim()
}

export function buildInstacartText(grocery) {
  const seen = new Set()
  const lines = []
  grocery.forEach((section) => {
    section.items.forEach((item) => {
      const name = shopSearchName(item.name)
      const key = name.toLowerCase()
      if (!name || seen.has(key)) return
      seen.add(key)
      lines.push(name)
    })
  })
  return lines.join('\n')
}
