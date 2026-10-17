export const PULSE_STEP = 0.05

export const DEFAULT_MARKS = {
  weekMark: 5,
  mealsPerDay: 6,
  protein: 120,
  carbs: 150,
  fat: 60,
}

// The app always plans six plates a day. Early builds saved mealsPerDay: 5 as a
// default (no screen ever let anyone pick it), so a saved 5 is upgraded to 6.
export function loadMarks(saved) {
  if (!saved || typeof saved !== 'object') return { ...DEFAULT_MARKS }
  const next = { ...DEFAULT_MARKS, ...saved }
  const n = Number(next.mealsPerDay)
  if (!Number.isFinite(n) || n === 5 || n < 1) next.mealsPerDay = DEFAULT_MARKS.mealsPerDay
  return next
}

export function applyPulse(marks, move) {
  const next = { ...marks }
  if (move === 'hungry') {
    next.weekMark = Math.min(12, Number(marks.weekMark || 5) + 1)
    next.carbs = roundG(marks.carbs * (1 + PULSE_STEP))
    next.fat = roundG(marks.fat * (1 + PULSE_STEP * 0.6))
    next.protein = roundG(marks.protein * (1 + PULSE_STEP * 0.25))
  } else if (move === 'heavy') {
    next.weekMark = Math.max(1, Number(marks.weekMark || 5) - 1)
    next.carbs = roundG(marks.carbs * (1 - PULSE_STEP))
    next.fat = roundG(marks.fat * (1 - PULSE_STEP * 0.6))
    next.protein = roundG(marks.protein * (1 - PULSE_STEP * 0.15))
  }
  return next
}

function roundG(n) {
  return Math.max(20, Math.round(Number(n) || 0))
}

export const PULSE_COPY = {
  prompt: 'How did this week feel?',
  hint: 'Did you have enough? Next week gets a little more, stays the same, or eases off.',
  hungry: {
    title: 'Still hungry',
    line: 'I could have eaten more.',
  },
  right: {
    title: 'Felt right',
    line: 'Leave the amounts alone.',
  },
  heavy: {
    title: 'Too much',
    line: 'Ease it off a little.',
  },
}
