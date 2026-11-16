import { $, $$ } from './lib.js'
import { REASONS } from './data.js'
import { UI } from './i18n.js'

/** Cartões que viram ao toque: o que você vive hoje na frente, o que o treino muda atrás. */
export function initMyths() {
  const host = $('#myths')
  host.innerHTML = REASONS.map((m, i) => `
    <button type="button" class="flip" aria-pressed="false" aria-label="${UI.reasons.aria(i + 1, REASONS.length, m.now)}">
      <span class="flip-in">
        <span class="flip-face flip-front">
          <span class="text-[0.95rem] font-semibold opacity-60">${UI.reasons.now}</span>
          <span class="display block text-[clamp(2.2rem,8.4vw,3rem)]"><span class="strike-line">${m.now}</span></span>
          <span class="text-[0.95rem] font-semibold">${UI.reasons.flip}</span>
        </span>
        <span class="flip-face flip-back" aria-hidden="true">
          <span class="text-[0.95rem] font-semibold opacity-70">${UI.reasons.gain}</span>
          <span class="block text-[clamp(1.35rem,5vw,1.65rem)] font-bold leading-[1.15]">${m.gain}</span>
          <span class="text-[0.95rem] font-semibold">${UI.reasons.count(i + 1, REASONS.length)}</span>
        </span>
      </span>
    </button>`).join('') + '<span class="w-1 shrink-0 md:w-8" aria-hidden="true"></span>'

  host.addEventListener('click', (e) => {
    const card = e.target.closest('.flip')
    if (!card) return
    const on = card.getAttribute('aria-pressed') !== 'true'
    card.setAttribute('aria-pressed', String(on))
    $('.flip-front', card).setAttribute('aria-hidden', String(on))
    $('.flip-back', card).setAttribute('aria-hidden', String(!on))
  })

  const step = (dir) => {
    const w = $('.flip', host).offsetWidth + 16
    host.scrollBy({ left: dir * w, behavior: 'smooth' })
  }
  $('#myth-prev').addEventListener('click', () => step(-1))
  $('#myth-next').addEventListener('click', () => step(1))
}
