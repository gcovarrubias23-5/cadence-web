import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const MAILTO = /href="mailto:([^"@\s]+@[^"\s]+\.[a-z]{2,})"/i
const PLACEHOLDER = /example\.(com|org)|your@|you@|placeholder|todo/i

describe.each(['public/privacy.html', 'public/support.html'])('%s', (page) => {
  const html = read(page)

  it('has a mailto contact', () => {
    expect(html).toMatch(MAILTO)
  })

  it('contact is not a placeholder', () => {
    expect(html.match(MAILTO)[1]).not.toMatch(PLACEHOLDER)
  })
})

describe('STORE.md heading counts', () => {
  it('check-store fails on a stale heading count', async () => {
    const { execFileSync } = await import('node:child_process')
    const { writeFileSync, mkdtempSync } = await import('node:fs')
    const { tmpdir } = await import('node:os')
    const { join } = await import('node:path')
    const stale = read('STORE.md').replace(/## Name \(\d+ \/ 30\)/, '## Name (8 / 30)')
    const file = join(mkdtempSync(join(tmpdir(), 'store-')), 'STORE.md')
    writeFileSync(file, stale)
    const script = new URL('../scripts/check-store.js', import.meta.url).pathname
    expect(() => execFileSync('node', [script, file], { stdio: 'pipe' })).toThrow()
    expect(() => execFileSync('node', [script], { stdio: 'pipe' })).not.toThrow()
  })
})
