import { useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_WEEK,
  WEEK_LABEL,
  SLOTS,
  mealOf,
  cleanWeek,
} from './plan.js'
import {
  DEFAULT_MARKS,
  dayTotals,
  factorsForDay,
  formatMacro,
  goalFromMarks,
  groceryFromWeek,
  kcalOf,
} from './macros.js'
import { applyPulse } from './checkin.js'
import { buildShopText } from './shopList.js'
import { Meal } from './mealView.jsx'
import { ProgressBars } from './bars.jsx'
import { Checkin } from './Checkin.jsx'
import { Start } from './Start.jsx'
import { Build } from './Build.jsx'
import { Invent } from './Invent.jsx'
import { ChangeSheet } from './ChangeSheet.jsx'
import { List } from './List.jsx'
import { Profile } from './Profile.jsx'
import { scrollAnchorToTop } from './scroll.js'
import { daysUntilCheckin, isCheckinDue } from './weekGate.js'
import {
  WATER_GOAL,
  addGlass,
  dayEatenCount,
  glassesFor,
  setGlasses,
  slotDone,
  toggleEaten,
} from './track.js'

const TABS = [
  { id: 'week', label: 'Kitchen' },
  { id: 'checkin', label: 'Check-in' },
  { id: 'build', label: 'Build' },
  { id: 'grocery', label: 'List' },
  { id: 'you', label: 'You' },
]

const SNACK_IDS = ['snack1', 'snack2', 'snack3']

function hydrate(picks, custom) {
  return picks.map((row) => {
    const day = { ...row }
    SLOTS.forEach((slot) => {
      day[slot.id] = mealOf(row[slot.id], custom)
    })
    return day
  })
}

