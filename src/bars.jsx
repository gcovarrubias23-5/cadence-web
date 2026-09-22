import { WATER_GOAL } from './track.js'

export function ProgressBars({ ate, drinks }) {
  const platePct = Math.round(Math.min(100, (ate / 6) * 100))
  const waterPct = Math.round(Math.min(100, (drinks / WATER_GOAL) * 100))
  return (
    <div style={{ display: 'grid', gap: 10, marginTop: 10, width: '100%' }}>
      <Bar label="Plates" value={`${ate}/6 · ${platePct}%`} pct={platePct} color="#6b4f3a" />
      <Bar label="Water" value={`${drinks}/${WATER_GOAL} · ${waterPct}%`} pct={waterPct} color="#3d6b8a" />
    </div>
  )
}

function Bar({ label, value, pct, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div style={{ height: 10, background: '#e8e2d8', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: color, borderRadius: 99 }} />
      </div>
    </div>
  )
}
