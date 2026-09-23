import { SLOTS } from './plan.js'
import { WATER_GOAL, dayEatenCount, glassesFor } from './track.js'

const DAYS = [
  { id: 'mon', label: 'M' },
  { id: 'tue', label: 'T' },
  { id: 'wed', label: 'W' },
  { id: 'thu', label: 'T' },
  { id: 'fri', label: 'F' },
  { id: 'sat', label: 'S' },
  { id: 'sun', label: 'S' },
]

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}') || {}
  } catch {
    return {}
  }
}

export function Adherence() {
  const eaten = load('cadence.eaten')
  const water = load('cadence.water')
  const plateGoal = DAYS.length * SLOTS.length
  const plates = DAYS.reduce((n, d) => n + dayEatenCount(eaten, d.id, SLOTS), 0)
  const drinks = DAYS.reduce((n, d) => n + glassesFor(water, d.id), 0)
  const waterGoal = DAYS.length * WATER_GOAL
  const platePct = Math.round((plates / plateGoal) * 100)
  const waterPct = Math.round((drinks / waterGoal) * 100)
  const lines = DAYS.map((d) => {
    const p = dayEatenCount(eaten, d.id, SLOTS)
    const w = glassesFor(water, d.id)
    return {
      ...d,
      plates: p,
      drinks: w,
      platePct: Math.round((p / SLOTS.length) * 100),
      waterPct: Math.round((w / WATER_GOAL) * 100),
    }
  })
  const line = platePct >= 80
    ? 'Strong week. Keep the same rhythm.'
    : platePct >= 50
      ? 'Halfway is still a week you showed up. Finish the plates you can.'
      : 'The graph only moves when you tick a plate in Kitchen. No shame. Start with one meal.'

  return (
    <section className="card">
      <div className="goal-title">This week</div>
      <p className="note" style={{ marginTop: 0 }}>
        Plates {plates}/{plateGoal} · {platePct}% · Water {drinks}/{waterGoal} · {waterPct}%
      </p>
      <p className="note">{line}</p>
      <p className="note" style={{ marginTop: 8 }}>Green = plates. Blue = water.</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginTop: 12 }}>
        {lines.map((d) => (
          <div key={d.id} style={{ flex: 1, textAlign: 'center' }}>
            <div className="qty">{d.platePct}%</div>
            <div style={{ height: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3 }}>
              <div style={{ width: 8, height: `${Math.max(4, d.platePct)}%`, background: 'var(--accent)', borderRadius: 4 }} />
              <div style={{ width: 8, height: `${Math.max(4, d.waterPct)}%`, background: '#3b82f6', borderRadius: 4 }} />
            </div>
            <div className="qty" style={{ marginTop: 4 }}>{d.waterPct}%</div>
            <div className="qty">{d.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