function loadJson(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [profile, setProfile] = useState(() => loadJson('cadence.profile', null))
  const [custom, setCustom] = useState(() => loadJson('cadence.custom', []))
  const [inventOpen, setInventOpen] = useState(false)
  const [lastCheckin, setLastCheckin] = useState(() => loadJson('cadence.lastCheckin', null))
  const dueNow = isCheckinDue(lastCheckin)
  const [tab, setTab] = useState(dueNow ? 'checkin' : 'week')
  const [openDay, setOpenDay] = useState('')
  const [openSlot, setOpenSlot] = useState('')
  const [checked, setChecked] = useState({})
  const [copied, setCopied] = useState('')
  const [lastMove, setLastMove] = useState('')
  const [picking, setPicking] = useState(null)
  const [eaten, setEaten] = useState(() => loadJson('cadence.eaten', {}))
  const [water, setWater] = useState(() => loadJson('cadence.water', {}))
  const [picks, setPicks] = useState(() => {
    const parsed = loadJson('cadence.week', DEFAULT_WEEK)
    return parsed[0]?.snack3 ? parsed : DEFAULT_WEEK
  })
  const [marks, setMarks] = useState(() => {
    const saved = loadJson('cadence.marks', null)
    return saved ? { ...DEFAULT_MARKS, ...saved } : DEFAULT_MARKS
  })
  const avoid = profile?.avoid || []

  useEffect(() => { localStorage.setItem('cadence.marks', JSON.stringify(marks)) }, [marks])
  useEffect(() => { localStorage.setItem('cadence.week', JSON.stringify(picks)) }, [picks])
  useEffect(() => { localStorage.setItem('cadence.eaten', JSON.stringify(eaten)) }, [eaten])
  useEffect(() => { localStorage.setItem('cadence.water', JSON.stringify(water)) }, [water])
  useEffect(() => { localStorage.setItem('cadence.lastCheckin', JSON.stringify(lastCheckin)) }, [lastCheckin])
  useEffect(() => { localStorage.setItem('cadence.profile', JSON.stringify(profile)) }, [profile])
  useEffect(() => { localStorage.setItem('cadence.custom', JSON.stringify(custom)) }, [custom])
  useEffect(() => {
    if (tab !== 'week' || !openDay || !openSlot) return
    const t = setTimeout(() => scrollAnchorToTop(`${openDay}-${openSlot}`), 40)
    return () => clearTimeout(t)
  }, [tab, openDay, openSlot])

  const DAYS = useMemo(() => hydrate(picks, custom), [picks, custom])
  const goal = useMemo(() => goalFromMarks(marks), [marks])
  const factors = useMemo(() => {
    const next = {}
    DAYS.forEach((day) => { next[day.id] = factorsForDay(day, goal) })
    return next
  }, [goal, DAYS])
  const grocery = useMemo(() => groceryFromWeek(DAYS, factors), [DAYS, factors])
  const shopText = useMemo(() => buildShopText(grocery, goal), [grocery, goal])
  const weekPlates = DAYS.reduce((n, d) => n + dayEatenCount(eaten, d.id, SLOTS), 0)
  const weekWater = DAYS.reduce((n, d) => n + glassesFor(water, d.id), 0)
  const plateGoal = DAYS.length * 6
  const waterGoalWeek = DAYS.length * WATER_GOAL
  const due = isCheckinDue(lastCheckin)
  const daysLeft = daysUntilCheckin(lastCheckin)

  function patch(field, value) { setMarks((prev) => ({ ...prev, [field]: value })) }
  function pulse(move) {
    setMarks((prev) => applyPulse(prev, move))
    setLastMove(move)
    setLastCheckin(new Date().toISOString())
  }
  function finishStart(form, math) {
    setProfile({ ...form, avoid: form.avoid || [], targets: math, done: true })
    setMarks((prev) => ({ ...prev, protein: math.protein, carbs: math.carbs, fat: math.fat }))
    setPicks((prev) => cleanWeek(prev, custom, form.avoid || []))
    setTab('week')
  }
  function saveProfile(form, math) {
    const nextAvoid = form.avoid || []
    setProfile({ ...form, targets: math, done: true })
    if (math) setMarks((prev) => ({ ...prev, protein: math.protein, carbs: math.carbs, fat: math.fat }))
    setPicks((prev) => cleanWeek(prev, custom, nextAvoid))
    setTab('week')
  }
  function choose(dayId, slot, mealId) {
    setPicks((prev) => prev.map((row) => (row.id === dayId ? { ...row, [slot]: mealId } : row)))
    setPicking(null)
  }
  function savePlate(meal, slotId) {
    const slot = slotId || picking?.slot || (SNACK_IDS.includes(meal.slot) ? 'lunch' : meal.slot)
    setCustom((prev) => [meal, ...prev.filter((m) => m.id !== meal.id)])
    if (picking?.dayId) {
      setPicks((prev) => prev.map((row) => (row.id === picking.dayId ? { ...row, [picking.slot]: meal.id } : row)))
    } else {
      setPicks((prev) => prev.map((row) => ({ ...row, [slot]: meal.id })))
    }
    setPicking(null)
    setInventOpen(false)
    setTab('build')
  }
  function resetWeek() { setPicks(cleanWeek(DEFAULT_WEEK, custom, avoid)); setPicking(null) }
  function copyDay(dayId) {
    const src = picks.find((row) => row.id === dayId)
    if (!src) return
    setPicks((prev) => prev.map((row) => ({
      ...row,
      breakfast: src.breakfast,
      snack1: src.snack1,
      lunch: src.lunch,
      snack2: src.snack2,
      dinner: src.dinner,
      snack3: src.snack3,
    })))
  }
  function repeatSlot(slot, mealId) {
    setPicks((prev) => prev.map((row) => ({ ...row, [slot]: mealId })))
  }
  function sip(dayId) { setWater((prev) => addGlass(prev, dayId)) }

  async function copyList(text) {
    const body = typeof text === 'string' ? text : shopText
    try { await navigator.clipboard.writeText(body); setCopied('copied') }
    catch { setCopied('failed') }
    setTimeout(() => setCopied(''), 2000)
  }
  async function shareList(text) {
    const body = typeof text === 'string' ? text : shopText
    if (navigator.share) {
      try { await navigator.share({ title: 'Cadence list', text: body }); return } catch {}
    }
    copyList(body)
  }

  if (!profile?.done) {
    return <Start onDone={finishStart} />
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

      {tab === 'week' && (
        <>
          <section className="hero">
            <h1>Today’s plan.</h1>
            <p>Tick a plate when you eat. Tap water when you drink.</p>
          </section>
          {due && (
            <section className="card" style={{ borderColor: 'var(--accent)' }}>
              <div className="goal-title">Time to check in</div>
              <p className="note" style={{ marginTop: 0 }}>A week has passed. Say how the food sat so next week can move.</p>
              <button className="btn" type="button" onClick={() => setTab('checkin')}>How did this week feel?</button>
            </section>
          )}
          {DAYS.map((d) => {
            const open = openDay === d.id
            const slotFactors = factors[d.id] || {}
            const totals = dayTotals(d, slotFactors)
            const pickRow = picks.find((p) => p.id === d.id)
            const ate = dayEatenCount(eaten, d.id, SLOTS)
            const drinks = glassesFor(water, d.id)
            return (
              <article className="card day" key={d.id} data-anchor={d.id}>
                <button className="day-head" type="button" onClick={() => { setOpenDay(open ? '' : d.id); setOpenSlot('') }}>
                  <span>
                    <span className="day-name">{d.day}</span>
                    <span className="macro-line">
                      {Math.round(kcalOf(totals))} cal · {formatMacro(totals.protein)} P · {formatMacro(totals.carbs)} C · {formatMacro(totals.fat)} F
                    </span>
                  </span>
                </button>
                <div style={{ padding: '0 4px 12px' }}>
                  <ProgressBars ate={ate} drinks={drinks} onAddWater={() => sip(d.id)} />
                  <div className="glasses" style={{ marginTop: 10 }}>
                    {Array.from({ length: WATER_GOAL }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={i < drinks ? 'glass on' : 'glass'}
                        onClick={() => setWater((prev) => setGlasses(prev, d.id, i + 1 === drinks ? i : i + 1))}
                      />
                    ))}
                  </div>
                </div>
                {open && (
                  <div className="plan-list">
                    {SLOTS.map((slot) => {
                      const done = slotDone(eaten, d.id, slot.id)
                      const show = openSlot === slot.id
                      const meal = d[slot.id]
                      return (
                        <div className="slot-row" key={slot.id} data-anchor={`${d.id}-${slot.id}`}>
                          <div className="slot-row-main">
                            <input className="slot-check" type="checkbox" checked={done} onChange={() => setEaten((prev) => toggleEaten(prev, d.id, slot.id))} />
                            <button className="slot-toggle" type="button" onClick={() => setOpenSlot(show ? '' : slot.id)}>
                              <strong>{slot.label}</strong>
                              <span>{meal?.name || 'Choose a plate'}</span>
                            </button>
                          </div>
                          {show && (
                            <div className="slot-body">
                              <Meal label={slot.label} meal={meal} factor={slotFactors[slot.id] || 1} />
                              <button className="change" type="button" onClick={() => setPicking({ dayId: d.id, slot: slot.id, current: pickRow[slot.id] })}>Change</button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </article>
            )
          })}
        </>
      )}

      {tab === 'checkin' && (
        <Checkin
          marks={marks}
          goal={goal}
          lastMove={lastMove}
          onPulse={pulse}
          onPatch={patch}
          platesAte={weekPlates}
          plateGoal={plateGoal}
          waterDrank={weekWater}
          waterGoal={waterGoalWeek}
          due={due}
          daysLeft={daysLeft}
        />
      )}

      {tab === 'build' && (
        <Build
          picks={picks}
          custom={custom}
          onPick={(dayId, slot, current) => setPicking({ dayId, slot, current })}
          onReset={resetWeek}
          onCopyDay={copyDay}
          onRepeatSlot={repeatSlot}
          onInvent={() => setInventOpen(true)}
        />
      )}

      {tab === 'grocery' && (
        <List
          days={DAYS}
          factors={factors}
          goal={goal}
          checked={checked}
          setChecked={setChecked}
          copied={copied}
          onCopy={copyList}
          onShare={shareList}
        />
      )}

      {tab === 'you' && (
        <Profile profile={profile} onSave={saveProfile} />
      )}

      {picking && (
        <ChangeSheet
          picking={picking}
          custom={custom}
          avoid={avoid}
          onChoose={choose}
          onInvent={() => { setPicking(null); setInventOpen(true) }}
          onClose={() => setPicking(null)}
        />
      )}

      {inventOpen && (
        <Invent
          goal={goal}
          defaultSlot={picking?.slot || 'lunch'}
          onSave={savePlate}
          onClose={() => setInventOpen(false)}
        />
      )}
    </div>
  )
}
