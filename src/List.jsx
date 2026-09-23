import { useMemo, useState } from 'react'
import { groceryFromWeek } from './macros.js'
import { buildShopText } from './shopList.js'
import { shopQty } from './shopQty.js'

const INSTACART = 'https://www.instacart.com'

export function List({ days, factors, goal, checked, setChecked, copied, onCopy, onShare }) {
  const [span, setSpan] = useState('week')
  const [dayId, setDayId] = useState(days[0]?.id || 'mon')
  const slice = span === 'day' ? days.filter((d) => d.id === dayId) : days
  const grocery = useMemo(() => groceryFromWeek(slice, factors), [slice, factors])
  const shopText = useMemo(() => buildShopText(grocery, goal), [grocery, goal])
  const keys = grocery.flatMap((section) => section.items.map((item) => `${section.name}:${item.name}`))
  const totalItems = keys.length
  const left = keys.filter((key) => !checked[key]).length
  const allOn = totalItems > 0 && left === 0
  const dayMeta = days.find((d) => d.id === dayId)

  function selectAll() {
    setChecked((prev) => {
      const next = { ...prev }
      keys.forEach((key) => { next[key] = !allOn })
      return next
    })
  }

  return (
    <>
      <section className="hero">
        <h1>{span === 'day' ? `Buy for ${dayMeta?.day || 'today'}.` : 'Buy for the week.'}</h1>
        <p>{left} of {totalItems} still unchecked.</p>
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

      <div className="card">
        <p className="note" style={{ marginTop: 0 }}>Copy the list, then open Instacart and add what you need. Cadence does not log into your store.</p>
        <div className="shop-actions">
          <button className="btn" type="button" onClick={() => onCopy(shopText)}>{copied === 'copied' ? 'Copied' : 'Copy the list'}</button>
          <a className="btn btn-ghost" href={INSTACART} target="_blank" rel="noreferrer">Open Instacart</a>
          <button className="btn btn-ghost" type="button" onClick={() => onShare(shopText)}>Text it to myself</button>
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
