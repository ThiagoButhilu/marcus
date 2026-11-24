import { scroll } from 'motion'
import { $, reduced } from './lib.js'
import { SITE } from './data.js'
import { UI } from './i18n.js'
import marca from './assets/marca.png'

/** Roda de bicicleta que gira com o scroll, com o logo (ou a foto do Marcus, se houver) no centro. */
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
  wheel.setAttribute('aria-label', SITE.photo ? UI.wheel.photo : UI.wheel.logo)
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
}
