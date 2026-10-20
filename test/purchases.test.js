import { describe, it, expect, beforeEach } from 'vitest'
import { installStorage } from './memoryStorage.js'
import { createPurchases, PRODUCTS, PurchaseUnavailable } from '../src/purchases.js'
import { accessState, startTrial, TRIAL_DAYS } from '../src/trial.js'

const DAY = 86400000
const T0 = Date.parse('2026-10-01T09:00:00Z')

// A stand-in for the App Store: what this Apple ID has bought and what
// Restore would bring back.
function fakeStore({ owned = [], restorable = [] } = {}) {
  const state = { owned: [...owned] }
  return {
    state,
    async getPurchases() { return { purchases: state.owned } },
    async purchaseProduct({ productIdentifier }) {
      const tx = sub(productIdentifier, T0 + 60 * DAY)
      state.owned.push(tx)
      return tx
    },
    async restorePurchases() { state.owned.push(...restorable) },
    async getProducts() { return { products: [] } },
  }
}

function sub(productIdentifier, expires, extra = {}) {
  return { transactionId: String(Math.random()), productIdentifier, purchaseDate: new Date(T0).toISOString(), expirationDate: new Date(expires).toISOString(), ...extra }
}

function startTrialAt(t) {
  localStorage.setItem('cadence.trialStart', new Date(t).toISOString())
}

beforeEach(() => installStorage())

describe('trial', () => {
  it('a new person is on the trial with the full two weeks', () => {
    startTrial()
    expect(accessState(null)).toEqual({ status: 'trial', daysLeft: TRIAL_DAYS, productId: null })
  })

  it('stays on the trial through the last day', () => {
    startTrialAt(T0)
    expect(accessState(null, T0 + 13 * DAY).status).toBe('trial')
    expect(accessState(null, T0 + 13 * DAY).daysLeft).toBe(1)
  })

  it('expires after fourteen days with no purchase', () => {
    startTrialAt(T0)
    expect(accessState(null, T0 + 14 * DAY)).toEqual({ status: 'expired', daysLeft: 0, productId: null })
  })
})

describe('entitlement', () => {
  it('expired trial plus a current subscription is subscribed', async () => {
    startTrialAt(T0)
    const now = T0 + 20 * DAY
    const p = createPurchases({ store: fakeStore({ owned: [sub(PRODUCTS.yearly, now + 300 * DAY)] }), now: () => now })
    const ent = await p.getEntitlement()
    expect(ent.active).toBe(true)
    expect(accessState(ent, now)).toMatchObject({ status: 'subscribed', productId: PRODUCTS.yearly })
  })

  it('a lapsed subscription does not unlock', async () => {
    startTrialAt(T0)
    const now = T0 + 40 * DAY
    const p = createPurchases({ store: fakeStore({ owned: [sub(PRODUCTS.monthly, now - DAY)] }), now: () => now })
    expect(accessState(await p.getEntitlement(), now).status).toBe('expired')
  })

  it('a refunded subscription does not unlock', async () => {
    const now = T0 + 20 * DAY
    const owned = [sub(PRODUCTS.monthly, now + 10 * DAY, { revocationDate: new Date(now - DAY).toISOString() })]
    const p = createPurchases({ store: fakeStore({ owned }), now: () => now })
    expect((await p.getEntitlement()).active).toBe(false)
  })

  it('trusts StoreKit state when it says grace period or expired', async () => {
    const now = T0
    const grace = createPurchases({ store: fakeStore({ owned: [sub(PRODUCTS.monthly, now - DAY, { subscriptionState: 'inGracePeriod' })] }), now: () => now })
    const gone = createPurchases({ store: fakeStore({ owned: [sub(PRODUCTS.monthly, now + DAY, { subscriptionState: 'expired' })] }), now: () => now })
    expect((await grace.getEntitlement()).active).toBe(true)
    expect((await gone.getEntitlement()).active).toBe(false)
  })

  it('ignores products that are not Cadence subscriptions', async () => {
    const p = createPurchases({ store: fakeStore({ owned: [sub('someone.else', T0 + 99 * DAY)] }), now: () => T0 })
    expect((await p.getEntitlement()).active).toBe(false)
  })

  it('stays locked if the store cannot be reached', async () => {
    const store = { async getPurchases() { throw new Error('offline') } }
    const p = createPurchases({ store, now: () => T0 })
    expect((await p.getEntitlement()).active).toBe(false)
  })
})

describe('purchase', () => {
  it('buying after the trial ends unlocks the app', async () => {
    startTrialAt(T0)
    const now = T0 + 15 * DAY
    const p = createPurchases({ store: fakeStore(), now: () => now })
    expect(accessState(await p.getEntitlement(), now).status).toBe('expired')
    const ent = await p.purchase(PRODUCTS.monthly)
    expect(accessState(ent, now)).toMatchObject({ status: 'subscribed', productId: PRODUCTS.monthly })
  })

  it('rejects a product that is not in the config', async () => {
    const p = createPurchases({ store: fakeStore(), now: () => T0 })
    await expect(p.purchase('cadence.lifetime')).rejects.toThrow()
  })
})

describe('restore', () => {
  it('restoring an earlier subscription unlocks an expired trial', async () => {
    startTrialAt(T0)
    const now = T0 + 30 * DAY
    const p = createPurchases({ store: fakeStore({ restorable: [sub(PRODUCTS.yearly, now + 200 * DAY)] }), now: () => now })
    expect((await p.getEntitlement()).active).toBe(false)
    const ent = await p.restorePurchases()
    expect(accessState(ent, now).status).toBe('subscribed')
  })

  it('restoring with nothing to restore leaves the trial expired', async () => {
    startTrialAt(T0)
    const now = T0 + 30 * DAY
    const p = createPurchases({ store: fakeStore(), now: () => now })
    expect(accessState(await p.restorePurchases(), now).status).toBe('expired')
  })
})

describe('web preview', () => {
  it('has no subscription and cannot buy or restore', async () => {
    const p = createPurchases({ store: null })
    expect(p.available).toBe(false)
    expect((await p.getEntitlement()).active).toBe(false)
    await expect(p.purchase(PRODUCTS.monthly)).rejects.toBeInstanceOf(PurchaseUnavailable)
    await expect(p.restorePurchases()).rejects.toBeInstanceOf(PurchaseUnavailable)
  })

  it('still shows the trial', () => {
    startTrial()
    expect(accessState(null).status).toBe('trial')
  })
})
