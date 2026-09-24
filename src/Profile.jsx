import { useEffect, useMemo, useState } from 'react'
import { ACTIVITY, GOALS, buildTargets } from './profile.js'
import { AVOIDS } from './avoid.js'
import { SeasonAsk } from './SeasonAsk.jsx'
import { Adherence } from './Adherence.jsx'
import { WeightLog } from './WeightLog.jsx'
import { About } from './About.jsx'
import { daysSinceReview, pretendSeasonDue, writeReview } from './seasonGate.js'
import { isCheckinDue } from './weekGate.js'
import { archiveWeek } from './weekHistory.js'
import { SLOTS } from './plan.js'
import { WATER_GOAL, dayEatenCount, glassesFor } from './track.js'
import { formatKcalRange } from './kcalRange.js'

function readLastCheckin() {
  try {
    return JSON.parse(localStorage.getItem('cadence.lastCheckin') || 'null')
  } catch {
    return null
  }
}

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}

export function Profile({ profile, onSave, onCheckin, onSpinWeek }) {
  const [form, setForm] = useState(() => ({
    units: profile.units || 'us',
    age: profile.age || '',
    sex: profile.sex || '',
    heightFt: profile.heightFt || '5',
    heightIn: profile.heightIn || '10',
    heightCm: profile.heightCm || '178',
    weight: profile.weight || '',
    activity: profile.activity || 'steady',
    goal: profile.goal || 'hold',
    avoid: profile.avoid || [],
  }))
  const [tick, setTick] = useState(0)
  const [lastCheckin, setLastCheckin] = useState(() => readLastCheckin())
  const math = useMemo(() => {
    try { return buildTargets(form) } catch { return null }
  }, [form])
  const skips = form.avoid || []
  const waited = daysSinceReview()
  const weekReady = !!lastCheckin && isCheckinDue(lastCheckin)

  useEffect(() => {
    if (lastCheckin) return
    const stamp = new Date().toISOString()
    try { localStorage.setItem('cadence.lastCheckin', JSON.stringify(stamp)) } catch {}
    setLastCheckin(stamp)
  }, [lastCheckin])

  function patch(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }
  function toggleAvoid(id) {
    setForm((prev) => {
      const on = (prev.avoid || []).includes(id)
      return { ...prev, avoid: on ? prev.avoid.filter((x) => x !== id) : [...(prev.avoid || []), id] }
    })
  }
  function save() {
    writeReview()
    onSave({ ...form, avoid: form.avoid || [], goalReview: new Date().toISOString() }, math)
  }
  function saveWeekToHistory() {
    const eaten = load('cadence.eaten', {})
    const water = load('cadence.water', {})
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    const plates = days.reduce((n, id) => n + dayEatenCount(eaten, id, SLOTS), 0)
    const drinks = days.reduce((n, id) => n + glassesFor(water, id), 0)
    archiveWeek({ plates, plateGoal: 42, drinks, waterGoal: days.length * WATER_GOAL })
    setTick((n) => n + 1)
  }

  return (
    <>
      <section className="hero">
        <h1>Your profile.</h1>
        <p>Weight and this week’s plates sit at the top. Skips and math are lower.</p>
        <button className="btn btn-ghost" type="button" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About Cadence</button>
      </section>

      <WeightLog units={form.units} />
      <Adherence key={tick} />

      <SeasonAsk onYou={() => document.getElementById('move-goal')?.scrollIntoView({ behavior: 'smooth' })} onStay={() => setTick((n) => n + 1)} />

      {onCheckin && weekReady && (
        <button className="btn btn-ghost" type="button" onClick={onCheckin}>How did this week feel?</button>
      )}

      <section className="card">
        <div className="goal-title">Season check</div>
        <p className="note" style={{ marginTop: 0 }}>
          We ask about move and goal every 90 days, not every week. {waited ? `${waited} days since the last look.` : 'No season stamp yet. Save profile to start the clock.'}
        </p>
      </section>

      <section className="card">
        <div className="goal-title">You</div>
        <label className="goal-field"><span>Age</span><input type="number" min="18" max="90" value={form.age} onChange={(e) => patch('age', e.target.value)} /></label>
        <div className="checkin-row" style={{ margin: '10px 0' }}>
          <button type="button" className={form.sex === 'woman' ? 'checkin on' : 'checkin'} onClick={() => patch('sex', 'woman')}><strong>Woman</strong></button>
          <button type="button" className={form.sex === 'man' ? 'checkin on' : 'checkin'} onClick={() => patch('sex', 'man')}><strong>Man</strong></button>
        </div>
        <div className="checkin-row" style={{ marginBottom: 10 }}>
          <button type="button" className={form.units === 'us' ? 'checkin on' : 'checkin'} onClick={() => patch('units', 'us')}><strong>lb / ft</strong></button>
          <button type="button" className={form.units === 'metric' ? 'checkin on' : 'checkin'} onClick={() => patch('units', 'metric')}><strong>kg / cm</strong></button>
        </div>
        {form.units === 'us' ? (
          <div className="goal-grid">
            <label className="goal-field"><span>feet</span><input type="number" value={form.heightFt} onChange={(e) => patch('heightFt', e.target.value)} /></label>
            <label className="goal-field"><span>inches</span><input type="number" value={form.heightIn} onChange={(e) => patch('heightIn', e.target.value)} /></label>
            <label className="goal-field" style={{ gridColumn: '1 / -1' }}><span>pounds</span><input type="number" value={form.weight} onChange={(e) => patch('weight', e.target.value)} /></label>
          </div>
        ) : (
          <div className="goal-grid">
            <label className="goal-field"><span>cm</span><input type="number" value={form.heightCm} onChange={(e) => patch('heightCm', e.target.value)} /></label>
            <label className="goal-field"><span>kg</span><input type="number" value={form.weight} onChange={(e) => patch('weight', e.target.value)} /></label>
          </div>
        )}
      </section>

      <section className="card" id="move-goal">
        <div className="goal-title">Move and goal</div>
        {ACTIVITY.map((a) => (
          <button key={a.id} type="button" className={form.activity === a.id ? 'option on' : 'option'} onClick={() => patch('activity', a.id)}>
            <strong>{a.label}</strong><span>{a.line}</span>
          </button>
        ))}
        {GOALS.map((g) => (
          <button key={g.id} type="button" className={form.goal === g.id ? 'option on' : 'option'} onClick={() => patch('goal', g.id)}>
            <strong>{g.label}</strong><span>{g.line}</span>
          </button>
        ))}
      </section>

      <section className="card">
        <div className="goal-title">Skip these plates</div>
        <p className="note" style={{ marginTop: 0 }}>Green means we hide it. Tap it again to allow it. Then save.</p>
        {skips.length > 0 && (
          <button className="change" type="button" onClick={() => patch('avoid', [])}>Clear all skips</button>
        )}
        {AVOIDS.map((a) => {
          const on = skips.includes(a.id)
          return (
            <button key={a.id} type="button" className={on ? 'option on' : 'option'} onClick={() => toggleAvoid(a.id)}>
              <strong>{a.label}{on ? ' · on' : ''}</strong>
              <span>{on ? 'Tap to allow this food again' : a.line}</span>
            </button>
          )
        })}
      </section>

      {math && (
        <section className="card">
          <div className="goal-title">New targets</div>
          <p className="note">{formatKcalRange(math.kcal)} cal · {math.protein}g protein · {math.carbs}g carbs · {math.fat}g fat</p>
        </section>
      )}

      <button className="btn" type="button" disabled={!math} onClick={save}>Save profile</button>
      <About />
      <details className="card">
        <summary className="qty">Preview tools</summary>
        <p className="note">Only for trying cards before launch.</p>
        <button className="change" type="button" onClick={() => { pretendSeasonDue(); setTick((n) => n + 1) }}>
          Pretend 3 months passed
        </button>
        <button className="change" type="button" onClick={saveWeekToHistory}>
          Save this week to history
        </button>
        {onSpinWeek && (
          <button className="change" type="button" onClick={onSpinWeek}>
            Spin a new week of plates
          </button>
        )}
      </details>
    </>
  )
}
