import { useMemo, useState } from 'react'
import { ACTIVITY, GOALS, buildTargets } from './profile.js'
import { AVOIDS } from './avoid.js'

export function Profile({ profile, onSave, onCheckin }) {
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
  const math = useMemo(() => {
    try { return buildTargets(form) } catch { return null }
  }, [form])
  const skips = form.avoid || []

  function patch(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }
  function toggleAvoid(id) {
    setForm((prev) => {
      const on = (prev.avoid || []).includes(id)
      return { ...prev, avoid: on ? prev.avoid.filter((x) => x !== id) : [...(prev.avoid || []), id] }
    })
  }

  return (
    <>
      <section className="hero">
        <h1>Your profile.</h1>
        <p>Change the math or what you do not want on a plate. Cadence hides the obvious mismatches. It does not certify a kitchen or treat an allergy.</p>
      </section>

      {onCheckin && (
        <button className="btn btn-ghost" type="button" onClick={onCheckin}>How did this week feel?</button>
      )}

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

      <section className="card">
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
          <p className="note">{math.kcal} cal · {math.protein}g protein · {math.carbs}g carbs · {math.fat}g fat</p>
        </section>
      )}

      <button className="btn" type="button" disabled={!math} onClick={() => onSave({ ...form, avoid: form.avoid || [] }, math)}>Save profile</button>
    </>
  )
}
