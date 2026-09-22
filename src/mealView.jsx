import { formatG, formatMacro, kcalOf, scaleFood, sumFoods } from './macros.js'

function lineLabel(food, factor) {
  const closeToBase = factor > 0.9 && factor < 1.1
  if (food.house && closeToBase) return food.house
  if (food.house) return `${formatG(food.grams)} · ${food.house}`
  return formatG(food.grams)
}

export function Meal({ label, meal, factor }) {
  if (!meal) return null
  const plated = meal.foods.map((food) => scaleFood(food, factor))
  const plateTotals = sumFoods(plated)

  return (
    <div className="meal-row">
      <div className="meal-label">{label}</div>
      <div>
        <div className="meal-name">{meal.name}</div>
        <div className="meal-note">
          {meal.time} · {Math.round(kcalOf(plateTotals))} calories
        </div>
        <div className="meal-note">
          {formatMacro(plateTotals.protein)} protein · {formatMacro(plateTotals.carbs)} carbs · {formatMacro(plateTotals.fat)} fat
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
            <li key={food.name + food.grams}>
              <strong>{lineLabel(food, factor)}</strong>
              <span className="food-sub"> · {food.name}</span>
              <div className="qty" style={{ marginTop: 4 }}>
                {formatMacro(food.protein)} protein · {formatMacro(food.carbs)} carbs · {formatMacro(food.fat)} fat
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
