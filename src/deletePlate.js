import { dropCustom } from './plan.js'

export function applyDelete(setCustom, setPicks, custom, picks, id, avoid) {
  const { nextCustom, nextPicks } = dropCustom(picks, custom, id, avoid)
  setCustom(nextCustom)
  setPicks(nextPicks)
  try {
    localStorage.setItem('cadence.custom', JSON.stringify(nextCustom))
    localStorage.setItem('cadence.week', JSON.stringify(nextPicks))
  } catch {}
}
