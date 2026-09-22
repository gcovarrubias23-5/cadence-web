import { useMemo, useState } from 'react'
import { SLOTS } from './plan.js'
import { foodsOf } from './pantry.js'
import { addFood, bumpLine, fillRest, houseFor, leftoverOf, lineFrom, shareKind, targetFor } from './inventMath.js'

const SNACK_IDS = ['snack1', 'snack2', 'snack3']

const TYPES = [
  { id: 'protein', label: 'Protein', line: 'Chicken, eggs, yogurt, fish' },
  { id: 'carbs', label: 'Carbs', line: 'Rice, fruit, cooked veg, oats' },
  { id: 'fat', label: 'Fat', line: 'Oil, avocado, cheese, butter' },
  { id: 'free', label: 'Free', line: 'Raw veg. No tomato, carrot, or pepper.' },
]

function macrosBlock(food) {
  return (
    <div className="macro-gap">
      <div>{Math.round(food.protein || 0)}g protein</div>
      <div>{Math.round(food.carbs || 0)}g carbs</div>
      <div>{Math.round(food.fat || 0)}g fat</div>
    </div>
  )
}

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
  const picked = new Set(lines.map((l) => l.name))
  const kindCount = lines.filter((l) => l.kind === kind).length

  function save() {
    if (!lines.length) return
    const title = name.trim() || 'custom plate'
    onSave({
      id: `custom-${Date.now()}`,
      name: title,
      time: 'your plate',
      slot: SNACK_IDS.includes(slot) ? 'snack' : slot,
      custom: true,
      locked: true,
      steps: lines.map((f) => `${f.house} · ${Math.round(f.grams)} g`),
      foods: lines,
    }, slot)
  }

  return (
    <div className="sheet" onClick={onClose}>
      <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
        <div className="plate-dock">
          <Meter label="Protein" need={target.protein} have={filled.protein} left={left.protein} padTop />
          <Meter label="Carbs" need={target.carbs} have={filled.carbs} left={left.carbs} />
          <Meter label="Fat" need={target.fat} have={filled.fat} left={left.fat} />
        </div>

        <p className="plan-kicker">Invent a plate</p>
        <h2 style={{ marginBottom: 8 }}>{slotMeta.label} only</h2>
        <p className="note">First food is one serving. The next protein, carb, or fat takes what is left. Split even if you want them to share.</p>

        <label className="goal-field">
          <span>Plate name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="custom plate" />
        </label>
        <label className="goal-field" style={{ marginTop: 8 }}>
          <span>Which meal</span>
          <select value={slot} onChange={(e) => setSlot(e.target.value)} style={{ width: '100%', border: '1px solid var(--line)', borderRadius: 10, padding: 8, font: '600 16px var(--sans)', background: '#fff' }}>
            {SLOTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>

        {lines.length > 0 && (
          <div className="card" style={{ margin: '12px 0' }}>
            {kindCount > 1 && kind !== 'free' && (
              <button className="change" type="button" style={{ margin: '0 0 8px' }} onClick={() => setLines((prev) => shareKind(prev, kind, target))}>
                Split {kind} evenly
              </button>
            )}
            {lines.map((line, i) => (
              <div key={`${line.name}-${i}`} style={{ borderTop: i ? '1px solid var(--line)' : 0, padding: '8px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <strong>{line.name}</strong>
                    <div className="qty">{line.house}</div>
                    <div className="qty">{Math.round(line.grams)} g food</div>
                    {macrosBlock(line)}
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
        )}

        {TYPES.map((t) => (
          <button key={t.id} type="button" className={kind === t.id ? 'option on' : 'option'} onClick={() => setKind(t.id)}>
            <strong>{t.label}</strong>
            <span>{t.id !== 'free' && left[t.id] > 0.5 ? `${Math.round(left[t.id])}g left` : t.id !== 'free' ? 'filled' : t.line}</span>
          </button>
        ))}

        <p className="note">Grey foods are already on the plate.</p>
        {hits.map((item) => {
          const on = picked.has(item.name)
          const sample = lineFrom(item, item.base)
          return (
            <button
              key={item.name}
              type="button"
              className={on ? 'option picked' : 'option'}
              onClick={() => setLines((prev) => addFood(prev, item, target))}
            >
              <strong>{on ? `✓ ${item.name}` : item.name}</strong>
              <span style={{ display: 'block' }}>{houseFor(item, item.base)}</span>
              <span style={{ display: 'block' }}>{item.base} g food</span>
              {macrosBlock(sample)}
            </button>
          )
        })}

        <button className="btn" type="button" onClick={save} disabled={!lines.length}>Save this plate</button>
        <button className="btn btn-ghost" type="button" onClick={onClose}>Never mind</button>
      </div>
    </div>
  )
}

function Meter({ label, need, have, left, padTop }) {
  const pct = Math.min(100, Math.round((have / Math.max(need, 1)) * 100))
  const done = left < 0.6
  return (
    <div style={{ margin: padTop ? '28px 0 6px' : '6px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
        <strong>{label}</strong>
        <span className="qty">{Math.round(have)} / {Math.round(need)}g</span>
      </div>
      <div className="meter-track">
        <div style={{ width: `${pct}%`, height: '100%', background: done ? 'var(--accent)' : '#c4a35a' }} />
      </div>
    </div>
  )
}
