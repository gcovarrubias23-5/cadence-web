import { useMemo, useState } from 'react'
import { SLOTS } from './plan.js'
import { PANTRY, portionFromPantry } from './pantry.js'
import { kcalOf, formatMacro } from './macros.js'

const SNACK_IDS = ['snack1', 'snack2', 'snack3']

export function Invent({ onSave, onClose }) {
  const [name, setName] = useState('')
  const [slot, setSlot] = useState('lunch')
  const [query, setQuery] = useState('')
  const [lines, setLines] = useState([])

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PANTRY.slice(0, 12)
    return PANTRY.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 16)
  }, [query])

  const totals = lines.reduce(
    (acc, f) => ({
      protein: acc.protein + f.protein,
      carbs: acc.carbs + f.carbs,
      fat: acc.fat + f.fat,
    }),
    { protein: 0, carbs: 0, fat: 0 },
  )

  function addItem(item) {
    setLines((prev) => [...prev, portionFromPantry(item, item.base)])
    setQuery('')
  }

  function setGrams(i, grams) {
    setLines((prev) => prev.map((line, idx) => {
      if (idx !== i) return line
      const src = PANTRY.find((p) => p.name === line.name)
      return src ? portionFromPantry(src, grams) : { ...line, grams: Number(grams) || 0 }
    }))
  }

  function remove(i) {
    setLines((prev) => prev.filter((_, idx) => idx !== i))
  }

  function save() {
    if (!name.trim() || lines.length === 0) return
    const id = `custom-${Date.now()}`
    const meal = {
      id,
      name: name.trim(),
      time: 'your plate',
      slot: SNACK_IDS.includes(slot) ? 'snack' : slot,
      custom: true,
      steps: lines.map((f) => `${f.house || f.name} · ${Math.round(f.grams)} g`),
      foods: lines,
    }
    onSave(meal, slot)
  }

  return (
    <div className="sheet" onClick={onClose}>
      <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
        <p className="plan-kicker">Invent a plate</p>
        <h2>Add foods. We do the grams.</h2>
        <label className="goal-field">
          <span>Plate name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tuesday chicken bowl" />
        </label>
        <p className="note">Which slot is this for?</p>
        <div className="checkin-row">
          {SLOTS.map((s) => (
            <button key={s.id} type="button" className={slot === s.id ? 'checkin on' : 'checkin'} onClick={() => setSlot(s.id)}>
              <strong>{s.label}</strong>
            </button>
          ))}
        </div>
        <label className="goal-field" style={{ marginTop: 12 }}>
          <span>Find a food</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="chicken, rice, yogurt" />
        </label>
        <div>
          {hits.map((item) => (
            <button key={item.name} type="button" className="option" onClick={() => addItem(item)}>
              <strong>{item.name}</strong>
              <span>{item.house} · {item.aisle}</span>
            </button>
          ))}
        </div>
        {lines.length > 0 && (
          <div className="card" style={{ marginTop: 8 }}>
            {lines.map((line, i) => (
              <div key={`${line.name}-${i}`} className="pick-row" style={{ gridTemplateColumns: '1fr 88px auto' }}>
                <span>{line.name}<br /><span className="qty">{line.house}</span></span>
                <input type="number" min="1" value={Math.round(line.grams)} onChange={(e) => setGrams(i, e.target.value)} />
                <button className="change" type="button" onClick={() => remove(i)}>Remove</button>
              </div>
            ))}
            <p className="note">
              {formatMacro(totals.protein)} P · {formatMacro(totals.carbs)} C · {formatMacro(totals.fat)} F · {Math.round(kcalOf(totals))} cal before Kitchen sizes it.
            </p>
          </div>
        )}
        <button className="btn" type="button" onClick={save} disabled={!name.trim() || !lines.length}>Save this plate</button>
        <button className="btn btn-ghost" type="button" onClick={onClose}>Never mind</button>
      </div>
    </div>
  )
}
