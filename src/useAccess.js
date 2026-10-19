import { useCallback, useEffect, useState } from 'react'
import { NONE, getEntitlement } from './purchases.js'
import { accessState } from './trial.js'
import { isNative } from './platform.js'

// Entitlement plus trial state for the UI. Re-checks when the app comes back
// to the foreground, so a renewal, refund, or cancel shows up without a restart.
export function useAccess() {
  const [entitlement, setEntitlement] = useState(NONE)
  const [ready, setReady] = useState(false)

  const refresh = useCallback(async () => {
    const next = await getEntitlement()
    setEntitlement(next)
    setReady(true)
    return next
  }, [])

  useEffect(() => {
    refresh()
    const onShow = () => { if (document.visibilityState === 'visible') refresh() }
    document.addEventListener('visibilitychange', onShow)
    return () => document.removeEventListener('visibilitychange', onShow)
  }, [refresh])

  const access = accessState(entitlement)
  // Only the iOS app can take payment, so only it locks after the trial.
  const locked = isNative() && ready && access.status === 'expired'
  return { access, entitlement, setEntitlement, refresh, locked }
}
