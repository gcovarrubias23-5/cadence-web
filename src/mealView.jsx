import { useState } from 'react'
import { formatG, formatMacro, kcalOf, scaleFood, sumFoods } from './macros.js'
import { kitchenFor } from './kitchenBridge.js'
import { formatPortion } from './portion.js'
import { isWholeEgg } from './foodWords.js'

export function Meal({ label, meal, factor }) {
  const [recipeOpen, setRecipeOpen] = useState(false)
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
          {plated.map((food, i) => {
            const base = meal.foods[i]
            const isEgg = isWholeEgg(food.name)
            const shown = isEgg ? { ...food, grams: base.grams, baseGrams: base.grams } : food
            const portion = formatPortion(shown)
            return (
              <li key={food.name + food.grams}>
                <strong>{food.name}</strong>
                <div className="qty" style={{ marginTop: 4 }}>{formatG(shown.grams)}{portion ? ` · ${portion}` : ''}</div>
                <div className="qty" style={{ marginTop: 4 }}>
                  {formatMacro(food.protein)} protein · {formatMacro(food.carbs)} carbs · {formatMacro(food.fat)} fat
                </div>
              </li>
            )
          })}
        </ul>

        {kitchen && (
          <div className="card" style={{ margin: '12px 0', padding: 12 }}>
            <button
              type="button"
              onClick={() => setRecipeOpen((v) => !v)}
              style={{
                all: 'unset',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                cursor: 'pointer',
                gap: 8,
              }}
              aria-expanded={recipeOpen}
            >
              <div className="goal-title" style={{ margin: 0 }}>How to cook it</div>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{recipeOpen ? '−' : '+'}</span>
            </button>
            {recipeOpen && (
              <>
                <p className="note" style={{ marginTop: 8 }}>
                  {kitchen.preview}{mins ? ` · ${mins}` : ''}
                </p>
                {kitchen.ahead ? <p className="note">{kitchen.ahead}</p> : null}
                <ol className="steps">
                  {kitchen.locked.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                {kitchen.done ? <p className="note">Note: {kitchen.done}</p> : null}
              </>
            )}
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
