import { describe, it, expect } from 'vitest'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SRC = new URL('../src/', import.meta.url).pathname

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? files(p) : [p]
  })
}

describe('src files', () => {
  it('has no empty files', () => {
    const empty = files(SRC).filter((p) => statSync(p).size === 0).map((p) => p.slice(SRC.length))
    expect(empty).toEqual([])
  })

  it('has no stray notes or patch files', () => {
    const stray = files(SRC).filter((p) => /\.(md|patch|diff|orig|rej)$/i.test(p)).map((p) => p.slice(SRC.length))
    expect(stray).toEqual([])
  })
})
