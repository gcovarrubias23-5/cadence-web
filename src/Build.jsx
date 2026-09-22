import { SLOTS, mealOf } from './plan.js'

export function Build({ picks, custom = [], onPick, onReset, onCopyDay, onRepeatSlot, onInvent }) {
  return (
    <>
      <section className="hero">
        <h1>Build your week.</h1>
        <p>Pick our plates, or invent one from foods. Kitchen still sizes the grams to your numbers.</p>
        <button className="btn" type="button" onClick={onInvent}>Invent a plate</button>
        <button className="btn btn-ghost" type="button" onClick={onReset}>Use the starter week</button>
      </section>

      {custom.length > 0 && (
        <section className="card">
          <div className="goal-title">Your plates</div>
          {custom.map((meal) => (
            <p key={meal.id} className="note" style={{ marginTop: 6 }}>{meal.name} · {meal.slot}</p>
          ))}
        </section>
      )}

      {picks.map((row) => (
        <article className="card" key={row.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
            <h3 className="day-name" style={{ margin: 0 }}>{row.day}</h3>
            <button className="change" type="button" style={{ margin: 0 }} onClick={() => onCopyDay(row.id)}>
              Use this day all week
            </button>
          </div>
          {SLOTS.map((slot) => {
            const meal = mealOf(row[slot.id], custom)
            return (
              <div key={slot.id}>
                <button className="pick-row" type="button" onClick={() => onPick(row.id, slot.id, row[slot.id])}>
                  <span className="meal-label">{slot.label}</span>
                  <span>{meal.name}</span>
                  <span className="qty">Change</span>
                </button>
                <button className="change" type="button" onClick={() => onRepeatSlot(slot.id, row[slot.id])}>
                  Same {slot.label.toLowerCase()} every day
                </button>
              </div>
            )
          })}
        </article>
      ))}
    </>
  )
}
