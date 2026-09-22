import { useMemo, useState } from 'react'
import { SLOTS } from './plan.js'
import { PANTRY, portionFromPantry } from './pantry.js'
import { kcalOf, formatMacro } from './macros.js'

const SNACK_IDS = ['snack1', 'snack2', 'snack3']

function macroKind(item) {
  const p = item.protein * 4
  const c = item.carbs * 4
  const f = item.fat * 9
  if (p >= c && p >= f) return 'protein'
  if (f >= p && f >= c) return 'fat'
  return 'carbs'
}

const FILTERS = [
  { id: 'protein', label: 'Protein' },
  { id: 'carbs', label: 'Carbs' },
  { id: 'fat', label: 'Fat' },
]

export function Invent({ onSave, onClose }) {
  const [name, setName] = useState('')
  const [slot, setSlot] = useState('lunch')
  const [filter, setFilter] = useState('protein')
  const [lines, setLines] = useState([])

  const hits = useMemo(
    () => PANTRY.filter((p) => macroKind(p) === filter),
    [filter],
  )

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
    onSave({
      id: `custom-${Date.now()}`,
      name: name.trim(),
      time: 'your plate',
      slot: SNACK_IDS.includes(slot) ? 'snack' : slot,
      custom: true,
      steps: lines.map((f) => `${f.house || f.name} · ${Math.round(f.grams)} g`),
      foods: lines,
    }, slot)
  }

  return (
    <div className="sheet" onClick={onClose}>
      <div className="sheet-card" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', maxHeight: '88vh' }}>
        <p className="plan-kicker">Invent a plate</p>
        <h2 style={{ marginBottom: 8 }}>Pick a macro. Add the food.</h2>

        <label className="goal-field">
          <span>Plate name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tuesday chicken bowl" />
        </label>
        <label className="goal-field" style={{ marginTop: 8 }}>
          <span>Slot</span>
          <select value={slot} onChange={(e) => setSlot(e.target.value)} style={{ width: '100%', border: '1px solid var(--line)', borderRadius: 10, padding: 8, font: '600 16px var(--sans)', background: '#fff' }}>
            {SLOTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>

        <div className="card" style={{ margin: '12px 0', maxHeight: 180, overflow: 'auto' }}>
          <div className="goal-title">On this plate</div>
          {lines.length === 0 && <p className="note" style={{ marginTop: 0 }}>Tap Protein, Carbs, or Fat, then a food.</p>}
          {lines.map((line, i) => (
            <div key={`${line.name}-${i}`} style={{ display: 'grid', gridTemplateColumns: '1fr 72px auto', gap: 8, alignItems: 'center', borderTop: '1px solid var(--line)', padding: '8px 0' }}>
              <div>
                <strong>{line.name}</strong>
                <div className="qty">{line.house}</div>
              </div>
              <input type="number" min="1" value={Math.round(line.grams)} onChange={(e) => setGrams(i, e.target.value)} />
              <button className="change" type="button" style={{ margin: 0 }} onClick={() => remove(i)}>Remove</button>
            </div>
          ))}
          {lines.length > 0 && (
            <p className="note">
              {formatMacro(totals.protein)} P · {formatMacro(totals.carbs)} C · {formatMacro(totals.fat)} F · {Math.round(kcalOf(totals))} cal
            </p>
          )}
        </div>

        <div className="checkin-row" style={{ marginBottom: 8 }}>
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className={filter === f.id ? 'checkin on' : 'checkin'} onClick={() => setFilter(f.id)}>
              <strong>{f.label}</strong>
            </button>
          ))}
        </div>

        <div style={{ overflow: 'auto', flex: 1, minHeight: 0 }}>
          {hits.map((item) => (
            <button key={item.name} type="button" className="option" onClick={() => addItem(item)}>
              <strong>{item.name}</strong>
              <span>{item.house}</span>
            </button>
          ))}
        </div>

        <div style={{ paddingTop: 8 }}>
          <button className="btn" type="button" onClick={save} disabled={!name.trim() || !lines.length}>Save this plate</button>
          <button className="btn btn-ghost" type="button" onClick={onClose}>Never mind</button>
        </div>
      </div>
    </div>
  )
}
