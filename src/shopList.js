import { shopQty } from './shopQty.js'
import { buildInstacartText } from './shopPaste.js'

export function buildShopText(grocery) {
  return buildInstacartText(grocery)
}

export function buildReadableList(grocery, goal) {
  const lines = []
  grocery.forEach((section) => {
    section.items.forEach((item) => {
      lines.push(`${item.name} (${shopQty(item)})`)
    })
  })
  if (goal) lines.push('', `About ${Math.round(goal.protein)}g protein a day`)
  return lines.join('\n')
}

export const STORES = [
  {
    id: 'instacart',
    name: 'Instacart',
    blurb: 'Paste the list there and check out like you always do.',
    state: 'We cannot drop it in your cart yet.',
  },
]
