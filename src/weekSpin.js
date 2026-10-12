import { buildVariedWeek, loadSeed, saveSeed } from './rotateWeek.js'
import { readStyle } from './dietStyle.js'

export function spinMenus(custom, avoid, style = readStyle()) {
  const n = loadSeed() + 1
  saveSeed(n)
  return { seed: n, picks: buildVariedWeek(custom, avoid, n, style) }
}
