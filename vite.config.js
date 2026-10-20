import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the app from /cadence-web/. The native iOS build
// (`vite build --mode ios`) loads files from the app bundle, so it needs
// relative paths and its own output folder.
export default defineConfig(({ mode }) => {
  const ios = mode === 'ios'
  return {
    plugins: [react()],
    base: ios ? './' : '/cadence-web/',
    build: ios ? { outDir: 'dist-ios' } : {},
  }
})
