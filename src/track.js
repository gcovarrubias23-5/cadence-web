export const WATER_GOAL = 8

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
  return Number(water?.[dayId] || 0)
}

export function setGlasses(water, dayId, count) {
  const n = Math.max(0, Math.min(WATER_GOAL, Number(count) || 0))
  return { ...water, [dayId]: n }
}

export function addGlass(water, dayId) {
  return setGlasses(water, dayId, glassesFor(water, dayId) + 1)
}

export function removeGlass(water, dayId) {
  return setGlasses(water, dayId, glassesFor(water, dayId) - 1)
}
