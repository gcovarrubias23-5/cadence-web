export function scrollAnchorToTop(id) {
  if (!id || typeof window === 'undefined') return
  const el = document.querySelector(`[data-anchor="${id}"]`)
  if (!el) return
  if (document.activeElement && document.activeElement.blur) {
    document.activeElement.blur()
  }
  const y = el.getBoundingClientRect().top + window.pageYOffset - 8
  window.scrollTo(0, Math.max(0, y))
  requestAnimationFrame(() => {
    const y2 = el.getBoundingClientRect().top + window.pageYOffset - 8
    window.scrollTo(0, Math.max(0, y2))
  })
}
