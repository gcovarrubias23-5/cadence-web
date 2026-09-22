import { useMemo, useState } from 'react'
import { SLOTS } from './plan.js'
import { foodsOf } from './pantry.js'
import { addServing, bumpLine, fillRest, houseFor, leftoverOf, targetFor } from './inventMath.js'

const SNACK_IDS = ['snack1', 'snack2', 'snack3']

const TYPES = [
  { id: 'protein', label: 'Protein', line: 'Chicken, eggs, yogurt, fish' },
  { id: 'carbs', label: 'Carbs', line: 'Rice, fruit, cooked veg, oats' },
  { id: 'fat', label: 'Fat', line: 'Oil, avocado, cheese, butter' },
  { id: 'free', label: 'Free', line: 'Raw veg. No tomato, carrot, or pepper.' },
]

export function Invent({ goal, defaultSlot = 'lunch', onSave, onClose }) {
  const [name, setName] = useState('')
  const [slot, setSlot] = useState(defaultSlot)
  const [kind, setKind] = useState('protein')
  const [lines, setLines] = useState([])
  const hits = foodsOf(kind)
  const slotMeta = SLOTS.find((s) => s.id === slot) || { label: 'This meal' }
  const target = useMemo(() => targetFor(goal, slot), [goal, slot])
  const left = leftoverOf(lines, target)
  const filled = {
    protein: target.protein - left.protein,
    carbs: target.carbs - left.carbs,
    fat: target.fat - left.fat,
  }

  function save() {
    if (!name.trim() || lines.length === 0) return
    onSave({
      id: `custom-${Date.now()}`,
      name: name.trim(),
      time: 'your plate',
      slot: SNACK_IDS.includes(slot) ? 'snack' : slot,
      custom: true,
      locked: true,
      steps: lines.map((f) => f.house || `${Math.round(f.grams)} g ${f.name}`),
      foods: lines,
    }, slot)
  }

  return (
    <div className="sheet" onClick={onClose}>
      <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
        <p className="plan-kicker">Invent a plate</p>
        <h2 style={{ marginBottom: 8 }}>{slotMeta.label} only</h2>
        <p className="note" style={{ marginTop: 0 }}>
          Day is {Math.round(goal?.protein || 0)}P · {Math.round(goal?.carbs || 0)}C · {Math.round(goal?.fat || 0)}F.
          This {slotMeta.label.toLowerCase()} wants {Math.round(target.protein)}P · {Math.round(target.carbs)}C · {Math.round(target.fat)}F.
          Add one serving at a time. Split tortillas and sweet potato. Use Fill the rest on the last food.
        </p>

        <div className="card" style={{ marginBottom: 12 }}>
          <div className="goal-title">Left on this {slotMeta.label.toLowerCase()}</div>
          <Meter label="Protein" need={target.protein} have={filled.protein} left={left.protein} />
          <Meter label="Carbs" need={target.carbs} have={filled.carbs} left={left.carbs} />
          <Meter label="Fat" need={target.fat} have={filled.fat} left={left.fat} />
        </div>

        <label className="goal-field">
          <span>Plate name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tuesday chicken bowl" />
        </label>
        <label className="goal-field" style={{ marginTop: 8 }}>
          <span>Which meal</span>
          <select value={slot} onChange={(e) => setSlot(e.target.value)} style={{ width: '100%', border: '1px solid var(--line)', borderRadius: 10, padding: 8, font: '600 16px var(--sans)', background: '#fff' }}>
            {SLOTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>

        <p className="note" style={{ marginBottom: 6 }}>Choose a food type</p>
        {TYPES.map((t) => (
          <button key={t.id} type="button" className={kind === t.id ? 'option on' : 'option'} onClick={() => setKind(t.id)}>
            <strong>{t.label}</strong>
            <span>{t.id !== 'free' && left[t.id] > 0.5 ? `${Math.round(left[t.id])}g ${t.id} still open` : t.id !== 'free' ? 'this plate is filled' : t.line}</span>
          </button>
        ))}

        <div className="card" style={{ margin: '12px 0' }}>
          <div className="goal-title">On this plate</div>
          {lines.length === 0 && <p className="note" style={{ marginTop: 0 }}>Each tap adds one serving. Then Less, More, or Fill the rest.</p>}
          {lines.map((line, i) => (
            <div key={`${line.name}-${i}`} style={{ borderTop: '1px solid var(--line)', padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <strong>{line.name}</strong>
                  <div className="qty">{line.house}</div>
                </div>
                <button className="change" type="button" style={{ margin: 0 }} onClick={() => setLines((prev) => prev.filter((_, idx) => idx !== i))}>Remove</button>
              </div>
              {line.kind !== 'free' && (
                <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                  <button className="change" type="button" style={{ margin: 0 }} onClick={() => setLines((prev) => bumpLine(prev, i, -1))}>Less</button>
                  <button className="change" type="button" style={{ margin: 0 }} onClick={() => setLines((prev) => bumpLine(prev, i, 1))}>More</button>
                  <button className="change" type="button" style={{ margin: 0 }} onClick={() => setLines((prev) => fillRest(prev, i, target))}>Fill the rest</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="note" style={{ marginBottom: 4 }}>Add one serving</p>
        {hits.map((item) => (
          <button key={item.name} type="button" className="option" onClick={() => setLines((prev) => addServing(prev, item))}>
            <strong>{item.name}</strong>
            <span>Add {houseFor(item, item.base)}</span>
          </button>
        ))}

        <button className="btn" type="button" onClick={save} disabled={!name.trim() || !lines.length}>Save this plate</button>
        <button className="btn btn-ghost" type="button" onClick={onClose}>Never mind</button>
      </div>
    </div>
  )
}

function Meter({ label, need, have, left }) {
  const pct = Math.min(100, Math.round((have / Math.max(need, 1)) * 100))
  const done = left < 0.6
  return (
    <div style={{ margin: '8px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
        <strong>{label}</strong>
        <span className="qty">{done ? 'This plate is filled' : `${Math.round(left)}g left on this plate`}</span>
      </div>
      <div style={{ height: 8, background: 'var(--line)', borderRadius: 99, overflow: 'hidden', margin: '4px 0' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: done ? 'var(--accent)' : '#c4a35a' }} />
      </div>
      <div className="qty">This plate wants {Math.round(need)}g · on it {Math.round(have)}g · still {Math.round(left)}g</div>
    </div>
  )
}
