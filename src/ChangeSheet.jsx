import { optionsFor } from './plan.js'

export function ChangeSheet({ picking, custom, onChoose, onInvent, onClose }) {
  const all = optionsFor(picking.slot, custom)
  const yours = all.filter((m) => m.custom)
  const neu = all.filter((m) => m.fresh && !m.custom)
  const rest = all.filter((m) => !m.custom && !m.fresh)

  function Block({ title, meals }) {
    if (!meals.length) return null
    return (
      <div style={{ margin: '16px 0 8px' }}>
        <div className="goal-title" style={{ marginBottom: 10 }}>{title}</div>
        {meals.map((meal) => (
          <button
            key={meal.id}
            className={meal.id === picking.current ? 'option on' : 'option'}
            type="button"
            onClick={() => onChoose(picking.dayId, picking.slot, meal.id)}
          >
            <strong>{meal.name}</strong>
            <span>{meal.custom ? 'your plate' : meal.time}</span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="sheet" onClick={onClose}>
      <div className="sheet-card" onClick={(e) => e.stopPropagation()} style={{ paddingTop: 36 }}>
        <h2 style={{ margin: '8px 0 6px' }}>Change this slot</h2>
        <p className="note" style={{ marginTop: 0 }}>What do you want instead?</p>
        <Block title="Your plates" meals={yours} />
        <Block title="New from Cadence" meals={neu} />
        <Block title="Built by Cadence" meals={rest} />
        <button className="btn" type="button" onClick={onInvent}>Invent a plate</button>
        <button className="btn btn-ghost" type="button" onClick={onClose}>Never mind</button>
      </div>
    </div>
  )
}
