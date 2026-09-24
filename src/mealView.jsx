import { formatG, formatMacro, kcalOf, scaleFood, sumFoods } from './macros.js'
import { kitchenFor } from './kitchenNotes.js'
import { formatPortion } from './portion.js'

export function Meal({ label, meal, factor }) {
  if (!meal) return null
  const plated = meal.foods.map((food) => scaleFood(food, factor))
  const plateTotals = sumFoods(plated)
  const kitchen = kitchenFor(meal)
  const mins = kitchen?.time || meal.time

  return (
    <div className="meal-row">
      <div className="meal-label">{label}</div>
      <div>
        <div className="meal-name">{meal.name}</div>
        <div className="meal-note">
          {mins} · {Math.round(kcalOf(plateTotals))} calories
        </div>
        <div className="meal-note">
          {formatMacro(plateTotals.protein)} protein · {formatMacro(plateTotals.carbs)} carbs · {formatMacro(plateTotals.fat)} fat
        </div>

        <div className="goal-title" style={{ marginTop: 12 }}>On the plate</div>
        <ul className="foods">
          {plated.map((food) => {
            const portion = formatPortion(food)
            return (
              <li key={food.name + food.grams}>
                <strong>{food.name}</strong>
                <div className="qty" style={{ marginTop: 4 }}>{formatG(food.grams)}{portion ? ` · ${portion}` : ''}</div>
                <div className="qty" style={{ marginTop: 4 }}>
                  {formatMacro(food.protein)} protein · {formatMacro(food.carbs)} carbs · {formatMacro(food.fat)} fat
                </div>
              </li>
            )
          })}
        </ul>

        {kitchen && (
          <div className="card" style={{ margin: '12px 0', padding: 12 }}>
            <div className="goal-title">How to cook it</div>
            <p className="note" style={{ marginTop: 6 }}>
              {kitchen.preview}{mins ? ` · ${mins}` : ''}
            </p>
            {kitchen.ahead ? <p className="note">{kitchen.ahead}</p> : null}
            <ol className="steps">
              {kitchen.locked.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {kitchen.done ? <p className="note">Done when: {kitchen.done}</p> : null}
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
