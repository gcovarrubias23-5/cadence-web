import { isSeasonDue, writeReview } from './seasonGate.js'

export function SeasonAsk({ onYou, onStay }) {
  if (!isSeasonDue()) return null
  return (
    <section className="card" style={{ borderColor: 'var(--accent)' }}>
      <div className="goal-title">About three months in</div>
      <p className="note" style={{ marginTop: 0 }}>
        Has how you move or what you want this season changed? Weekly plates already follow how the food sat. This is only the bigger picture.
      </p>
      <button className="btn" type="button" onClick={onYou}>Update move or goal</button>
      <button className="btn btn-ghost" type="button" onClick={() => { writeReview(); onStay?.() }}>Still the same</button>
    </section>
  )
}
