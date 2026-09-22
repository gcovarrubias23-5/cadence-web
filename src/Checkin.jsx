import { PULSE_COPY } from './checkin.js'
import { WATER_GOAL } from './track.js'
import { ProgressBars } from './bars.jsx'

export function Checkin({
  marks,
  goal,
  lastMove,
  onPulse,
  onPatch,
  platesAte,
  plateGoal,
  waterDrank,
  waterGoal,
  due,
  daysLeft,
}) {
  const platePct = Math.round((platesAte / Math.max(plateGoal, 1)) * 100)
  const waterPct = Math.round((waterDrank / Math.max(waterGoal, 1)) * 100)
  return (
    <>
      <section className="hero">
        <h1>Weekly check-in.</h1>
        <p>
          {due
            ? 'A week has passed. Say how the food sat and next week follows from that.'
            : `You already checked in. This comes back in ${daysLeft} day${daysLeft === 1 ? '' : 's'}.`}
        </p>
      </section>

      <section className="card">
        <div className="goal-title">How the week went</div>
        <p className="note" style={{ marginTop: 0 }}>
          {platesAte} of {plateGoal} plates · {waterDrank} of {waterGoal} glasses
        </p>
        <ProgressBars
          ate={Math.min(6, Math.round((platesAte / Math.max(plateGoal, 1)) * 6))}
          drinks={Math.min(WATER_GOAL, Math.round((waterDrank / Math.max(waterGoal, 1)) * WATER_GOAL))}
          plateLabel={`${platesAte}/${plateGoal} · ${platePct}%`}
          waterLabel={`${waterDrank}/${waterGoal} · ${waterPct}%`}
        />
      </section>

      {due ? (
        <section className="card goal">
          <div className="goal-title">{PULSE_COPY.prompt}</div>
          <p className="note" style={{ marginTop: 0 }}>{PULSE_COPY.hint}</p>
          <div className="checkin-row">
            <PulseBtn active={lastMove === 'hungry'} onClick={() => onPulse('hungry')} {...PULSE_COPY.hungry} />
            <PulseBtn active={lastMove === 'right'} onClick={() => onPulse('right')} {...PULSE_COPY.right} />
            <PulseBtn active={lastMove === 'heavy'} onClick={() => onPulse('heavy')} {...PULSE_COPY.heavy} />
          </div>
          {lastMove ? (
            <p className="note">
              {lastMove === 'hungry' && 'Next week the plates get a little bigger.'}
              {lastMove === 'right' && 'Next week stays where it is.'}
              {lastMove === 'heavy' && 'Next week the plates get a little smaller.'}
            </p>
          ) : null}
        </section>
      ) : (
        <section className="card">
          <div className="goal-title">You’re set for now</div>
          <p className="note" style={{ marginTop: 0 }}>
            The feeling question comes back when seven days have passed.
          </p>
        </section>
      )}

      <section className="card">
        <div className="goal-title">Next week’s numbers</div>
        <p className="note" style={{ marginTop: 0 }}>These follow the check-in.</p>
        <div className="goal-grid" style={{ marginTop: 14 }}>
          <MarkInput label="protein" value={marks.protein} onChange={(v) => onPatch('protein', Number(v) || 0)} />
          <MarkInput label="carbs" value={marks.carbs} onChange={(v) => onPatch('carbs', Number(v) || 0)} />
          <MarkInput label="fat" value={marks.fat} onChange={(v) => onPatch('fat', Number(v) || 0)} />
          <div className="goal-field">
            <span>calories</span>
            <div className="kcal-readout">{Math.round(goal.kcal)}</div>
          </div>
        </div>
      </section>
    </>
  )
}

function PulseBtn({ title, line, onClick, active }) {
  return (
    <button type="button" className={active ? 'checkin on' : 'checkin'} onClick={onClick}>
      <strong>{title}</strong>
      <span>{line}</span>
    </button>
  )
}

function MarkInput({ label, value, onChange }) {
  return (
    <label className="goal-field">
      <span>{label}</span>
      <input type="number" min="0" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}
