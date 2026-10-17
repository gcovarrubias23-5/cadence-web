import { describe, it, expect } from 'vitest'
import { buildTargets, bmrMifflin } from '../src/profile.js'
import { goalFromMarks, kcalOf } from '../src/macros.js'

const base = { units: 'imperial', weight: 180, heightFt: 5, heightIn: 10, age: 39, sex: 'man', activity: 'steady', goal: 'hold' }

describe('week sizing (buildTargets)', () => {
  it('uses Mifflin-St Jeor times the activity factor', () => {
    const t = buildTargets(base)
    const bmr = bmrMifflin({ kg: t.kg, cm: t.cm, age: 39, sex: 'man' })
    expect(t.bmr).toBe(Math.round(bmr))
    expect(t.tdee).toBe(Math.round(bmr * 1.55))
    expect(t.kcal).toBe(t.tdee)
  })

  it('lose is a 15% deficit, strong a 10% surplus', () => {
    const hold = buildTargets(base)
    const lose = buildTargets({ ...base, goal: 'lose' })
    const strong = buildTargets({ ...base, goal: 'strong' })
    expect(lose.kcal).toBeCloseTo(hold.tdee * 0.85, -1)
    expect(strong.kcal).toBeCloseTo(hold.tdee * 1.1, -1)
  })

  it('never goes below the calorie floor', () => {
    const tiny = { ...base, weight: 95, heightFt: 4, heightIn: 10, age: 80, activity: 'sit', goal: 'lose' }
    expect(buildTargets({ ...tiny, sex: 'woman' }).kcal).toBe(1200)
    expect(buildTargets(tiny).kcal).toBe(1500)
  })

  it('protein is 0.7 g/lb on hold, 0.8 otherwise', () => {
    expect(buildTargets(base).protein).toBe(Math.round(180 * 0.7))
    expect(buildTargets({ ...base, goal: 'lose' }).protein).toBe(Math.round(180 * 0.8))
  })

  it('macros add back up to the calorie target', () => {
    const t = buildTargets(base)
    expect(Math.abs(kcalOf(t) - t.kcal)).toBeLessThan(10)
  })

  it('keto and carnivore pin carbs', () => {
    expect(buildTargets({ ...base, style: 'keto' }).carbs).toBe(30)
    expect(buildTargets({ ...base, style: 'carnivore' }).carbs).toBe(8)
  })

  it('metric input matches imperial input', () => {
    const imp = buildTargets(base)
    const met = buildTargets({ ...base, units: 'metric', weight: imp.kg, heightCm: imp.cm })
    expect(met.kcal).toBe(imp.kcal)
  })

  it('goalFromMarks derives kcal from macros', () => {
    const g = goalFromMarks({ protein: 120, carbs: 150, fat: 60 })
    expect(g.kcal).toBe(120 * 4 + 150 * 4 + 60 * 9)
    expect(g.mealsPerDay).toBe(6)
  })
})
