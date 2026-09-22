import { useMemo, useState } from 'react'
import { ACTIVITY, GOALS, buildTargets } from './profile.js'

const STEPS = ['welcome', 'age', 'sex', 'size', 'move', 'goal', 'result']

const EMPTY = {
  units: 'us',
  age: '',
  sex: '',
  heightFt: '5',
  heightIn: '10',
  heightCm: '178',
  weight: '',
  activity: '',
  goal: '',
}

export function Start({ onDone }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(EMPTY)
  const id = STEPS[step]
  const ready = canAdvance(id, form)
  const math = useMemo(() => {
    if (id !== 'result') return null
    try { return buildTargets(form) } catch { return null }
  }, [id, form])

  function patch(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function next() {
    if (id === 'result') {
      onDone(form, math)
      return
    }
    if (!ready) return
    setStep((n) => Math.min(STEPS.length - 1, n + 1))
  }

  return (
    <div className="app">
      <header>
        <div>
          <div className="brand">Cadence</div>
          <div className="eyebrow">Start here</div>
        </div>
      </header>

      {id === 'welcome' && (
        <section className="hero">
          <h1>You do not need a perfect week.</h1>
          <p>You need a rhythm. Same six plates. Same water. One honest check-in. Tell us a few facts. We size the plates from a standard calorie equation. You live the week.</p>
        </section>
      )}

      {id === 'age' && (
        <Question title="How old are you?">
          <label className="goal-field">
            <span>years</span>
            <input type="number" min="18" max="90" value={form.age} onChange={(e) => patch('age', e.target.value)} />
          </label>
        </Question>
      )}

      {id === 'sex' && (
        <Question title="Which estimate should we use?" note="The calorie equation is built on two adult data sets. This is only for that math.">
          <Choice active={form.sex === 'woman'} onClick={() => patch('sex', 'woman')} title="Woman" line="Uses the female Mifflin–St Jeor constants." />
          <Choice active={form.sex === 'man'} onClick={() => patch('sex', 'man')} title="Man" line="Uses the male Mifflin–St Jeor constants." />
        </Question>
      )}

      {id === 'size' && (
        <Question title="Height and weight">
          <div className="checkin-row" style={{ marginBottom: 12 }}>
            <button type="button" className={form.units === 'us' ? 'checkin on' : 'checkin'} onClick={() => patch('units', 'us')}><strong>lb / ft</strong></button>
            <button type="button" className={form.units === 'metric' ? 'checkin on' : 'checkin'} onClick={() => patch('units', 'metric')}><strong>kg / cm</strong></button>
          </div>
          {form.units === 'us' ? (
            <div className="goal-grid">
              <label className="goal-field"><span>feet</span><input type="number" min="4" max="7" value={form.heightFt} onChange={(e) => patch('heightFt', e.target.value)} /></label>
              <label className="goal-field"><span>inches</span><input type="number" min="0" max="11" value={form.heightIn} onChange={(e) => patch('heightIn', e.target.value)} /></label>
              <label className="goal-field" style={{ gridColumn: '1 / -1' }}><span>pounds</span><input type="number" min="80" max="450" value={form.weight} onChange={(e) => patch('weight', e.target.value)} /></label>
            </div>
          ) : (
            <div className="goal-grid">
              <label className="goal-field"><span>cm</span><input type="number" min="120" max="220" value={form.heightCm} onChange={(e) => patch('heightCm', e.target.value)} /></label>
              <label className="goal-field"><span>kg</span><input type="number" min="35" max="200" value={form.weight} onChange={(e) => patch('weight', e.target.value)} /></label>
            </div>
          )}
        </Question>
      )}

      {id === 'move' && (
        <Question title="How do you usually move?">
          {ACTIVITY.map((a) => (
            <Choice key={a.id} active={form.activity === a.id} onClick={() => patch('activity', a.id)} title={a.label} line={a.line} />
          ))}
        </Question>
      )}

      {id === 'goal' && (
        <Question title="What do you want this season?">
          {GOALS.map((g) => (
            <Choice key={g.id} active={form.goal === g.id} onClick={() => patch('goal', g.id)} title={g.label} line={g.line} />
          ))}
        </Question>
      )}

      {id === 'result' && math && (
        <>
          <section className="hero">
            <h1>Here is your first week.</h1>
            <p>Resting burn and daily burn come from Mifflin–St Jeor times how you move. The goal only nudges that number. The weekly check-in will tune it from how the food sat.</p>
          </section>
          <section className="card">
            <div className="goal-title">The math</div>
            <p className="note" style={{ marginTop: 0 }}>BMI {math.bmi} · {math.bmiText}. BMI is a screen, not a verdict.</p>
            <p className="note">At rest about {math.bmr} calories. With your movement about {math.tdee}. First target {math.kcal}.</p>
            <div className="goal-grid" style={{ marginTop: 12 }}>
              <Readout label="protein" value={`${math.protein} g`} />
              <Readout label="carbs" value={`${math.carbs} g`} />
              <Readout label="fat" value={`${math.fat} g`} />
              <Readout label="calories" value={math.kcal} />
            </div>
          </section>
        </>
      )}

      <button className="btn" type="button" disabled={!ready && id !== 'welcome' && id !== 'result'} onClick={next}>
        {id === 'welcome' ? 'Begin' : id === 'result' ? 'Take me to the kitchen' : 'Continue'}
      </button>
      {step > 0 && id !== 'result' && (
        <button className="btn btn-ghost" type="button" onClick={() => setStep((n) => n - 1)}>Back</button>
      )}
    </div>
  )
}

function Question({ title, note, children }) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      {note ? <p>{note}</p> : null}
      <div style={{ marginTop: 16 }}>{children}</div>
    </section>
  )
}

function Choice({ title, line, onClick, active }) {
  return (
    <button type="button" className={active ? 'option on' : 'option'} onClick={onClick} style={{ width: '100%' }}>
      <strong>{title}</strong>
      <span>{line}</span>
    </button>
  )
}

function Readout({ label, value }) {
  return (
    <div className="goal-field">
      <span>{label}</span>
      <div className="kcal-readout">{value}</div>
    </div>
  )
}

function canAdvance(id, form) {
  if (id === 'welcome' || id === 'result') return true
  if (id === 'age') return Number(form.age) >= 18
  if (id === 'sex') return !!form.sex
  if (id === 'size') return Number(form.weight) > 0
  if (id === 'move') return !!form.activity
  if (id === 'goal') return !!form.goal
  return false
}
