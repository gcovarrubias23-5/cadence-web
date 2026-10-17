import { describe, it, expect } from 'vitest'
import { foodHitsAvoid, mealHitsAvoid } from '../src/avoid.js'
import { isWholeEgg } from '../src/foodWords.js'
import { formatPortion } from '../src/portion.js'

const hides = (name, id) => foodHitsAvoid({ name }, [id])

describe('skip Dairy', () => {
  it.each(['Peanut butter', 'Almond butter', 'Cashew butter', 'Sunflower seed butter', 'SunButter', 'Apple butter', 'Cocoa butter'])(
    'keeps %s', (name) => expect(hides(name, 'dairy')).toBe(false))

  it.each(['Butter', 'Unsalted butter', 'Plain Greek yogurt', 'Cottage cheese', 'Whole milk', 'Cheddar', 'Parmesan', 'String cheese', 'Skyr'])(
    'hides %s', (name) => expect(hides(name, 'dairy')).toBe(true))

  it('still hides a plate with nut butter AND real butter', () => {
    const meal = { name: 'Toast', foods: [{ name: 'Almond butter' }, { name: 'Butter' }] }
    expect(mealHitsAvoid(meal, ['dairy'])).toBe(true)
  })

  it('still hides butter-based plates by id', () => {
    expect(mealHitsAvoid({ id: 'carnChickenButter', name: 'Chicken', foods: [{ name: 'Chicken thigh' }] }, ['dairy'])).toBe(true)
  })

  it('a peanut butter plate is still hidden for peanut skips', () => {
    expect(hides('Peanut butter', 'peanut')).toBe(true)
  })
})

describe('skip Egg', () => {
  it.each(['Eggplant', 'Roasted eggplant', 'Veggie wrap'])('keeps %s', (name) => expect(hides(name, 'egg')).toBe(false))
  it.each(['Eggs', 'Egg', 'Large egg', 'Liquid egg whites', 'Egg scramble'])('hides %s', (name) => expect(hides(name, 'egg')).toBe(true))
  it('hides egg plates named only in the id', () => {
    expect(mealHitsAvoid({ id: 'carnSteakEggs', name: 'Steak plate', foods: [] }, ['egg'])).toBe(true)
  })
})

describe('egg display', () => {
  it('eggplant is not counted as eggs', () => {
    expect(isWholeEgg('Eggplant')).toBe(false)
    expect(isWholeEgg('Egg whites')).toBe(false)
    expect(isWholeEgg('Eggs')).toBe(true)
    expect(formatPortion({ name: 'Eggs', grams: 100 })).toBe('2 large eggs')
    expect(formatPortion({ name: 'Eggplant', grams: 100 })).not.toMatch(/egg/)
  })
})
