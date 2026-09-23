import { useMemo, useState } from 'react'

const KEY = 'cadence.weightLog'

function load() {
  try {
    const rows = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

function save(rows) {
  localStorage.setItem(KEY, JSON.stringify(rows))
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function weekKey(iso) {
  const d = new Date(`${iso}T12:00:00`)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d.toISOString().slice(0, 10)
}

export function WeightLog({ units = 'us' }) {
  const label = units === 'metric' ? 'kg' : 'lb'
  const [mode, setMode] = useState(() => localStorage.getItem('cadence.weightMode') || 'weekly')
  const [rows, setRows] = useState(load)
  const [value, setValue] = useState('')
  const sorted = useMemo(() => [...rows].sort((a, b) => a.date.localeCompare(b.date)), [rows])

  function setModeOn(next) {
    setMode(next)
    localStorage.setItem('cadence.weightMode', next)
  }

  function add() {
    const n = Number(value)
    if (!n || n < 50 || n > 450) return
    const date = mode === 'weekly' ? weekKey(today()) : today()
    const next = [...rows.filter((r) => r.date !== date), { date, kg: units === 'metric', value: n, mode }]
    setRows(next)
    save(next)
    setValue('')
  }

  function remove(date) {
    const next = rows.filter((r) => r.date !== date)
    setRows(next)
    save(next)
  }

  const last = sorted[sorted.length - 1]
  const first = sorted[0]
  const delta = last && first ? Math.round((last.value - first.value) * 10) / 10 : 0

  return (
    <section className="card">
      <div className="goal-title">Weight</div>
      <p className="note" style={{ marginTop: 0 }}>
        Daily or once a week. Same time of day is enough. The line is for you, not a verdict.
      </p>
      <div className="checkin-row" style={{ marginBottom: 10 }}>
        <button type="button" className={mode === 'daily' ? 'checkin on' : 'checkin'} onClick={() => setModeOn('daily')}><strong>Daily</strong></button>
        <button type="button" className={mode === 'weekly' ? 'checkin on' : 'checkin'} onClick={() => setModeOn('weekly')}><strong>Weekly</strong></button>
      </div>
      <div className="goal-grid">
        <label className="goal-field">
          <span>{mode === 'weekly' ? `This week (${label})` : `Today (${label})`}</span>
          <input type="number" min="50" max="450" step="0.1" value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
      </div>
      <button className="btn" type="button" style={{ marginTop: 10 }} onClick={add}>Add weight</button>
      {sorted.length > 1 && (
        <p className="note">{delta > 0 ? `Up ${delta} ${label} since the first log.` : delta < 0 ? `Down ${Math.abs(delta)} ${label} since the first log.` : `Same as the first log.`}</p>
      )}
      <Line rows={sorted} />
      {sorted.slice(-8).reverse().map((r) => (
        <div key={r.date} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid var(--line)' }}>
          <span className="qty">{r.date} · {r.mode || 'log'}</span>
          <span>
            {r.value} {r.kg ? 'kg' : 'lb'}
            <button className="change" type="button" style={{ marginLeft: 8 }} onClick={() => remove(r.date)}>Remove</button>
          </span>
        </div>
      ))}
    </section>
  )
}

function Line({ rows }) {
  if (rows.length < 2) {
    return <p className="note">Add two logs to see the line.</p>
  }
  const vals = rows.map((r) => r.value)
  const min = Math.min(...vals) - 1
  const max = Math.max(...vals) + 1
  const w = 280
  const h = 90
  const pts = rows.map((r, i) => {
    const x = rows.length === 1 ? w / 2 : (i / (rows.length - 1)) * w
    const y = h - ((r.value - min) / (max - min || 1)) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="90" style={{ margin: '12px 0' }}>
      <polyline fill="none" stroke="var(--accent)" strokeWidth="3" points={pts} />
      {rows.map((r, i) => {
        const x = rows.length === 1 ? w / 2 : (i / (rows.length - 1)) * w
        const y = h - ((r.value - min) / (max - min || 1)) * h
        return <circle key={r.date} cx={x} cy={y} r="4" fill="var(--accent)" />
      })}
    </svg>
  )
}
