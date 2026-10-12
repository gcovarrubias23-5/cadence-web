import { STYLE_NOTES } from './styleNotes.js'
import { kitchenFor as baseKitchen } from './kitchenNotes.js'

export function kitchenFor(meal) {
  if (!meal) return null
  return STYLE_NOTES[meal.id] || baseKitchen(meal)
}
