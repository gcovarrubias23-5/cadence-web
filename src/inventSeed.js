export function seedFrom(initial, defaultSlot) {
  return {
    name: initial?.name || '',
    slot: initial?.slot && initial.slot !== 'snack' ? initial.slot : (defaultSlot || 'lunch'),
    lines: initial?.foods || [],
    id: initial?.id || '',
  }
}
