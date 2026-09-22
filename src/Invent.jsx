import { useMemo, useState } from 'react'
import { SLOTS } from './plan.js'
import { PANTRY, foodsOf } from './pantry.js'
import { formatMacro, kcalOf } from './macros.js'
import { addFitted, fitLinesToSlot, targetFor } from './inventMath.js'

const SNACK_IDS = ['snack1', 'snack2', 'snack3']

const TYPES = [
  { id: 'protein', label: 'Protein', line: 'Chicken, eggs, yogurt, fish' },
  { id: 'carbs', label: 'Carbs', line: 'Rice, fruit, bread, oats' },
  { id: 'fat', label: 'Fat', line: 'Oil, avocado, cheese, butter' },
  { id: 'free', label: 'Free', line: 'Raw veg. No tomato, carrot, or pepper.' },
]

export function Invent({ goal, defaultSlot = 'lunch', onSave, onClose }) {
  const [name, setName] = useState('')
  const [slot, setSlot] = useState(defaultSlot)
  const [kind, setKind] = useState('protein')
  const [lines, setLines] = useState([])
  const hits = foodsOf(kind)
  const target = useMemo(() => targetFor(goal, slot), [goal, slot])

  const totals = lines.reduce(
    (acc, f) => ({
      protein: acc.protein + f.protein,
      carbs: acc.carbs + f.carbs,
      fat: acc.fat + f.fat,
    }),
    { protein: 0, carbs: 0, fat: 0 },
  )

  function addItem(item) {
    setLines((prev) => addFitted(prev, item, target))
  }

  function changeSlot(next) {
    setSlot(next)
    setLines((prev) => fitLinesToSlot(prev, targetFor(goal, next)))
  }

  function remove(i) {
    setLines((prev) => fitLinesToSlot(prev.filter((_, idx) => idx !== i), target))
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
      steps: lines.map((f) => `${f.house || f.name} · ${Math.round(f.grams)} g`),
      foods: lines,
    }, slot)
  }

  const missing = []
  if (!lines.some((l) => l.kind === 'protein')) missing.push('protein')
  if (!lines.some((l) => l.kind === 'carbs')) missing.push('carbs')
  if (!lines.some((l) => l.kind === 'fat')) missing.push('fat')

  return (
    <div className="sheet" onClick={onClose}>
      <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
        <p className="plan-kicker">Invent a plate</p>
        <h2 style={{ marginBottom: 8 }}>Add a food</h2>
        <p className="note" style={{ marginTop: 0 }}>
          This slot wants {Math.round(target.protein)}g protein, {Math.round(target.carbs)}g carbs, {Math.round(target.fat)}g fat. We size what you add to that. Free veg stays extra.
        </p>

        <label className="goal-field">
          <span>Plate name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tuesday chicken bowl" />
        </label>
        <label className="goal-field" style={{ marginTop: 8 }}>
          <span>Slot</span>
          <select value={slot} onChange={(e) => changeSlot(e.target.value)} style={{ width: '100%', border: '1px solid var(--line)', borderRadius: 10, padding: 8, font: '600 16px var(--sans)', background: '#fff' }}>
            {SLOTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>

        <p className="note" style={{ marginBottom: 6 }}>Choose a food type</p>
        {TYPES.map((t) => (
          <button key={t.id} type="button" className={kind === t.id ? 'option on' : 'option'} onClick={() => setKind(t.id)}>
            <strong>{t.label}</strong>
            <span>{t.line}</span>
          </button>
        ))}

        <div className="card" style={{ margin: '12px 0' }}>
          <div className="goal-title">On this plate</div>
          <p className="note" style={{ marginTop: 0 }}>
            Target {Math.round(target.protein)}P {Math.round(target.carbs)}C {Math.round(target.fat)}F · now {formatMacro(totals.protein)} P · {formatMacro(totals.carbs)} C · {formatMacro(totals.fat)} F · {Math.round(kcalOf(totals))} cal
          </p>
          {missing.length > 0 && <p className="note">Still need a {missing.join(', ')} food to fill the slot.</p>}
          {lines.length === 0 && <p className="note">Pick Protein, Carbs, Fat, or Free, then tap a food.</p>}
          {lines.map((line, i) => (
            <div key={`${line.name}-${i}`} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center', borderTop: '1px solid var(--line)', padding: '8px 0' }}>
              <div>
                <strong>{line.name}</strong>
                <div className="qty">{Math.round(line.grams)} g · {line.kind === 'free' ? 'free' : line.kind}</div>
              </div>
              <button className="change" type="button" style={{ margin: 0 }} onClick={() => remove(i)}>Remove</button>
            </div>
          ))}
        </div>

        <p className="note" style={{ marginBottom: 4 }}>{TYPES.find((t) => t.id === kind).label} foods</p>
        {hits.map((item) => (
          <button key={item.name} type="button" className="option" onClick={() => addItem(item)}>
            <strong>{item.name}</strong>
            <span>{item.house}</span>
          </button>
        ))}

        <button className="btn" type="button" onClick={save} disabled={!name.trim() || !lines.length}>Save this plate</button>
        <button className="btn btn-ghost" type="button" onClick={onClose}>Never mind</button>
      </div>
    </div>
  )
}
