import { $, $$ } from './lib.js'
import { MYTHS } from './data.js'

/** Cartões que viram ao toque: o mito na frente, a resposta atrás. */
export function initMyths() {
  const host = $('#myths')
  host.innerHTML = MYTHS.map((m, i) => `
    <button type="button" class="flip" aria-pressed="false" aria-label="Mito ${i + 1} de ${MYTHS.length}: ${m.myth} Toque para ver a resposta.">
      <span class="flip-in">
        <span class="flip-face flip-front">
          <span class="text-[0.95rem] font-semibold opacity-60">O que prometem</span>
          <span class="display block text-[clamp(2.2rem,8.4vw,3rem)]"><span class="strike-line">${m.myth}</span></span>
          <span class="text-[0.95rem] font-semibold">Toque para virar ↻</span>
        </span>
        <span class="flip-face flip-back" aria-hidden="true">
          <span class="text-[0.95rem] font-semibold opacity-70">Na prática</span>
          <span class="block text-[clamp(1.35rem,5vw,1.65rem)] font-bold leading-[1.15]">${m.truth}</span>
          <span class="text-[0.95rem] font-semibold">${i + 1} de ${MYTHS.length}</span>
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
