import { archiveWeek } from './weekHistory.js'

export function closeWeek(stats, move) {
  archiveWeek(stats, move)
  return { eaten: {}, water: {} }
}
