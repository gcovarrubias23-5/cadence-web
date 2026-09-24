import { useMemo, useState } from 'react'
import { groceryFromWeek } from './macros.js'
import { buildShopText, buildReadableList } from './shopList.js'
import { shopQty } from './shopQty.js'
import { STEAK_CUTS, groceryHasSteak } from './shopPaste.js'

const INSTACART = 'https://www.instacart.com'

export function List({ days, factors, goal, checked, setChecked, copied, onCopy, onShare }) {
  const [span, setSpan] = useState('week')
  const [dayId, setDayId] = useState(days[0]?.id || 'mon')
  const [steak, setSteak] = useState(() => localStorage.getItem('cadence.shopSteak') || 'flank')
  const slice = span === 'day' ? days.filter((d) => d.id === dayId) : days
  const grocery = useMemo(() => groceryFromWeek(slice, factors), [slice, factors])
  const prefs = useMemo(() => ({ steak }), [steak])
  const pasteText = useMemo(() => buildShopText(grocery, prefs), [grocery, prefs])
  const readable = useMemo(() => buildReadableList(grocery, goal), [grocery, goal])
  const keys = grocery.flatMap((section) => section.items.map((item) => `${section.name}:${item.name}`))
  const totalItems = keys.length
  const pasteCount = pasteText.split('\n').filter(Boolean).length
  const left = keys.filter((key) => !checked[key]).length
  const allOn = totalItems > 0 && left === 0
  const dayMeta = days.find((d) => d.id === dayId)
  const showSteak = groceryHasSteak(grocery)

  function selectAll() {
    setChecked((prev) => {
      const next = { ...prev }
      keys.forEach((key) => { next[key] = !allOn })
      return next
    })
  }

  function pickSteak(id) {
    setSteak(id)
    localStorage.setItem('cadence.shopSteak', id)
  }

  return (
    <>
      <section className="hero">
        <h1>{span === 'day' ? `Buy for ${dayMeta?.day || 'today'}.` : 'Buy for the week.'}</h1>
        <p>{left} of {totalItems} still unchecked. Copy sends {pasteCount} store names.</p>
      </section>

      <div className="card" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className={span === 'day' ? 'btn' : 'btn btn-ghost'} type="button" onClick={() => setSpan('day')}>This day</button>
        <button className={span === 'week' ? 'btn' : 'btn btn-ghost'} type="button" onClick={() => setSpan('week')}>This week</button>
        <button className="btn btn-ghost" type="button" onClick={selectAll}>{allOn ? 'Clear all' : 'Select all'}</button>
      </div>

      {span === 'day' && (
        <div className="card" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {days.map((d) => (
            <button
              key={d.id}
              type="button"
              className={d.id === dayId ? 'option on' : 'option'}
              style={{ margin: 0, flex: '1 1 28%' }}
              onClick={() => setDayId(d.id)}
            >
              <strong>{d.day.slice(0, 3)}</strong>
            </button>
          ))}
        </div>
      )}

      {showSteak && (
        <section className="card">
          <div className="goal-title">Steak this week</div>
          <p className="note" style={{ marginTop: 0 }}>Safeway often misses flank. Pick the cut you want Instacart to search.</p>
          <div className="checkin-row">
            {STEAK_CUTS.map((cut) => (
              <button
                key={cut.id}
                type="button"
                className={steak === cut.id ? 'checkin on' : 'checkin'}
                onClick={() => pickSteak(cut.id)}
              >
                <strong>{cut.label}</strong>
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="card">
        <p className="note" style={{ marginTop: 0 }}>
          Copy is one grocery name per line. Amounts stay on this screen.
        </p>
        <div className="shop-actions">
          <button className="btn" type="button" onClick={() => onCopy(pasteText)}>{copied === 'copied' ? 'Copied' : 'Copy for Instacart'}</button>
          <a className="btn btn-ghost" href={INSTACART} target="_blank" rel="noreferrer">Open Instacart</a>
          <button className="btn btn-ghost" type="button" onClick={() => onShare(readable)}>Text amounts to myself</button>
        </div>
      </div>

      {grocery.map((section) => (
        <div className="card aisle" key={section.name}>
          <h3>{section.name}</h3>
          <ul>
            {section.items.map((item) => {
              const key = `${section.name}:${item.name}`
              return (
                <li key={key}>
                  <label>
                    <input type="checkbox" checked={!!checked[key]} onChange={() => setChecked((prev) => ({ ...prev, [key]: !prev[key] }))} />
                    <span className="item-name">{item.name}</span>
                    <span className="qty">{shopQty(item)}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </>
  )
}
