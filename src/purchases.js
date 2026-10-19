// Subscriptions through Apple StoreKit 2 (via @capgo/native-purchases) in the
// iOS app, and a stub on the web preview. One interface either way:
//   getEntitlement() -> { active, productId, expiresAt }
//   purchase(productId) -> entitlement after the purchase
//   restorePurchases() -> entitlement after Restore
// There is no server: StoreKit 2 verifies transactions on the device, and the
// app only reads whether a Cadence subscription is current.
import { isNative } from './platform.js'

// PLACEHOLDERS: these must match the product IDs created in App Store Connect
// (one auto-renewable subscription group, two products). The 2-week free
// introductory offer is set on each product in App Store Connect, not here.
export const PRODUCTS = {
  monthly: 'cadence.monthly',
  yearly: 'cadence.yearly',
}
export const PRODUCT_IDS = Object.values(PRODUCTS)

// Apple's standard EULA, used unless a custom one is added in App Store Connect.
export const TERMS_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'

export const NONE = Object.freeze({ active: false, productId: null, expiresAt: null })

const LIVE_STATES = ['subscribed', 'inGracePeriod', 'inBillingRetryPeriod']

function isCurrent(t, now) {
  if (!t || !PRODUCT_IDS.includes(t.productIdentifier)) return false
  if (t.revocationDate) return false
  if (t.subscriptionState) return LIVE_STATES.includes(t.subscriptionState)
  if (typeof t.isActive === 'boolean') return t.isActive
  if (t.expirationDate) return Date.parse(t.expirationDate) > now
  return false
}

export function entitlementFrom(transactions, now = Date.now()) {
  const live = (transactions || []).filter((t) => isCurrent(t, now))
  if (!live.length) return NONE
  const latest = live.reduce((a, b) => (Date.parse(b.expirationDate || 0) > Date.parse(a.expirationDate || 0) ? b : a))
  return { active: true, productId: latest.productIdentifier, expiresAt: latest.expirationDate || null }
}

export class PurchaseUnavailable extends Error {
  constructor(message = 'Subscriptions are only available in the Cadence iOS app.') {
    super(message)
    this.name = 'PurchaseUnavailable'
  }
}

// `store` is the native plugin shape (getPurchases, purchaseProduct,
// restorePurchases, getProducts). Injected so tests can use a fake.
export function createPurchases({ store, now = () => Date.now() }) {
  async function getEntitlement() {
    if (!store) return NONE
    try {
      const { purchases } = await store.getPurchases({ productType: 'subs', onlyCurrentEntitlements: true })
      return entitlementFrom(purchases, now())
    } catch {
      return NONE
    }
  }

  async function purchase(productId) {
    if (!store) throw new PurchaseUnavailable()
    if (!PRODUCT_IDS.includes(productId)) throw new Error(`Unknown product: ${productId}`)
    await store.purchaseProduct({ productIdentifier: productId, productType: 'subs' })
    return getEntitlement()
  }

  async function restorePurchases() {
    if (!store) throw new PurchaseUnavailable()
    await store.restorePurchases()
    return getEntitlement()
  }

  async function getProducts() {
    if (!store) return []
    try {
      const { products } = await store.getProducts({ productIdentifiers: PRODUCT_IDS, productType: 'subs' })
      return products || []
    } catch {
      return []
    }
  }

  async function manageSubscriptions() {
    if (store?.manageSubscriptions) await store.manageSubscriptions()
  }

  return { available: !!store, getEntitlement, purchase, restorePurchases, getProducts, manageSubscriptions }
}

let shared = null

// The app-wide instance: StoreKit in the iOS app, the stub on the web.
export async function purchases() {
  if (shared) return shared
  let store = null
  if (isNative()) {
    const { NativePurchases } = await import('@capgo/native-purchases')
    store = NativePurchases
  }
  shared = createPurchases({ store })
  return shared
}

export async function getEntitlement() { return (await purchases()).getEntitlement() }
export async function purchase(productId) { return (await purchases()).purchase(productId) }
export async function restorePurchases() { return (await purchases()).restorePurchases() }
