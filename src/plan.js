import { MEALS, BREAKFASTS, LUNCHES, DINNERS, WEEK_LABEL } from './catalog.js'
import { EXTRA_MEALS, EXTRA_BY_SLOT } from './catalogExtras.js'
import { SNACK_MEALS, SNACKS } from './snacks.js'

export { WEEK_LABEL }

export const SLOTS = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'snack1', label: 'Morning snack' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'snack2', label: 'Afternoon snack' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snack3', label: 'Late snack' },
]

const SNACK_SLOTS = ['snack1', 'snack2', 'snack3']

export function mealOf(id, custom = []) {
  return MEALS[id] || EXTRA_MEALS[id] || SNACK_MEALS[id] || custom.find((m) => m.id === id) || MEALS.yogurtGrapes
}

export function optionsFor(slot, custom = []) {
  let base = SNACKS.map((id) => SNACK_MEALS[id])
  if (slot === 'breakfast') base = BREAKFASTS.map((id) => MEALS[id])
  if (slot === 'lunch') base = LUNCHES.map((id) => MEALS[id])
  if (slot === 'dinner') base = DINNERS.map((id) => MEALS[id])
  const extraIds = EXTRA_BY_SLOT[slot] || []
  const extras = extraIds.map((id) => EXTRA_MEALS[id]).filter(Boolean)
  const yours = custom.filter((m) => {
    if (SNACK_SLOTS.includes(slot)) return m.slot === 'snack' || SNACK_SLOTS.includes(m.slot)
    return m.slot === slot || !m.slot
  })
  return [...yours, ...extras, ...base]
}

export const DEFAULT_WEEK = [
  { id: 'mon', day: 'Monday', breakfast: 'overnightOats', snack1: 'appleCottage', lunch: 'rotisserieBowl', snack2: 'grapesTurkey', dinner: 'salmon', snack3: 'riceCake' },
  { id: 'tue', day: 'Tuesday', breakfast: 'eggToast', snack1: 'berriesCottage', lunch: 'turkeySandwich', snack2: 'yogurtSnack', dinner: 'tacoBowl', snack3: 'datesCheese' },
  { id: 'wed', day: 'Wednesday', breakfast: 'yogurtBerries', snack1: 'datesCheese', lunch: 'shrimpTacos', snack2: 'appleCottage', dinner: 'lemonChicken', snack3: 'yogurtSnack' },
  { id: 'thu', day: 'Thursday', breakfast: 'proteinShake', snack1: 'grapesTurkey', lunch: 'ahiBowl', snack2: 'riceCake', dinner: 'stirFry', snack3: 'berriesCottage' },
  { id: 'fri', day: 'Friday', breakfast: 'yogurtGrapes', snack1: 'yogurtSnack', lunch: 'salmonPlate', snack2: 'berriesCottage', dinner: 'bolognese', snack3: 'appleCottage' },
  { id: 'sat', day: 'Saturday', breakfast: 'pancakes', snack1: 'appleCottage', lunch: 'cottageBowl', snack2: 'datesCheese', dinner: 'steakTacos', snack3: 'grapesTurkey' },
  { id: 'sun', day: 'Sunday', breakfast: 'eggAvocado', snack1: 'riceCake', lunch: 'tomatoGrilledCheese', snack2: 'grapesTurkey', dinner: 'chili', snack3: 'yogurtSnack' },
]
