// Property-based checks of the meal-plan promises (see
// .cursor/skills/verify-meal-plan/SKILL.md). Each property runs the real
// functions from src/ on generated inputs. fast-check prints the smallest
// failing input when a property breaks.
import { describe, it, expect, beforeEach } from 'vitest'
import fc from 'fast-check'
import { installStorage } from '../memoryStorage.js'
import { SLOTS, DEFAULT_WEEK, mealOf, optionsFor, poolOf, dedupeWeek, cleanWeek } from '../../src/plan.js'
import { buildVariedWeek } from '../../src/rotateWeek.js'
import { AVOIDS, mealHitsAvoid, foodHitsAvoid } from '../../src/avoid.js'
import { mealFitsStyle } from '../../src/dietStyle.js'
import { goalFromMarks, factorsForDay, dayTotals, kcalOf, groceryFromWeek, resolveFood, scaleFood } from '../../src/macros.js'

beforeEach(() => installStorage())

const RUNS = { numRuns: 300 }
const AVOID_IDS = AVOIDS.map((a) => a.id)

const seedArb = fc.integer({ min: -100000, max: 100000 })
const avoidArb = fc.subarray(AVOID_IDS)
const styleArb = fc.constantFrom('', 'keto', 'carnivore')
const planArb = fc.record({ seed: seedArb, avoid: avoidArb, style: styleArb })
const marksArb = fc.record({
  protein: fc.integer({ min: 40, max: 300 }),
  carbs: fc.integer({ min: 0, max: 450 }),
  fat: fc.integer({ min: 15, max: 180 }),
})

// Every meal id any slot can ever show, used to build arbitrary stored weeks.
const ALL_IDS = [...new Set(SLOTS.flatMap((s) => ['', 'keto', 'carnivore'].flatMap((st) => optionsFor(s.id, [], [], st).map((m) => m.id))))]
const storedWeekArb = fc.array(
  fc.record(Object.fromEntries(SLOTS.map((s) => [s.id, fc.oneof(fc.constantFrom(...ALL_IDS), fc.constant(''))]))),
  { minLength: 7, maxLength: 7 },
).map((rows) => rows.map((r, i) => ({ id: DEFAULT_WEEK[i].id, day: DEFAULT_WEEK[i].day, ...r })))

const filled = (row) => SLOTS.map((s) => row[s.id]).filter(Boolean)
const hydrate = (picks) => picks.map((row) => {
  const day = { ...row }
  SLOTS.forEach((s) => { day[s.id] = mealOf(row[s.id]) })
  return day
})

function leaks(week, avoid, style) {
  const out = []
  week.forEach((row) => SLOTS.forEach((s) => {
    const meal = mealOf(row[s.id])
    if (!meal) return
    // Second, independent oracle for dairy: the catalog files every dairy food
    // under the 'Dairy' aisle, so a broken dairy rule in src/avoid.js is still caught.
    const food = (meal.foods || []).find((f) => foodHitsAvoid(f, avoid) || (avoid.includes('dairy') && f.aisle === 'Dairy'))
    if (mealHitsAvoid(meal, avoid) || food || !mealFitsStyle(meal, style)) {
      out.push(`${row.day} ${s.id}: ${meal.id}${food ? ` (${food.name})` : ''}`)
    }
  }))
  return out
}

describe('P1 no meal twice in one day', () => {
  it('buildVariedWeek never puts the same meal in two slots of a day', () => {
    fc.assert(fc.property(planArb, ({ seed, avoid, style }) => {
      buildVariedWeek([], avoid, seed, style).forEach((row) => {
        const ids = filled(row)
        expect(new Set(ids).size, `${row.day}: ${ids.join(', ')}`).toBe(ids.length)
      })
    }), RUNS)
  })

  it('dedupeWeek repairs any stored week, keeping the slot the person just chose', () => {
    fc.assert(fc.property(storedWeekArb, avoidArb, styleArb, fc.constantFrom('', ...SLOTS.map((s) => s.id)), (week, avoid, style, keep) => {
      const fixed = dedupeWeek(week, [], avoid, style, keep)
      fixed.forEach((row, i) => {
        const ids = filled(row)
        expect(new Set(ids).size, `${row.day}: ${ids.join(', ')}`).toBe(ids.length)
        if (keep) expect(row[keep]).toBe(week[i][keep])
      })
    }), RUNS)
  })
})

