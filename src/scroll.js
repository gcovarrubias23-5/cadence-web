export function scrollAnchorToTop(id) {
  if (!id) return
  const el = document.querySelector(`[data-anchor="${id}"]`)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 12
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
