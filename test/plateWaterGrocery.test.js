import { describe, it, expect, beforeEach } from 'vitest'
import { installStorage } from './memoryStorage.js'
import { goalFromMarks, factorsForDay, dayTotals, kcalOf, scaleForSlot, groceryFromWeek, slotGoal } from '../src/macros.js'
import { WATER_GOAL, addGlass, removeGlass, setGlasses, glassesFor, toggleEaten, dayEatenCount } from '../src/track.js'
import { shopQty } from '../src/shopQty.js'
import { DEFAULT_WEEK, SLOTS, mealOf } from '../src/plan.js'

beforeEach(() => installStorage())

function dayOf(row) {
  const day = { id: row.id }
  SLOTS.forEach((s) => { day[s.id] = mealOf(row[s.id]) })
  return day
}

const goal = goalFromMarks({ protein: 140, carbs: 180, fat: 65 })

describe('plates', () => {
  it('every default-week slot resolves to a real plate with foods', () => {
    DEFAULT_WEEK.forEach((row) => SLOTS.forEach((s) => {
      const m = mealOf(row[s.id])
      expect(m.foods.length, `${row.id}.${s.id}`).toBeGreaterThan(0)
    }))
  })

  it('a day never shows more calories than the goal', () => {
    DEFAULT_WEEK.forEach((row) => {
      const day = dayOf(row)
      const shown = kcalOf(dayTotals(day, factorsForDay(day, goal)))
      expect(shown, row.id).toBeLessThanOrEqual(goal.kcal + 1)
    })
  })

  it('plate scale stays between 0.35x and 2.2x, locked plates stay 1x', () => {
    const meal = mealOf('salmon')
    const big = scaleForSlot(meal, slotGoal(goalFromMarks({ protein: 900, carbs: 900, fat: 400 }), 'dinner'))
    const small = scaleForSlot(meal, slotGoal(goalFromMarks({ protein: 1, carbs: 1, fat: 1 }), 'dinner'))
    expect(big).toBe(2.2)
    expect(small).toBe(0.35)
    expect(scaleForSlot({ ...meal, locked: true }, slotGoal(goal, 'dinner'))).toBe(1)
  })

  it('ticking a plate toggles and counts', () => {
    let eaten = toggleEaten({}, 'mon', 'lunch')
    expect(dayEatenCount(eaten, 'mon', SLOTS)).toBe(1)
    eaten = toggleEaten(eaten, 'mon', 'lunch')
    expect(dayEatenCount(eaten, 'mon', SLOTS)).toBe(0)
  })
})

describe('water', () => {
  it('counts glasses between 0 and the goal', () => {
    let w = {}
    for (let i = 0; i < WATER_GOAL + 3; i++) w = addGlass(w, 'mon')
    expect(glassesFor(w, 'mon')).toBe(WATER_GOAL)
    w = setGlasses(w, 'mon', 0)
    expect(glassesFor(removeGlass(w, 'mon'), 'mon')).toBe(0)
    expect(glassesFor(w, 'tue')).toBe(0)
  })
})

describe('grocery list', () => {
  const days = DEFAULT_WEEK.map(dayOf)
  const factors = Object.fromEntries(days.map((d) => [d.id, factorsForDay(d, goal)]))
  const list = groceryFromWeek(days, factors)
  const items = list.flatMap((s) => s.items)

  it('groups by aisle with unique, sorted names', () => {
    list.forEach((s) => {
      const names = s.items.map((i) => i.name)
      expect(new Set(names).size).toBe(names.length)
      expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names)
    })
  })

  it('every item has positive grams', () => {
    expect(items.length).toBeGreaterThan(10)
    items.forEach((i) => expect(i.grams, i.name).toBeGreaterThan(0))
  })

  it('skips leftover and pantry foods', () => {
    const day = { id: 'x', lunch: { foods: [
      { name: 'Chicken thigh', grams: 100, leftover: true },
      { name: 'Olive oil', grams: 10, pantry: true },
      { name: 'Broccoli', grams: 100, aisle: 'Produce' },
    ] } }
    const out = groceryFromWeek([day], {}).flatMap((s) => s.items)
    expect(out.map((i) => i.name)).toEqual(['Broccoli'])
  })

  it('shop amounts read like a store', () => {
    expect(shopQty({ name: 'Banana', grams: 300 })).toBe('3 banana')
    expect(shopQty({ name: 'Eggs', grams: 700 })).toBe('1 dozen eggs')
    expect(shopQty({ name: 'Eggs', grams: 300 })).toBe('half dozen eggs')
    expect(shopQty({ name: 'Chicken thigh', grams: 900 })).toBe('2 lb')
    expect(shopQty({ name: 'Salmon fillet', grams: 170 })).toBe('8 oz')
    items.forEach((i) => expect(shopQty(i), i.name).toMatch(/\S/))
  })
})
