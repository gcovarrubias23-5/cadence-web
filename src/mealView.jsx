import { eatenFoods, formatG, formatMacro, kcalOf, scaleFood, sumFoods } from './macros.js'

function lineLabel(food, factor) {
  const scaled = formatG(food.grams)
  const closeToBase = factor > 0.9 && factor < 1.1
  if (food.house && closeToBase) return food.house
  if (food.house) return `${scaled} (base: ${food.house})`
  return scaled
}

export function Meal({ label, meal, factor }) {
  const plated = eatenFoods(meal.foods).map((food) => scaleFood(food, factor))
  const extras = meal.foods.filter((f) => f.prep).map((food) => scaleFood(food, factor))
  const plateTotals = sumFoods(plated)

  return (
    <div className="meal-row">
      <div className="meal-label">{label}</div>
      <div>
        <div className="meal-name">{meal.name}</div>
        <div className="meal-note">
          {meal.time} · {Math.round(kcalOf(plateTotals))} calories · {formatMacro(plateTotals.protein)} protein
        </div>
        {meal.steps?.length > 0 && (
          <ol className="steps">
            {meal.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        )}
        <ul className="foods">
          {plated.map((food) => (
            <li key={food.name + food.grams + (food.leftover ? 'L' : '')}>
              <strong>{lineLabel(food, factor)}</strong>
              <span className="food-sub">
                {' '}· {food.name}
                {factor > 0.9 && factor < 1.1 ? ` · ${formatG(food.grams)}` : ''}
                {food.leftover ? ' · leftover' : ''}
                {food.pantry ? ' · pantry' : ''}
              </span>
            </li>
          ))}
        </ul>
        {extras.length > 0 && (
          <p className="note">
            Cook extra now:{' '}
            {extras.map((food) => food.house || `${food.name} ${formatG(food.grams)}`).join('; ')}
          </p>
        )}
      </div>
    </div>
  )
}
