import { animate } from 'motion'
import { $, clamp, reduced, frame } from './lib.js'

export function initNav() {
  const nav = $('#nav')
  const btn = $('#menu-btn')
  const menu = $('#menu')
  const label = $('#menu-label')
  const meta = document.querySelector('meta[name=theme-color]')

  let last = scrollY
  let menuOpen = false
  let tone = 'light'

  // o topo muda de cor conforme o que está atrás dele
  const readTone = () => {
    if (menuOpen) return
    const el = document.elementsFromPoint(innerWidth / 2, 36).find((e) => e.closest('[data-nav]') && !nav.contains(e))
    const t = el?.closest('[data-nav]').dataset.nav
    if (t && t !== tone) {
      tone = t
      nav.dataset.tone = t
      meta.content = t === 'dark' ? '#000000' : '#faf7f0'
    }
  }

  const onScroll = frame(() => {
    const y = scrollY
    const max = document.documentElement.scrollHeight - innerHeight
    nav.style.setProperty('--p', clamp(y / max).toFixed(4))
    const down = y > last + 4, up = y < last - 4
    if (!menuOpen) {
      if (down && y > 120) nav.style.transform = 'translateY(-110%)'
      else if (up || y < 120) nav.style.transform = ''
    }
    if (down || up) last = y
    readTone()
  })
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // menu mobile: círculo que abre a partir do botão
  const dur = reduced ? 0 : 0.7
  function toggle(open) {
    menuOpen = open
    btn.setAttribute('aria-expanded', String(open))
    label.textContent = open ? 'Fechar' : 'Menu'
    menu.setAttribute('aria-hidden', String(!open))
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) {
      nav.dataset.tone = 'dark'
      menu.classList.remove('invisible')
      nav.style.transform = ''
      animate(menu, { clipPath: ['circle(0px at calc(100% - 3rem) 2.6rem)', 'circle(150vmax at calc(100% - 3rem) 2.6rem)'] }, { duration: dur, ease: [0.16, 1, 0.3, 1] })
    } else {
      nav.dataset.tone = tone
      readTone()
      animate(menu, { clipPath: 'circle(0px at calc(100% - 3rem) 2.6rem)' }, { duration: dur * 0.7, ease: [0.16, 1, 0.3, 1] })
        .finished.then(() => !menuOpen && menu.classList.add('invisible'))
    }
  }
  btn.addEventListener('click', () => toggle(!menuOpen))
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) toggle(false) })
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) { toggle(false); btn.focus() } })
}
