import { describe, it, expect } from 'vitest'
import { installStorage } from './memoryStorage.js'
import { adaptWeek } from '../src/adaptWeek.js'
import { applyPulse, DEFAULT_MARKS } from '../src/checkin.js'
import { isCheckinDue, daysUntilCheckin } from '../src/weekGate.js'

const DAY = 24 * 60 * 60 * 1000

function withWeights(a, b) {
  installStorage({ 'cadence.weightLog': JSON.stringify([{ date: '2026-10-01', value: a }, { date: '2026-10-08', value: b }]) })
}

describe('7-day check-in timing', () => {
  it('is due with no history, then every 7 days', () => {
    const now = Date.parse('2026-10-17T12:00:00Z')
    expect(isCheckinDue(null, now)).toBe(true)
    expect(isCheckinDue(new Date(now - 6 * DAY).toISOString(), now)).toBe(false)
    expect(isCheckinDue(new Date(now - 7 * DAY).toISOString(), now)).toBe(true)
    expect(daysUntilCheckin(new Date(now - 2 * DAY).toISOString(), now)).toBe(5)
  })
})

describe('adaptWeek suggestion', () => {
  it('stays put with fewer than two weigh-ins', () => {
    installStorage()
    const r = adaptWeek({ platePct: 90, goalId: 'hold' })
    expect(r.move).toBe('right')
    expect(r.thin).toBe(true)
  })

  it('hold: weight drop with plates eaten -> a little more', () => {
    withWeights(180, 179)
    expect(adaptWeek({ platePct: 80, goalId: 'hold' }).move).toBe('hungry')
  })

  it('hold: weight gain with plates eaten -> ease off', () => {
    withWeights(180, 181)
    const r = adaptWeek({ platePct: 80, goalId: 'hold' })
    expect(r.move).toBe('heavy')
    expect(r.why).toContain('Weight climbed 1 lb')
  })

  it('does not react when most plates were skipped', () => {
    withWeights(180, 178)
    expect(adaptWeek({ platePct: 30, goalId: 'hold' }).move).toBe('right')
  })

  it('lose: a normal 1 lb drop is on track', () => {
    withWeights(180, 179)
    expect(adaptWeek({ platePct: 80, goalId: 'lose' }).move).toBe('right')
  })

  it('kg logs are converted before thresholds', () => {
    installStorage({ 'cadence.weightLog': JSON.stringify([{ date: '1', value: 80, kg: true }, { date: '2', value: 79.5, kg: true }]) })
    expect(adaptWeek({ platePct: 80, goalId: 'hold' }).move).toBe('hungry')
  })
})

describe('applyPulse', () => {
  it('right leaves marks alone', () => {
    expect(applyPulse(DEFAULT_MARKS, 'right')).toEqual(DEFAULT_MARKS)
  })

  it('hungry nudges up ~5% carbs, less fat and protein', () => {
    const n = applyPulse(DEFAULT_MARKS, 'hungry')
    expect(n.carbs).toBe(158)
    expect(n.fat).toBe(62)
    expect(n.protein).toBe(122)
    expect(n.weekMark).toBe(6)
  })

  it('heavy nudges down and respects floors', () => {
    const n = applyPulse(DEFAULT_MARKS, 'heavy')
    expect(n.carbs).toBe(143)
    expect(n.weekMark).toBe(4)
    expect(applyPulse({ ...DEFAULT_MARKS, weekMark: 1, carbs: 20 }, 'heavy')).toMatchObject({ weekMark: 1, carbs: 20 })
  })
})
