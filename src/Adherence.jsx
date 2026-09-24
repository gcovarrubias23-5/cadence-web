import { useEffect, useState } from 'react'
import { SLOTS } from './plan.js'
import { WATER_GOAL, dayEatenCount, glassesFor } from './track.js'
import { GREEN, WATER } from './theme.js'
import { closedWeeks, weekRange, writeCurrentWeek } from './weekHistory.js'

const DAYS = [
  { id: 'mon', label: 'M' },
  { id: 'tue', label: 'T' },
  { id: 'wed', label: 'W' },
  { id: 'thu', label: 'T' },
  { id: 'fri', label: 'F' },
  { id: 'sat', label: 'S' },
  { id: 'sun', label: 'S' },
]

const MOVE_LINE = {
  hungry: 'Wanted more',
  right: 'Felt right',
  heavy: 'A bit much',
}

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
  const [past, setPast] = useState(closedWeeks)

  useEffect(() => {
    writeCurrentWeek({ plates, plateGoal, drinks, waterGoal })
    setPast(closedWeeks())
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
  const last = past[0]
  const trend = last && last.platePct !== platePct
    ? platePct > last.platePct
      ? `Plates are up from ${last.platePct}% last closed week.`
      : `Plates are down from ${last.platePct}% last closed week.`
    : ''

  return (
    <section className="card">
      <div className="goal-title">This week</div>
      <p className="note" style={{ marginTop: 0 }}>
        <span style={{ color: GREEN, fontWeight: 700 }}>Plates {plates}/{plateGoal} · {platePct}%</span>
        {' · '}
        <span style={{ color: WATER, fontWeight: 700 }}>Water {drinks}/{waterGoal} · {waterPct}%</span>
      </p>
      <p className="note">{line}</p>
      {trend ? <p className="note">{trend}</p> : null}
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
      <div className="goal-title" style={{ marginTop: 18 }}>Earlier weeks</div>
      {past.length === 0 && (
        <p className="note" style={{ marginTop: 0 }}>
          Closed weeks show up after you check in. This week stays live until then.
        </p>
      )}
      {past.slice(0, 8).map((h) => (
        <div key={h.id} style={{ padding: '10px 0', borderTop: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <strong>{weekRange(h.monday || h.id)}</strong>
            <span className="qty">{MOVE_LINE[h.move] || 'Closed'}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' }}>
            <Mini pct={h.platePct} color={GREEN} />
            <span className="qty" style={{ color: GREEN, fontWeight: 700 }}>{h.platePct}%</span>
            <Mini pct={h.waterPct} color={WATER} />
            <span className="qty" style={{ color: WATER, fontWeight: 700 }}>{h.waterPct}%</span>
          </div>
        </div>
      ))}
    </section>
  )
}

function Mini({ pct, color }) {
  return (
    <div style={{ flex: 1, height: 8, background: '#e8e2d8', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ width: `${Math.max(2, Math.min(100, pct || 0))}%`, height: '100%', background: color }} />
    </div>
  )
}
