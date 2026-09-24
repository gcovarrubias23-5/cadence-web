import { buildVariedWeek, loadSeed, saveSeed } from './rotateWeek.js'

export function spinMenus(custom, avoid) {
  const n = loadSeed() + 1
  saveSeed(n)
  return { seed: n, picks: buildVariedWeek(custom, avoid, n) }
}
