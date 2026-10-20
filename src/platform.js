import { Capacitor } from '@capacitor/core'

// True inside the Capacitor iOS app, false in a browser (GitHub Pages preview).
export function isNative() {
  try { return Capacitor.isNativePlatform() } catch { return false }
}

export function platform() {
  try { return Capacitor.getPlatform() } catch { return 'web' }
}
