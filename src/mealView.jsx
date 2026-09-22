import { formatG, formatMacro, kcalOf, scaleFood, sumFoods } from './macros.js'
import { kitchenFor } from './kitchenNotes.js'

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
  const kitchen = kitchenFor(meal)

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

        <div className="goal-title" style={{ marginTop: 12 }}>On the plate</div>
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

        {kitchen && (
          <div className="card" style={{ margin: '12px 0', padding: 12 }}>
            <div className="goal-title">How to cook it</div>
            <p className="note" style={{ marginTop: 6 }}>{kitchen.preview}</p>
            <ol className="steps">
              {kitchen.locked.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="note">Test view. We hide this behind the upgrade next.</p>
          </div>
        )}

        {!kitchen && meal.steps?.length > 0 && (
          <ol className="steps">
            {meal.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
