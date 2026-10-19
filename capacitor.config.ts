import type { CapacitorConfig } from '@capacitor/cli'

// Capacitor config for the native iOS build. The web preview on GitHub Pages
// does not use this file.
const config: CapacitorConfig = {
  // TODO(Gustavo): replace with the bundle ID registered in App Store Connect.
  // It must match exactly; changing it after the first upload makes a new app.
  appId: 'com.cadence.app',
  appName: 'Cadence',
  // `npm run build:ios` writes the native web bundle here (relative base './').
  webDir: 'dist-ios',
  ios: {
    contentInset: 'automatic',
  },
}

export default config
