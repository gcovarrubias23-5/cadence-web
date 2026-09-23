import { useEffect, useRef, useState } from 'react'
import { WATER_GOAL } from './track.js'

export function ProgressBars({ ate, drinks, onAddWater, plateLabel, waterLabel }) {
  const platePct = Math.round(Math.min(100, (Number(ate) / 6) * 100))
  const waterPct = Math.round(Math.min(100, (Number(drinks) / WATER_GOAL) * 100))
  const platesLeft = Math.max(0, 6 - Number(ate || 0))
  const waterLeft = Math.max(0, WATER_GOAL - Number(drinks || 0))
  const done = platesLeft === 0 && waterLeft === 0
  const wasDone = useRef(done)
  const [boom, setBoom] = useState(false)

  useEffect(() => {
    if (done && !wasDone.current) {
      setBoom(true)
      const t = setTimeout(() => setBoom(false), 1800)
      wasDone.current = true
      return () => clearTimeout(t)
    }
    wasDone.current = done
  }, [done])

  const nudge = done
    ? 'Full day. That is the rhythm.'
    : platesLeft === 0
      ? waterLeft === 1
        ? 'Plates are done. One glass left.'
        : `Plates are done. ${waterLeft} glasses left.`
      : waterLeft === 0
        ? platesLeft === 1
          ? 'Water is done. One plate left. You can do this.'
          : `Water is done. ${platesLeft} plates left. You can do this.`
        : platesLeft + waterLeft <= 3
          ? `Only ${platesLeft} plate${platesLeft === 1 ? '' : 's'} and ${waterLeft} glass${waterLeft === 1 ? '' : 'es'} left. You can do this.`
          : `${platesLeft} plate${platesLeft === 1 ? '' : 's'} and ${waterLeft} glass${waterLeft === 1 ? '' : 'es'} to a full day.`

  const water = (
    <Bar
      label="Water"
      value={waterLabel || `${drinks}/${WATER_GOAL} · ${waterPct}%`}
      pct={waterPct}
      color="#3b82f6"
    />
  )
  return (
    <div style={{ display: 'grid', gap: 12, marginTop: 10, width: '100%' }}>
      <Bar label="Plates" value={plateLabel || `${ate}/6 · ${platePct}%`} pct={platePct} color="#2f7d4a" />
      {onAddWater ? (
        <button type="button" onClick={onAddWater} style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', cursor: 'pointer' }}>
          {water}
        </button>
      ) : water}
      <p className="note" style={{ margin: 0, fontWeight: 600 }}>{nudge}</p>
      {boom && <Confetti />}
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

function Confetti() {
  const bits = Array.from({ length: 28 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    delay: `${(i % 8) * 0.04}s`,
    color: ['#2f7d4a', '#3b82f6', '#c4a35a', '#f4e7c5'][i % 4],
    rot: (i * 24) % 360,
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 80, overflow: 'hidden' }}>
      {bits.map((b, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: '-8px',
            left: b.left,
            width: 8,
            height: 12,
            background: b.color,
            transform: `rotate(${b.rot}deg)`,
            animation: `cadence-fall 1.6s ease-in ${b.delay} forwards`,
            borderRadius: 2,
          }}
        />
      ))}
      <style>{`@keyframes cadence-fall { to { transform: translateY(110vh) rotate(240deg); opacity: 0.2; } }`}</style>
    </div>
  )
}
