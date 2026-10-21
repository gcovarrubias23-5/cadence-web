import { describe, it, expect, beforeEach } from 'vitest'
import { installStorage } from './memoryStorage.js'
import { SLOTS, DEFAULT_WEEK, optionsFor, poolOf, dedupeWeek, cleanWeek, dropCustom } from '../src/plan.js'
import { buildVariedWeek } from '../src/rotateWeek.js'
import { spinMenus } from '../src/weekSpin.js'
import { AVOIDS } from '../src/avoid.js'

beforeEach(() => installStorage())

const AVOID_SETS = [
  [],
  ...AVOIDS.map((a) => [a.id]),
  ['dairy', 'egg'],
  ['dairy', 'gluten'],
  ['gluten', 'fish', 'shellfish'],
  AVOIDS.map((a) => a.id),
]
const STYLES = ['', 'keto', 'carnivore']
const SEEDS = Array.from({ length: 30 }, (_, i) => i + 1)

function filled(row) {
  return SLOTS.map((s) => row[s.id]).filter(Boolean)
}

function expectNoDayRepeats(week) {
  week.forEach((row) => {
    const ids = filled(row)
    expect(new Set(ids).size, `${row.id}: ${ids.join(', ')}`).toBe(ids.length)
  })
}

// Most times one meal may appear in a week: its list's uses spread evenly
// over the meals in that list (the three snacks share one list).
function expectWeeklyBound(week, avoid, style) {
  const pools = {}
  SLOTS.forEach((s) => {
    const pool = poolOf(s.id)
    pools[pool] ||= { size: optionsFor(s.id, [], avoid, style).length, uses: 0, counts: new Map() }
  })
  week.forEach((row) => SLOTS.forEach((s) => {
    const id = row[s.id]
    if (!id) return
    const p = pools[poolOf(s.id)]
    p.uses += 1
    p.counts.set(id, (p.counts.get(id) || 0) + 1)
  }))
  Object.entries(pools).forEach(([name, p]) => {
    if (!p.uses) return
    const bound = Math.ceil(p.uses / p.size)
    const worst = Math.max(...p.counts.values())
    expect(worst, `${name}: ${worst} > ${bound} (${p.size} meals, ${p.uses} uses)`).toBeLessThanOrEqual(bound)
  })
}

describe('Monday regression', () => {
  it('first week after sign-up (seed 1) no longer has the protein shake three times on Monday', () => {
    const mon = buildVariedWeek([], [], 1, '')[0]
    const snacks = [mon.snack1, mon.snack2, mon.snack3]
    expect(snacks.filter((id) => id === 'shakeSnack').length).toBeLessThanOrEqual(1)
    expect(new Set(snacks).size).toBe(3)
  })

  it('a stored week with a repeated Monday snack is repaired on load', () => {
    const broken = DEFAULT_WEEK.map((r) => (r.id === 'mon' ? { ...r, snack1: 'shakeSnack', snack2: 'shakeSnack', snack3: 'shakeSnack' } : r))
    const fixed = dedupeWeek(broken, [], [], '')
    expect(fixed[0].snack1).toBe('shakeSnack')
    expectNoDayRepeats(fixed)
    expect(fixed.slice(1)).toEqual(broken.slice(1))
  })
})

