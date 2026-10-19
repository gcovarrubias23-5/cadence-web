import { useEffect, useState } from 'react'
import { PRODUCTS, TERMS_URL, purchases } from './purchases.js'
import { privacyUrl } from './links.js'

const ORDER = [PRODUCTS.monthly, PRODUCTS.yearly]
const FALLBACK = {
  [PRODUCTS.monthly]: { title: 'Month', period: 'month' },
  [PRODUCTS.yearly]: { title: 'Year', period: 'year' },
}

function periodWord(product, id) {
  const unit = product?.subscriptionPeriod?.unitString
  const n = product?.subscriptionPeriod?.numberOfUnits || 1
  if (unit && unit !== 'unknown') return n === 1 ? unit : `${n} ${unit}s`
  return FALLBACK[id].period
}

function introLine(product) {
  const intro = product?.introductoryPrice
  if (!intro || product.introEligibility === 1) return ''
  const unit = intro.subscriptionPeriod?.unitString
  const n = (intro.subscriptionPeriod?.numberOfUnits || 1) * (intro.numberOfPeriods || 1)
  const span = unit && unit !== 'unknown' ? `${n} ${unit}${n === 1 ? '' : 's'}` : 'the intro period'
  return intro.price === 0 ? `Free for ${span}, then` : `${intro.priceString} for ${span}, then`
}

// Native paywall. `locked` means the trial is over: no close button.
export function Paywall({ locked = false, onEntitled, onClose }) {
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let live = true
    purchases().then(async (p) => {
      if (!live) return
      setStore(p)
      const list = await p.getProducts()
      if (live) setProducts(list)
    })
    return () => { live = false }
  }, [])

  async function run(kind, fn) {
    setBusy(kind)
    setMessage('')
    try {
      const ent = await fn()
      if (ent?.active) onEntitled?.(ent)
      else if (kind === 'restore') setMessage('No active Cadence subscription found for this Apple ID.')
    } catch (err) {
      const text = String(err?.message || err || '')
      if (!/cancel/i.test(text)) setMessage(text || 'Something went wrong. Try again.')
    } finally {
      setBusy('')
    }
  }

  const byId = Object.fromEntries(products.map((p) => [p.identifier, p]))
  const canBuy = !!store?.available

  return (
    <div className="app">
      <section className="hero">
        <h1>{locked ? 'Your two weeks are up.' : 'Stay in the kitchen.'}</h1>
        <p>Keep going by the month or the year. Same plates, water, and list. Your week and history stay on this phone.</p>
      </section>

      <section className="card">
        {ORDER.map((id) => {
          const p = byId[id]
          const price = p?.priceString
          return (
            <button key={id} className="option" type="button" style={{ width: '100%' }} disabled={!canBuy || !!busy} onClick={() => run(id, () => store.purchase(id))}>
              <strong>{p?.title || FALLBACK[id].title}</strong>
              <span>
                {price ? `${introLine(p)} ${price} / ${periodWord(p, id)}`.trim() : 'Price loads from the App Store'}
                {busy === id ? ' · opening…' : ''}
              </span>
            </button>
          )
        })}
        {!canBuy && <p className="note">Subscriptions are only available in the Cadence iOS app.</p>}
        <button className="btn btn-ghost" type="button" disabled={!canBuy || !!busy} onClick={() => run('restore', () => store.restorePurchases())}>
          {busy === 'restore' ? 'Restoring…' : 'Restore Purchases'}
        </button>
        {message && <p className="note" role="status">{message}</p>}
      </section>

      <p className="note">
        Payment is charged to your Apple ID when you confirm. The subscription renews automatically at the price shown unless you cancel at least 24 hours before the end of the current period. Manage or cancel in Settings › your name › Subscriptions.
      </p>
      <p className="note">
        <a href={TERMS_URL}>Terms of Use</a> · <a href={privacyUrl()}>Privacy Policy</a>
      </p>
      {!locked && onClose && <button className="btn btn-ghost" type="button" onClick={onClose}>Not now</button>}
    </div>
  )
}
