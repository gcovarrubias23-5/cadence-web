import { isIosSafari, isStandalone } from './install.js'

export function InstallHint() {
  if (isStandalone()) return null
  const ios = isIosSafari()
  return (
    <section className="card">
      <div className="goal-title" style={{ fontSize: 20 }}>Put Cadence on your phone</div>
      <p className="note" style={{ marginTop: 8, fontSize: 18, lineHeight: 1.45 }}>
        {ios
          ? 'Tap Share, then Add to Home Screen. Cadence opens like an app. No App Store wait.'
          : 'On iPhone, open this page in Safari. Tap Share, then Add to Home Screen.'}
      </p>
    </section>
  )
}
