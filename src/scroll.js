export function scrollAnchorToTop(id) {
  if (!id || typeof window === 'undefined') return
  const run = () => {
    const el = document.querySelector(`[data-anchor="${id}"]`)
    if (!el) return
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur()
    el.scrollIntoView({ block: 'start', behavior: 'instant' })
    const y = el.getBoundingClientRect().top + window.pageYOffset - 12
    window.scrollTo(0, Math.max(0, y))
  }
  run()
  setTimeout(run, 50)
  setTimeout(run, 150)
  setTimeout(run, 350)
}
