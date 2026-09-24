export function registerHomeScreen() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return
  const sw = `${import.meta.env.BASE_URL}sw.js`
  window.addEventListener('load', function () {
    navigator.serviceWorker.register(sw).catch(function () {})
  })
}

export function isIosSafari() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const ios = /iPad|iPhone|iPod/.test(ua)
  const safari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua)
  return ios && safari
}

export function isStandalone() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}
