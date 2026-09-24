const KEY = 'cadence.weightLog'

function loadLogs() {
  try {
    const rows = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(rows) ? [...rows].sort((a, b) => String(a.date).localeCompare(String(b.date))) : []
  } catch {
    return []
  }
}

function toLb(row, delta) {
  if (!row) return delta
  return row.kg ? delta * 2.20462 : delta
}

function unitLabel(row) {
  return row?.kg ? 'kg' : 'lb'
}

export function adaptWeek({ platePct = 0, goalId = 'hold' } = {}) {
  const logs = loadLogs()
  const last = logs[logs.length - 1]
  const prev = logs.length >= 2 ? logs[logs.length - 2] : null
  const thinWeight = logs.length < 2
  const thinPlates = platePct < 35
  let move = 'right'
  let why = 'Not enough of a week to read a trend. Go by how you felt.'

  if (thinWeight && thinPlates) {
    return pack({ move: 'right', why, last, prev, platePct, thin: true, goalId })
  }

  if (thinWeight) {
    why = platePct >= 70
      ? 'Plates were in. No weight line yet. Suggested: stay.'
      : 'Weight is thin. Suggested: stay and go by how you felt.'
    return pack({ move: 'right', why, last, prev, platePct, thin: true, goalId })
  }

  const raw = last.value - prev.value
  const lb = toLb(last, raw)
  const shown = Math.round(Math.abs(raw) * 10) / 10
  const dir = raw > 0.05 ? 'up' : raw < -0.05 ? 'down' : 'flat'
  const unit = unitLabel(last)

  if (goalId === 'lose') {
    if (lb <= -1.6 && platePct >= 45) {
      move = 'heavy'
      why = `Weight is down ${shown} ${unit}. That is a fast week. Suggested: ease off.`
    } else if (lb >= 0.7 && platePct >= 55) {
      move = 'heavy'
      why = `Weight is up ${shown} ${unit} and plates were in. Suggested: ease off.`
    } else if (lb >= 0.7 && platePct < 55) {
      move = 'right'
      why = `Weight is up ${shown} ${unit}, but plates were light. Suggested: stay. Do not cut a week you barely ate.`
    } else {
      move = 'right'
      why = dir === 'down'
        ? `Weight eased ${shown} ${unit}. Suggested: stay.`
        : 'Suggested: stay. Let another week speak.'
    }
  } else if (goalId === 'strong') {
    if (lb <= -0.6 && platePct >= 50) {
      move = 'hungry'
      why = `Weight eased ${shown} ${unit}. Suggested: a little more.`
    } else if (lb >= 1.8 && platePct >= 55) {
      move = 'heavy'
      why = `Weight jumped ${shown} ${unit}. Suggested: ease off.`
    } else {
      move = 'right'
      why = 'Suggested: stay. Building likes a quiet week.'
    }
  } else if (lb <= -0.8 && platePct >= 50) {
    move = 'hungry'
    why = `Weight eased ${shown} ${unit}. Suggested: a little more.`
  } else if (lb >= 0.8 && platePct >= 55) {
    move = 'heavy'
    why = `Weight climbed ${shown} ${unit}. Suggested: ease off.`
  } else if (lb >= 0.8 && platePct < 55) {
    move = 'right'
    why = `Weight climbed ${shown} ${unit}, but plates were light. Suggested: stay.`
  } else {
    move = 'right'
    why = dir === 'flat'
      ? 'Weight held. Suggested: stay.'
      : `Weight moved ${shown} ${unit}. Suggested: stay.`
  }

  return pack({ move, why, last, prev, platePct, thin: false, goalId, lb })
}

function pack(row) {
  const label = {
    hungry: 'a little more',
    right: 'stay',
    heavy: 'ease off',
  }[row.move]
  return { ...row, label }
}
