// Fails if any App Store field in STORE.md is over its limit, or if the
// "(n / limit)" heading limit is wrong. A stale count only warns.
import { readFileSync } from 'node:fs'

const FIELDS = [
  { heading: 'Name', limit: 30 },
  { heading: 'Subtitle', limit: 30 },
  { heading: 'Promotional text', limit: 170 },
  { heading: 'Description', limit: 4000 },
  { heading: 'Keywords', limit: 100, bytes: true },
]
// Lines in a section that are notes, not listing text.
const NOTE = /^(Alternate if taken:|- |Matches the )/

const file = process.argv[2] || new URL('../STORE.md', import.meta.url)
const md = readFileSync(file, 'utf8')
const sections = {}
let current = null
for (const line of md.split('\n')) {
  const h = line.match(/^## (.+?)\s*(?:\((\d+)\s*\/\s*(\d+)\))?\s*$/)
  if (h) {
    current = h[1].trim()
    sections[current] = { claimed: h[2] && Number(h[2]), claimedLimit: h[3] && Number(h[3]), lines: [] }
  } else if (current) {
    sections[current].lines.push(line)
  }
}

function fieldText(lines, multi) {
  const body = []
  for (const line of lines) {
    if (NOTE.test(line.trim())) break
    body.push(line)
  }
  const text = body.join('\n').trim()
  return multi ? text : text.split('\n')[0].trim()
}

const errors = []
const warnings = []
for (const f of FIELDS) {
  const s = sections[f.heading]
  if (!s) { errors.push(`${f.heading}: section missing`); continue }
  const text = fieldText(s.lines, f.heading === 'Description')
  const n = f.bytes ? Buffer.byteLength(text, 'utf8') : [...text].length
  const unit = f.bytes ? 'bytes' : 'chars'
  const status = n > f.limit ? 'OVER' : 'ok'
  console.log(`${status.padEnd(4)} ${f.heading}: ${n} / ${f.limit} ${unit}`)
  if (!text) errors.push(`${f.heading}: empty`)
  if (n > f.limit) errors.push(`${f.heading}: ${n} ${unit}, limit ${f.limit}`)
  if (s.claimedLimit && s.claimedLimit !== f.limit) errors.push(`${f.heading}: heading says limit ${s.claimedLimit}, real limit ${f.limit}`)
  if (s.claimed != null && s.claimed !== n) warnings.push(`${f.heading}: heading says ${s.claimed}, counted ${n}`)
}

if (warnings.length) console.warn('\nwarning (not blocking):\n- ' + warnings.join('\n- '))
if (errors.length) {
  console.error('\nSTORE.md check failed:\n- ' + errors.join('\n- '))
  process.exit(1)
}
console.log('STORE.md within App Store limits.')
