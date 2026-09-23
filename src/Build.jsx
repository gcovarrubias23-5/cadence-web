import { useState } from 'react'
import { SLOTS, mealOf } from './plan.js'

export function Build({
  picks, custom = [], onPick, onReset, onCopyDay, onRepeatSlot,
  onInvent, onEdit = () => {}, onDelete = () => {},
}) {
  const [open, setOpen] = useState(picks[0]?.id || 'mon')
  return (
    <>
      <section className="hero">
        <h1>Build your week.</h1>
        <p>Open one day. Invent a plate, change a slot, or clean up your plates.</p>
        <button className="btn" type="button" onClick={() => onInvent()} >Invent a plate</button>
        <button className="btn btn-ghost" type="button" onClick={onReset}>Use the starter week</button>
      </section>

      {custom.length > 0 && (
        <section className="card">
          <div className="goal-title">Your plates</div>
          {custom.map((meal) => (
            <div key={meal.id} style={{ borderTop: '1px solid var(--line)', padding: '10px 0' }}>
              <strong>{meal.name}</strong>
              <div className="qty">{meal.slot || 'meal'}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <button className="change" type="button" style={{ margin: 0 }} onClick={() => {
                  try { localStorage.setItem('cadence.editMeal', JSON.stringify(meal)) } catch {}
                  onEdit(meal)
                  onInvent(meal)
                }}>Edit</button>
                <button className="change" type="button" style={{ margin: 0 }} onClick={() => {
                  if (window.confirm(`Delete ${meal.name}?`)) onDelete(meal.id)
                }}>Delete</button>
              </div>
            </div>
          ))}
        </section>
      )}

      {picks.map((row) => {
        const shown = open === row.id
        return (
          <article className="card" key={row.id}>
            <button className="day-head" type="button" onClick={() => setOpen(shown ? '' : row.id)}>
              <span>
                <span className="day-name">{row.day}</span>
                <span className="macro-line">{shown ? 'Tap to close' : 'Tap to build this day'}</span>
              </span>
            </button>
            {shown && (
              <>
                <button className="change" type="button" style={{ margin: '8px 0' }} onClick={() => onCopyDay(row.id)}>
                  Use this day all week
                </button>
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
              </>
            )}
          </article>
        )
      })}
    </>
  )
}
