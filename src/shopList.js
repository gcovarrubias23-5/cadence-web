import { shopQty } from './shopQty.js'
import { buildInstacartText } from './shopPaste.js'

export function buildShopText(grocery, prefs) {
  return buildInstacartText(grocery, prefs)
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
