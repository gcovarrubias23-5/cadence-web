import { useEffect, useState } from 'react'
import { SLOTS } from './plan.js'
import { WATER_GOAL, dayEatenCount, glassesFor } from './track.js'
import { GREEN, WATER } from './theme.js'
import { loadHistory, writeCurrentWeek } from './weekHistory.js'

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

function when(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  } catch {
    return ''
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
  const [past, setPast] = useState(() => loadHistory().filter((h) => !h.open))

  useEffect(() => {
    writeCurrentWeek({ plates, plateGoal, drinks, waterGoal })
    setPast(loadHistory().filter((h) => !h.open))
  }, [plates, drinks, plateGoal, waterGoal])

  const lines = DAYS.map((d) => {
    const p = dayEatenCount(eaten, d.id, SLOTS)
    const w = glassesFor(water, d.id)
    return {
      ...d,
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
        <span style={{ color: GREEN, fontWeight: 700 }}>Plates {plates}/{plateGoal} · {platePct}%</span>
        {' · '}
        <span style={{ color: WATER, fontWeight: 700 }}>Water {drinks}/{waterGoal} · {waterPct}%</span>
      </p>
      <p className="note">{line}</p>
      <p className="note" style={{ marginTop: 8 }}>
        <span style={{ color: GREEN, fontWeight: 700 }}>Green = plates.</span>{' '}
        <span style={{ color: WATER, fontWeight: 700 }}>Blue = water.</span>
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginTop: 12 }}>
        {lines.map((d) => (
          <div key={d.id} style={{ flex: 1, textAlign: 'center' }}>
            <div className="qty" style={{ color: GREEN, fontWeight: 700 }}>{d.platePct}%</div>
            <div style={{ height: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3 }}>
              <div style={{ width: 8, height: `${Math.max(4, d.platePct)}%`, background: GREEN, borderRadius: 4 }} />
              <div style={{ width: 8, height: `${Math.max(4, d.waterPct)}%`, background: WATER, borderRadius: 4 }} />
            </div>
            <div className="qty" style={{ marginTop: 4, color: WATER, fontWeight: 700 }}>{d.waterPct}%</div>
            <div className="qty">{d.label}</div>
          </div>
        ))}
      </div>
      {past.length > 0 && (
        <>
          <div className="goal-title" style={{ marginTop: 18 }}>Earlier weeks</div>
          {past.slice(0, 8).map((h) => (
            <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '8px 0', borderTop: '1px solid var(--line)' }}>
              <span className="qty">Week of {when(h.at)}</span>
              <span className="qty">
                <span style={{ color: GREEN, fontWeight: 700 }}>{h.platePct}% plates</span>
                {' · '}
                <span style={{ color: WATER, fontWeight: 700 }}>{h.waterPct}% water</span>
              </span>
            </div>
          ))}
        </>
      )}
    </section>
  )
}
