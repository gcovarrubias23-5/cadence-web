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
  const lines = DAYS.map((d) => ({
    ...d,
    plates: dayEatenCount(eaten, d.id, SLOTS),
    drinks: glassesFor(water, d.id),
  }))
  const line = platePct >= 80
    ? 'Strong week. Keep the same rhythm.'
    : platePct >= 50
      ? 'Halfway is still a week you showed up. Finish the plates you can.'
      : 'The graph only moves when you tick a plate in Kitchen. No shame. Start with one meal.'

  return (
    <section className="card">
      <div className="goal-title">This week</div>
      <p className="note" style={{ marginTop: 0 }}>
        {plates} of {plateGoal} plates · {platePct}% · {drinks} of {waterGoal} glasses · {waterPct}%
      </p>
      <p className="note">{line}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120, marginTop: 12 }}>
        {lines.map((d) => {
          const h = Math.max(4, Math.round((d.plates / SLOTS.length) * 100))
          return (
            <div key={d.id} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ width: '70%', height: `${h}%`, background: 'var(--accent)', borderRadius: 6 }} title={`${d.plates} plates`} />
              </div>
              <div className="qty" style={{ marginTop: 6 }}>{d.label}</div>
            </div>
          )
        })}
      </div>
      <p className="note" style={{ marginTop: 10 }}>Each bar is plates ticked that day. Six is a full day.</p>
    </section>
  )
}
