import { WATER_GOAL } from './track.js'

export function ProgressBars({ ate, drinks, onAddWater }) {
  const platePct = Math.round(Math.min(100, (Number(ate) / 6) * 100))
  const waterPct = Math.round(Math.min(100, (Number(drinks) / WATER_GOAL) * 100))
  return (
    <div style={{ display: 'grid', gap: 12, marginTop: 10, width: '100%' }}>
      <Bar label="Plates" value={`${ate}/6 · ${platePct}%`} pct={platePct} color="#6b4f3a" />
      <button
        type="button"
        onClick={onAddWater}
        style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', cursor: 'pointer' }}
      >
        <Bar label="Water" value={`${drinks}/${WATER_GOAL} · ${waterPct}%`} pct={waterPct} color="#3d6b8a" />
      </button>
    </div>
  )
}

function Bar({ label, value, pct, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div style={{ height: 12, background: '#e8e2d8', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: Math.max(pct, 0) + '%', minWidth: pct > 0 ? 8 : 0, background: color, borderRadius: 99 }} />
      </div>
    </div>
  )
}
