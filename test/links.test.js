import { describe, it, expect, vi, afterEach } from 'vitest'

afterEach(() => {
  vi.resetModules()
  vi.doUnmock('@capacitor/core')
})

async function linksOn(native) {
  vi.doMock('@capacitor/core', () => ({
    Capacitor: { isNativePlatform: () => native, getPlatform: () => (native ? 'ios' : 'web') },
  }))
  return import('../src/links.js')
}

describe('privacy and support links', () => {
  it('stay next to the app on the web preview', async () => {
    const { privacyUrl, supportUrl } = await linksOn(false)
    expect(privacyUrl()).toBe('/cadence-web/privacy.html')
    expect(supportUrl()).toBe('/cadence-web/support.html')
  })

  it('point at the hosted pages inside the native app', async () => {
    const { privacyUrl, supportUrl } = await linksOn(true)
    expect(privacyUrl()).toBe('https://gcovarrubias23-5.github.io/cadence-web/privacy.html')
    expect(supportUrl()).toBe('https://gcovarrubias23-5.github.io/cadence-web/support.html')
  })
})
