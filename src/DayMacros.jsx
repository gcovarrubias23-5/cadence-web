import { formatMacro } from './macros.js'
import { formatKcalRange } from './kcalRange.js'

export function DayMacros({ kcal, protein, carbs, fat }) {
  return (
    <span className="macro-line">
      {formatKcalRange(kcal)} cal · {formatMacro(protein)} P · {formatMacro(carbs)} C · {formatMacro(fat)} F
    </span>
  )
}
