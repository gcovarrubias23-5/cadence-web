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
    if (q.length < 2) return []
    return PANTRY.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6)
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
    onSave({
      id,
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
        <h2 style={{ marginBottom: 8 }}>Build it here. Search below.</h2>

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

        <div className="card" style={{ margin: '12px 0', maxHeight: 220, overflow: 'auto' }}>
          <div className="goal-title">On this plate</div>
          {lines.length === 0 && <p className="note" style={{ marginTop: 0 }}>Nothing yet. Type a food name under this box.</p>}
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

        <label className="goal-field">
          <span>Add a food</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type chicken, rice, yogurt…" autoComplete="off" />
        </label>
        <div style={{ overflow: 'auto', flex: 1, minHeight: 0 }}>
          {query.trim().length < 2 && <p className="note">Type two letters to see matches. We hide the long list on purpose.</p>}
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