describe('generated weeks', () => {
  it('default settings: six filled, unique plates every day for many weeks', () => {
    SEEDS.forEach((seed) => {
      const week = buildVariedWeek([], [], seed, '')
      week.forEach((row) => expect(filled(row)).toHaveLength(6))
      expectNoDayRepeats(week)
      expectWeeklyBound(week, [], '')
    })
  })

  it('default settings: snacks repeat at most 3 times a week, meals never', () => {
    SEEDS.forEach((seed) => {
      const counts = new Map()
      buildVariedWeek([], [], seed, '').forEach((row) => SLOTS.forEach((s) => counts.set(row[s.id], (counts.get(row[s.id]) || 0) + 1)))
      ;['breakfast', 'lunch', 'dinner'].forEach((slot) => {
        buildVariedWeek([], [], seed, '').forEach((row) => expect(counts.get(row[slot])).toBe(1))
      })
      expect(Math.max(...counts.values())).toBeLessThanOrEqual(3)
    })
  })

  it.each(STYLES.flatMap((style) => AVOID_SETS.map((avoid) => [style || 'no style', avoid.join('+') || 'no skips', style, avoid])))(
    '%s, %s: no meal twice in a day, weekly repeats within bound, no skipped food', (_s, _a, style, avoid) => {
      SEEDS.slice(0, 8).forEach((seed) => {
        const week = buildVariedWeek([], avoid, seed, style)
        expectNoDayRepeats(week)
        expectWeeklyBound(week, avoid, style)
        week.forEach((row) => SLOTS.forEach((s) => {
          if (row[s.id]) expect(optionsFor(s.id, [], avoid, style).map((m) => m.id)).toContain(row[s.id])
        }))
      })
    })

  it.each([[['dairy']], [['dairy', 'egg']], [['dairy', 'gluten']], [['dairy', 'egg', 'gluten']]])(
    'dairy-free (%j) fills all six plates every day with no repeats', (avoid) => {
      expect(optionsFor('snack1', [], ['dairy'], '').length).toBeGreaterThanOrEqual(6)
      SEEDS.forEach((seed) => {
        const week = buildVariedWeek([], avoid, seed, '')
        week.forEach((row) => expect(filled(row), `${seed} ${row.id}`).toHaveLength(6))
        expectNoDayRepeats(week)
        expectWeeklyBound(week, avoid, '')
      })
    })

  it('runs out gracefully: a short list leaves a slot empty instead of repeating', () => {
    // Carnivore and dairy-free: two snacks for three snack slots, no lunches.
    expect(optionsFor('snack1', [], ['dairy'], 'carnivore').length).toBe(2)
    expect(optionsFor('lunch', [], ['dairy'], 'carnivore').length).toBe(0)
    SEEDS.slice(0, 8).forEach((seed) => {
      const week = buildVariedWeek([], ['dairy'], seed, 'carnivore')
      expectNoDayRepeats(week)
      week.forEach((row) => {
        expect(row.lunch).toBe('')
        expect([row.snack1, row.snack2, row.snack3].filter(Boolean)).toHaveLength(2)
      })
    })
  })

  it('new dairy-free snacks carry no dairy and are flagged for their real allergens', () => {
    const flags = (id) => AVOIDS.filter((a) => !optionsFor('snack1', [], [a.id], '').some((m) => m.id === id)).map((a) => a.id)
    expect(flags('turkeyRollups')).toEqual([])
    expect(flags('eggsOrange')).toEqual(['egg'])
    expect(flags('turkeyEggs')).toEqual(['egg'])
    expect(flags('edamameSnack')).toEqual(['soy'])
    expect(flags('tunaRiceCakes')).toEqual(['fish'])
    expect(flags('chickenHummus')).toEqual(['sesame'])
    expect(flags('applePeanut')).toEqual(['peanut'])
  })

  it('spinMenus (sign-up, new week, reset) keeps days unique', () => {
    for (let i = 0; i < 10; i++) expectNoDayRepeats(spinMenus([], [], '').picks)
  })
})

describe('edits keep days unique', () => {
  it('choosing a meal that is already in another slot moves the old copy out', () => {
    const week = DEFAULT_WEEK.map((r) => ({ ...r }))
    week[0].snack2 = week[0].snack1
    const fixed = dedupeWeek(week, [], [], '', 'snack2')
    expect(fixed[0].snack2).toBe(DEFAULT_WEEK[0].snack1)
    expectNoDayRepeats(fixed)
  })

  it('"same snack every day" does not create a repeat on any day', () => {
    const week = DEFAULT_WEEK.map((r) => ({ ...r, snack1: 'grapesTurkey' }))
    const fixed = dedupeWeek(week, [], [], '', 'snack1')
    fixed.forEach((row) => expect(row.snack1).toBe('grapesTurkey'))
    expectNoDayRepeats(fixed)
  })

  it('replacing skipped meals does not drop the same fallback into several slots', () => {
    const week = cleanWeek(DEFAULT_WEEK, [], ['dairy'], '')
    expectNoDayRepeats(week)
  })

  it('deleting a custom plate used in two slots does not refill both with one meal', () => {
    const mine = { id: 'mySnack', name: 'My snack', slot: 'snack', foods: [{ name: 'Jerky', grams: 30, protein: 10, carbs: 3, fat: 1 }] }
    const picks = DEFAULT_WEEK.map((r) => ({ ...r, snack1: 'mySnack', snack3: 'mySnack' }))
    const { nextPicks } = dropCustom(picks, [mine], 'mySnack')
    expectNoDayRepeats(nextPicks)
  })
})
