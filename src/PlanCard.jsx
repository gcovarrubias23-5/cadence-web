import { useState } from 'react'
import { isNative } from './platform.js'
import { purchases } from './purchases.js'

// Plan status on the You tab. Restore and Manage only in the iOS app.
export function PlanCard({ access, onShowPlans, onEntitled }) {
  const [note, setNote] = useState('')
  const native = isNative()
  const line = access.status === 'subscribed'
    ? 'Subscribed through the App Store.'
    : access.status === 'trial'
      ? `Free trial: ${access.daysLeft} ${access.daysLeft === 1 ? 'day' : 'days'} left.`
      : native ? 'Your free trial has ended.' : 'Your free trial has ended. Subscriptions open in the iOS app.'

  async function restore() {
    setNote('')
    try {
      const ent = await (await purchases()).restorePurchases()
      if (ent.active) onEntitled(ent)
      else setNote('No active Cadence subscription found for this Apple ID.')
    } catch (err) {
      setNote(String(err?.message || 'Restore failed. Try again.'))
    }
  }

  return (
    <section className="card">
      <div className="goal-title">Your plan</div>
      <p className="note" style={{ marginTop: 0 }}>{line}</p>
      {native && access.status !== 'subscribed' && <button className="btn" type="button" onClick={onShowPlans}>See plans</button>}
      {native && access.status === 'subscribed' && <button className="btn btn-ghost" type="button" onClick={async () => (await purchases()).manageSubscriptions()}>Manage subscription</button>}
      {native && <button className="btn btn-ghost" type="button" onClick={restore}>Restore Purchases</button>}
      {note && <p className="note" role="status">{note}</p>}
    </section>
  )
}
