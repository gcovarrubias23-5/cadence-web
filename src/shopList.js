import { formatG } from './macros.js'

export function buildShopText(grocery, goal) {
  const lines = [
    'Cadence list',
    `Aim for about ${Math.round(goal.protein)} protein, ${Math.round(goal.carbs)} carbs, ${Math.round(goal.fat)} fat a day`,
    '',
  ]
  grocery.forEach((section) => {
    lines.push(section.name.toUpperCase())
    section.items.forEach((item) => {
      lines.push(`- ${item.name} — ${formatG(item.grams)}`)
    })
    lines.push('')
  })
  lines.push('Pay in your usual grocery app.')
  return lines.join('\n')
}

export const STORES = [
  {
    id: 'instacart',
    name: 'Instacart',
    blurb: 'Paste the list there and check out like you always do.',
    state: 'We cannot drop it in your cart yet.',
  },
  {
    id: 'walmart',
    name: 'Walmart',
    blurb: 'Same idea — shop in the Walmart app.',
    state: 'Opens Walmart from here.',
  },
  {
    id: 'list',
    name: 'I will shop it',
    blurb: 'Copy or text the list to yourself.',
    state: 'Ready now.',
  },
]
