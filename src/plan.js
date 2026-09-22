import { MEALS, BREAKFASTS, LUNCHES, DINNERS, WEEK_LABEL } from './catalog.js'
import { SNACK_MEALS, SNACKS } from './snacks.js'

export { WEEK_LABEL }

export const SLOTS = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'snack1', label: 'Morning snack' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'snack2', label: 'Afternoon snack' },
  { id: 'dinner', label: 'Dinner' },
]

export function mealOf(id) {
  return MEALS[id] || SNACK_MEALS[id] || MEALS.yogurtGrapes
}

export function optionsFor(slot) {
  if (slot === 'breakfast') return BREAKFASTS.map((id) => MEALS[id])
  if (slot === 'lunch') return LUNCHES.map((id) => MEALS[id])
  if (slot === 'dinner') return DINNERS.map((id) => MEALS[id])
  return SNACKS.map((id) => SNACK_MEALS[id])
}

export const DEFAULT_WEEK = [
  { id: 'mon', day: 'Monday', breakfast: 'oatmeal', snack1: 'appleCottage', lunch: 'chickenSalad', snack2: 'grapesTurkey', dinner: 'salmon' },
  { id: 'tue', day: 'Tuesday', breakfast: 'eggToast', snack1: 'berriesCottage', lunch: 'turkeySandwich', snack2: 'yogurtSnack', dinner: 'tacoBowl' },
  { id: 'wed', day: 'Wednesday', breakfast: 'yogurtBerries', snack1: 'datesCheese', lunch: 'shrimpTacos', snack2: 'appleCottage', dinner: 'lemonChicken' },
  { id: 'thu', day: 'Thursday', breakfast: 'proteinShake', snack1: 'grapesTurkey', lunch: 'tunaWrap', snack2: 'riceCake', dinner: 'stirFry' },
  { id: 'fri', day: 'Friday', breakfast: 'yogurtGrapes', snack1: 'yogurtSnack', lunch: 'salmonPlate', snack2: 'berriesCottage', dinner: 'bolognese' },
  { id: 'sat', day: 'Saturday', breakfast: 'pancakes', snack1: 'appleCottage', lunch: 'cottageBowl', snack2: 'datesCheese', dinner: 'steakTacos' },
  { id: 'sun', day: 'Sunday', breakfast: 'eggAvocado', snack1: 'riceCake', lunch: 'tomatoGrilledCheese', snack2: 'grapesTurkey', dinner: 'chili' },
]
