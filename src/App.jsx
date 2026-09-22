import { useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_WEEK,
  WEEK_LABEL,
  SLOTS,
  mealOf,
  optionsFor,
} from './plan.js'
import {
  DEFAULT_MARKS,
  dayTotals,
  formatG,
  formatMacro,
  goalFromMarks,
  groceryFromWeek,
  kcalOf,
  scaleForGoal,
} from './macros.js'
import { applyPulse, PULSE_COPY } from './checkin.js'
import { buildShopText, STORES } from './shopList.js'
import { Meal } from './mealView.jsx'

const TABS = [
  { id: 'week', label: 'Kitchen' },
  { id: 'build', label: 'Build' },
  { id: 'grocery', label: 'List' },
  { id: 'shop', label: 'Shop' },
  { id: 'plus', label: 'Plus' },
]

function hydrate(picks) {
  return picks.map((row) => {
    const day = { ...row }
    SLOTS.forEach((slot) => {
      day[slot.id] = mealOf(row[slot.id])
    })
    return day
  })
}

export default function App() {
  const [tab, setTab] = useState('week')
  const [openDay, setOpenDay] = useState('mon')
  const [checked, setChecked] = useState({})
  const [copied, setCopied] = useState('')
  const [lastMove, setLastMove] = useState('')
  const [picking, setPicking] = useState(null)
  const [picks, setPicks] = useState(() => {
    try {
      const saved = localStorage.getItem('cadence.week')
      const parsed = saved ? JSON.parse(saved) : DEFAULT_WEEK
      return parsed[0]?.snack1 ? parsed : DEFAULT_WEEK
    } catch {
      return DEFAULT_WEEK
    }
  })
  const [marks, setMarks] = useState(() => {
    try {
      const saved = localStorage.getItem('cadence.marks')
      return saved ? { ...DEFAULT_MARKS, ...JSON.parse(saved) } : DEFAULT_MARKS
    } catch {
      return DEFAULT_MARKS
    }
  })

  useEffect(() => {
    localStorage.setItem('cadence.marks', JSON.stringify(marks))
  }, [marks])
  useEffect(() => {
    localStorage.setItem('cadence.week', JSON.stringify(picks))
  }, [picks])

  const DAYS = useMemo(() => hydrate(picks), [picks])
  const goal = useMemo(() => goalFromMarks(marks), [marks])
  const factors = useMemo(() => {
    const next = {}
    DAYS.forEach((day) => {
      next[day.id] = scaleForGoal(day, goal)
    })
    return next
  }, [goal, DAYS])
  const grocery = useMemo(() => groceryFromWeek(DAYS, factors), [DAYS, factors])
  const shopText = useMemo(() => buildShopText(grocery, goal), [grocery, goal])
  const totalItems = grocery.reduce((n, s) => n + s.items.length, 0)
  const remaining = useMemo(() => {
    let left = 0
    grocery.forEach((section) => {
      section.items.forEach((item) => {
        if (!checked[`${section.name}:${item.name}`]) left += 1
      })
    })
    return left
  }, [checked, grocery])

  function patch(field, value) {
    setMarks((prev) => ({ ...prev, [field]: value }))
  }
  function pulse(move) {
    setMarks((prev) => applyPulse(prev, move))
    setLastMove(move)
  }
  function choose(dayId, slot, mealId) {
    setPicks((prev) => prev.map((row) => (row.id === dayId ? { ...row, [slot]: mealId } : row)))
    setPicking(null)
  }
  function resetWeek() {
    setPicks(DEFAULT_WEEK)
    setPicking(null)
  }

  async function copyList() {
    try {
      await navigator.clipboard.writeText(shopText)
      setCopied('copied')
    } catch {
      setCopied('failed')
    }
    setTimeout(() => setCopied(''), 2000)
  }
  async function shareList() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Cadence list', text: shopText })
        return
      } catch {}
    }
    copyList()
  }

  return (
    <div className="app">
      <header>
        <div>
          <div className="brand">Cadence</div>
          <div className="eyebrow">{WEEK_LABEL} · just you</div>
        </div>
        <nav>
          {TABS.map((item) => (
            <button key={item.id} className={tab === item.id ? 'nav-on' : ''} onClick={() => setTab(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <section className="card goal">
        <div className="goal-title">{PULSE_COPY.prompt}</div>
        <p className="note" style={{ marginTop: 0 }}>{PULSE_COPY.hint}</p>
        <div className="checkin-row">
          <PulseBtn active={lastMove === 'hungry'} onClick={() => pulse('hungry')} {...PULSE_COPY.hungry} />
          <PulseBtn active={lastMove === 'right'} onClick={() => pulse('right')} {...PULSE_COPY.right} />
          <PulseBtn active={lastMove === 'heavy'} onClick={() => pulse('heavy')} {...PULSE_COPY.heavy} />
        </div>
        <div className="goal-grid" style={{ marginTop: 14 }}>
          <MarkInput label="protein" value={marks.protein} onChange={(v) => patch('protein', Number(v) || 0)} />
          <MarkInput label="carbs" value={marks.carbs} onChange={(v) => patch('carbs', Number(v) || 0)} />
          <MarkInput label="fat" value={marks.fat} onChange={(v) => patch('fat', Number(v) || 0)} />
          <div className="goal-field">
            <span>calories</span>
            <div className="kcal-readout">{Math.round(goal.kcal)}</div>
          </div>
        </div>
        <p className="note">Today’s plate is breakfast, two snacks, lunch, and dinner. Change any one.</p>
      </section>

      {tab === 'week' && (
        <>
          <section className="hero">
            <h1>Today’s plan.</h1>
            <p>Open a day. Each slot is a full plate. Tap Change if you want something else.</p>
          </section>
          {DAYS.map((d) => {
            const open = openDay === d.id
            const factor = factors[d.id]
            const totals = scaledDayTotals(d, factor)
            const pickRow = picks.find((p) => p.id === d.id)
            return (
              <article className="card day" key={d.id}>
                <button className="day-head" onClick={() => setOpenDay(open ? '' : d.id)}>
                  <span>
                    <span className="day-name">{d.day}</span>
                    <span className="macro-line">about {Math.round(kcalOf(totals))} calories · {formatMacro(totals.protein)} protein</span>
                  </span>
                </button>
                {open && (
                  <div className="plan-list">
                    {SLOTS.map((slot) => (
                      <div className="plan-slot" key={slot.id}>
                        <Meal label={slot.label} meal={d[slot.id]} factor={factor} />
                        <button className="change" type="button" onClick={() => setPicking({ dayId: d.id, slot: slot.id, current: pickRow[slot.id] })}>
                          Change
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </>
      )}

      {tab === 'build' && (
        <>
          <section className="hero">
            <h1>Build the week.</h1>
            <p>Five slots a day. Tap one to swap it.</p>
            <button className="btn" type="button" onClick={resetWeek}>Use the starter week</button>
          </section>
          {picks.map((row) => (
            <article className="card" key={row.id}>
              <h3 className="day-name">{row.day}</h3>
              {SLOTS.map((slot) => {
                const meal = mealOf(row[slot.id])
                return (
                  <button key={slot.id} className="pick-row" type="button" onClick={() => setPicking({ dayId: row.id, slot: slot.id, current: row[slot.id] })}>
                    <span className="meal-label">{slot.label}</span>
                    <span>{meal.name}</span>
                    <span className="qty">Change</span>
                  </button>
                )
              })}
            </article>
          ))}
        </>
      )}

      {tab === 'grocery' && (
        <>
          <section className="hero">
            <h1>Here is what to buy.</h1>
            <p>This list matches the week you built. {remaining} of {totalItems} still unchecked.</p>
            <button className="btn" type="button" onClick={() => setTab('shop')}>Take this shopping</button>
          </section>
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
                        <span className="qty">{formatG(item.grams)}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </>
      )}

      {tab === 'shop' && (
        <>
          <section className="hero">
            <h1>Go shop like you usually do.</h1>
            <p>Copy the list, then finish in Instacart or at the store.</p>
          </section>
          <div className="card">
            <div className="shop-actions">
              <button className="btn" type="button" onClick={copyList}>{copied === 'copied' ? 'Copied' : copied === 'failed' ? 'That did not copy' : 'Copy the list'}</button>
              <button className="btn btn-ghost" type="button" onClick={shareList}>Text it to myself</button>
            </div>
            <pre className="shop-text">{shopText}</pre>
          </div>
          {STORES.map((store) => (
            <article className="card" key={store.id}>
              <h3>{store.name}</h3>
              <p className="meal-note">{store.blurb}</p>
              <p className="note">{store.state}</p>
              {store.id === 'instacart' && <a className="btn link-btn" href="https://www.instacart.com" target="_blank" rel="noreferrer">Open Instacart</a>}
              {store.id === 'walmart' && <a className="btn link-btn" href="https://www.walmart.com/grocery" target="_blank" rel="noreferrer">Open Walmart</a>}
            </article>
          ))}
        </>
      )}

      {tab === 'plus' && (
        <>
          <section className="hero">
            <h1>Want next week written for you?</h1>
            <p>After you say how this week felt, Plus can draft the next seven days. You can still swap meals.</p>
          </section>
        </>
      )}

      {picking && (
        <div className="sheet" onClick={() => setPicking(null)}>
          <div className="sheet-card" onClick={(e) => e.stopPropagation()}>
            <p className="plan-kicker">Change this slot</p>
            <h2>What do you want instead?</h2>
            {optionsFor(picking.slot).map((meal) => (
              <button
                key={meal.id}
                className={meal.id === picking.current ? 'option on' : 'option'}
                type="button"
                onClick={() => choose(picking.dayId, picking.slot, meal.id)}
              >
                <strong>{meal.name}</strong>
                <span>{meal.time}</span>
              </button>
            ))}
            <button className="btn btn-ghost" type="button" onClick={() => setPicking(null)}>Never mind</button>
          </div>
        </div>
      )}
    </div>
  )
}

function PulseBtn({ title, line, onClick, active }) {
  return (
    <button type="button" className={active ? 'checkin on' : 'checkin'} onClick={onClick}>
      <strong>{title}</strong>
      <span>{line}</span>
    </button>
  )
}

function MarkInput({ label, value, onChange }) {
  return (
    <label className="goal-field">
      <span>{label}</span>
      <input type="number" min="0" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

function scaledDayTotals(day, factor) {
  const base = dayTotals(day)
  return { protein: base.protein * factor, carbs: base.carbs * factor, fat: base.fat * factor }
}
