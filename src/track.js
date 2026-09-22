export const WATER_GOAL = 8

export function emptyEaten() {
  return {}
}

export function emptyWater() {
  return {}
}

export function slotDone(eaten, dayId, slotId) {
  return !!eaten?.[dayId]?.[slotId]
}

export function dayEatenCount(eaten, dayId, slots) {
  return slots.filter((slot) => slotDone(eaten, dayId, slot.id)).length
}

export function toggleEaten(eaten, dayId, slotId) {
  const day = { ...(eaten[dayId] || {}) }
  day[slotId] = !day[slotId]
  return { ...eaten, [dayId]: day }
}

export function glassesFor(water, dayId) {
  return Number(water[dayId] || 0)
}

export function addGlass(water, dayId) {
  const n = Math.min(WATER_GOAL, glassesFor(water, dayId) + 1)
  return { ...water, [dayId]: n }
}

export function removeGlass(water, dayId) {
  const n = Math.max(0, glassesFor(water, dayId) - 1)
  return { ...water, [dayId]: n }
}