describe('P2 meals spread across the week', () => {
  it('no meal appears more than ceil(uses / meals in its list) times', () => {
    fc.assert(fc.property(planArb, ({ seed, avoid, style }) => {
      const week = buildVariedWeek([], avoid, seed, style)
      const pools = {}
      SLOTS.forEach((s) => { pools[poolOf(s.id)] ||= { size: optionsFor(s.id, [], avoid, style).length, uses: 0, counts: new Map() } })
      week.forEach((row) => SLOTS.forEach((s) => {
        const id = row[s.id]
        if (!id) return
        const p = pools[poolOf(s.id)]
        p.uses += 1
        p.counts.set(id, (p.counts.get(id) || 0) + 1)
      }))
      Object.entries(pools).forEach(([name, p]) => {
        if (!p.uses) return
        expect(Math.max(...p.counts.values()), name).toBeLessThanOrEqual(Math.ceil(p.uses / p.size))
      })
    }), RUNS)
  })

  it('a slot is left empty only when its list has no meal left for that day', () => {
    fc.assert(fc.property(planArb, ({ seed, avoid, style }) => {
      buildVariedWeek([], avoid, seed, style).forEach((row) => SLOTS.forEach((s) => {
        if (row[s.id]) return
        const today = new Set(filled(row))
        const open = optionsFor(s.id, [], avoid, style).filter((m) => !today.has(m.id))
        expect(open.map((m) => m.id), `${row.day} ${s.id} left empty`).toEqual([])
      }))
    }), RUNS)
  })
})

describe('P3 skips and diet style never leak', () => {
  it('generated weeks hold no skipped food and no meal outside the style', () => {
    fc.assert(fc.property(planArb, ({ seed, avoid, style }) => {
      expect(leaks(buildVariedWeek([], avoid, seed, style), avoid, style)).toEqual([])
    }), RUNS)
  })

  // Known finding: see SKILL.md "Findings". cleanWeek falls back to a fixed
  // meal (firstSafe) when a slot has no safe option, without checking skips.
  it.fails('cleanWeek removes every skipped food from a stored week (KNOWN FINDING F1)', () => {
    fc.assert(fc.property(storedWeekArb, avoidArb, styleArb, (week, avoid, style) => {
      expect(leaks(cleanWeek(week, [], avoid, style), avoid, style)).toEqual([])
    }), RUNS)
  })
})

describe('P4 daily totals never exceed the calorie target', () => {
  it('after factorsForDay, a day never shows more kcal than goal.kcal', () => {
    fc.assert(fc.property(planArb, marksArb, ({ seed, avoid, style }, marks) => {
      const goal = goalFromMarks(marks)
      hydrate(buildVariedWeek([], avoid, seed, style)).forEach((day) => {
        const shown = kcalOf(dayTotals(day, factorsForDay(day, goal)))
        expect(shown, day.day).toBeLessThanOrEqual(goal.kcal + 1e-6)
      })
    }), RUNS)
  })
})

describe('P5 the shopping list matches the plan', () => {
  it('each grocery line equals the scaled grams of that food across the week, nothing extra or missing', () => {
    fc.assert(fc.property(planArb, marksArb, ({ seed, avoid, style }, marks) => {
      const goal = goalFromMarks(marks)
      const days = hydrate(buildVariedWeek([], avoid, seed, style))
      const factors = Object.fromEntries(days.map((d) => [d.id, factorsForDay(d, goal)]))
      const want = new Map()
      days.forEach((day) => SLOTS.forEach((s) => {
        const meal = day[s.id]
        if (!meal) return
        meal.foods.filter((f) => !f.leftover && !f.pantry).forEach((f) => {
          const r = resolveFood(f)
          const key = `${r.aisle || 'Other'}:${r.name}`
          want.set(key, (want.get(key) || 0) + scaleFood(r, factors[day.id][s.id] || 1).grams)
        })
      }))
      const got = new Map()
      groceryFromWeek(days, factors).forEach((sec) => sec.items.forEach((it) => {
        const key = `${sec.name}:${it.name}`
        expect(got.has(key), `duplicate line ${key}`).toBe(false)
        got.set(key, it.grams)
      }))
      expect([...got.keys()].sort()).toEqual([...want.keys()].sort())
      want.forEach((g, key) => expect(got.get(key)).toBeCloseTo(g, 6))
    }), { numRuns: 150 })
  })
})
