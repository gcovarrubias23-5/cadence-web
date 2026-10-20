import { isNative } from './platform.js'

// Hosted pages. The native app opens these in Safari; the web preview links
// to the copies served next to the app.
const HOSTED = 'https://gcovarrubias23-5.github.io/cadence-web/'

function site() {
  return isNative() ? HOSTED : import.meta.env.BASE_URL
}

export const privacyUrl = () => `${site()}privacy.html`
export const supportUrl = () => `${site()}support.html`
