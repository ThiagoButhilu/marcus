import { animate, scroll } from 'motion'
import { $, reduced } from './lib.js'
import { SITE, FORMATS } from './data.js'
import marca from './assets/marca.png'

/** Roda de bicicleta que gira com o scroll, com o logo (ou a foto do Marcus, se houver) no centro, e o seletor presencial/online. */
export function initMarcus() {
  const wheel = $('#wheel')
  const spokes = Array.from({ length: 32 }, (_, i) => {
    const a = (i / 32) * Math.PI * 2
    return `M${(200 + Math.cos(a) * 62).toFixed(1)} ${(200 + Math.sin(a) * 62).toFixed(1)}L${(200 + Math.cos(a) * 168).toFixed(1)} ${(200 + Math.sin(a) * 168).toFixed(1)}`
  }).join('')
  const hub = SITE.photo
    ? `<clipPath id="face"><circle cx="200" cy="200" r="118"/></clipPath>
       <circle cx="200" cy="200" r="123" fill="#274c5f" stroke="#98b7ba" stroke-width="5"/>
       <image href="${import.meta.env.BASE_URL}${SITE.photo}" x="82" y="82" width="236" height="236" preserveAspectRatio="xMidYMid slice" clip-path="url(#face)"/>`
    : `<circle cx="200" cy="200" r="62" fill="#98b7ba"/>
       <image href="${marca}" x="152" y="176.4" width="96" height="47.2"/>`
  wheel.setAttribute('aria-label', SITE.photo ? 'Foto do Marcus Thomaz no centro de uma roda de bicicleta' : 'Roda de bicicleta com o logo MT no centro')
  wheel.innerHTML = `
    <g id="spin" style="transform-origin:200px 200px">
      <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" stroke-width="16" stroke-dasharray="3 14" opacity=".35"/>
      <circle cx="200" cy="200" r="182" fill="none" stroke="currentColor" stroke-width="8"/>
      <circle cx="200" cy="200" r="168" fill="none" stroke="currentColor" stroke-width="3" opacity=".6"/>
      <path d="${spokes}" stroke="currentColor" stroke-width="1.6" opacity=".7"/>
    </g>${hub}`

  if (!reduced) {
    const spin = $('#spin', wheel)
    scroll((p) => { spin.style.transform = `rotate(${(p * 540).toFixed(1)}deg)` }, { target: $('#marcus'), offset: ['start end', 'end start'] })
  }

  // presencial / online
  const panel = $('#format-panel'), ind = $('#seg-ind')
  const tabs = ['presencial', 'online'].map((k) => $(`#tab-${k}`))
  const show = (k, animateIt) => {
    tabs.forEach((t) => { const on = t.dataset.k === k; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1 })
    ind.style.transform = `translateX(${k === 'online' ? 100 : 0}%)`
    panel.setAttribute('aria-labelledby', `tab-${k}`)
    const f = FORMATS[k]
    panel.innerHTML = `
      <p class="display text-[clamp(2.2rem,5vw,3.6rem)]">${f.title}</p>
      <ul class="mt-5 grid gap-3">${f.items.map((i) => `<li class="flex gap-3 text-[1.08rem] leading-snug"><span class="mt-[0.55em] size-2.5 shrink-0 rounded-full bg-bruma" aria-hidden="true"></span>${i}</li>`).join('')}</ul>`
    if (animateIt && !reduced) animate(panel, { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0px)'] }, { duration: 0.6, ease: [0.16, 1, 0.3, 1] })
  }
  tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.k, true)))
  $('.seg').addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    const next = tabs[e.key === 'ArrowRight' ? 1 : 0]
    next.focus(); show(next.dataset.k, true)
  })
  show('presencial', false)
}
