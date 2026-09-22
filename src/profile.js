export const ACTIVITY = [
  { id: 'sit', label: 'Mostly sitting', line: 'Desk days. Little structured movement.', factor: 1.2 },
  { id: 'light', label: 'Light', line: 'Walks or easy sessions 1–3 days a week.', factor: 1.375 },
  { id: 'steady', label: 'Steady', line: 'Training or hard walks 3–5 days a week.', factor: 1.55 },
  { id: 'hard', label: 'Hard most days', line: 'Hard sessions most days of the week.', factor: 1.725 },
  { id: 'job', label: 'Job plus training', line: 'Physical work and daily training.', factor: 1.9 },
]

export const GOALS = [
  { id: 'lose', label: 'Lose some weight', line: 'A modest deficit. Plates stay filling.' },
  { id: 'hold', label: 'Hold where I am', line: 'Eat near what you burn.' },
  { id: 'strong', label: 'Get stronger', line: 'A small surplus to support training.' },
]

export function toKg(lb) {
  return Number(lb) * 0.45359237
}

export function toCm(ft, inch) {
  return Number(ft) * 30.48 + Number(inch) * 2.54
}

export function bmiOf(kg, cm) {
  const m = cm / 100
  if (!kg || !m) return 0
  return kg / (m * m)
}

export function bmiLabel(bmi) {
  if (bmi < 18.5) return 'Under the usual adult range'
  if (bmi < 25) return 'In the usual adult range'
  if (bmi < 30) return 'Above the usual adult range'
  return 'Well above the usual adult range'
}

export function bmrMifflin({ kg, cm, age, sex }) {
  const base = 10 * kg + 6.25 * cm - 5 * age
  return sex === 'woman' ? base - 161 : base + 5
}

export function buildTargets(profile) {
  const kg = profile.units === 'metric' ? Number(profile.weight) : toKg(profile.weight)
  const cm = profile.units === 'metric' ? Number(profile.heightCm) : toCm(profile.heightFt, profile.heightIn)
  const age = Number(profile.age)
  const act = ACTIVITY.find((a) => a.id === profile.activity) || ACTIVITY[2]
  const bmr = bmrMifflin({ kg, cm, age, sex: profile.sex })
  const tdee = bmr * act.factor
  let kcal = tdee
  if (profile.goal === 'lose') kcal = tdee * 0.85
  if (profile.goal === 'strong') kcal = tdee * 1.1
  const floor = profile.sex === 'woman' ? 1200 : 1500
  kcal = Math.max(floor, kcal)
  const lb = kg / 0.45359237
  const proteinPerLb = profile.goal === 'hold' ? 0.7 : 0.8
  let protein = Math.round(lb * proteinPerLb)
  const fatKcal = kcal * 0.27
  let fat = Math.round(fatKcal / 9)
  let carbs = Math.round((kcal - protein * 4 - fat * 9) / 4)
  if (carbs < 80) {
    carbs = 80
    fat = Math.max(35, Math.round((kcal - protein * 4 - carbs * 4) / 9))
  }
  const bmi = bmiOf(kg, cm)
  return {
    kg,
    cm,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    kcal: Math.round(kcal),
    protein,
    carbs,
    fat,
    bmi: Math.round(bmi * 10) / 10,
    bmiText: bmiLabel(bmi),
    activity: act,
  }
}
