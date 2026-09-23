export function seedFrom(initial, defaultSlot) {
  let meal = initial
  if (!meal) {
    try { meal = JSON.parse(localStorage.getItem('cadence.editMeal') || 'null') } catch { meal = null }
  }
  try { localStorage.removeItem('cadence.editMeal') } catch {}
  return {
    name: meal?.name || '',
    slot: meal?.slot && meal.slot !== 'snack' ? meal.slot : (defaultSlot || 'lunch'),
    lines: meal?.foods || [],
    id: meal?.id || '',
  }
}
