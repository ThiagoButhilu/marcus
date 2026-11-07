import { $, $$ } from './lib.js'
import { STEPS } from './data.js'

/** Ficha do método: a linha que cruza o meio da tela acende em preto. Passar o mouse também acende. */
export function initMethod() {
  const host = $('#ficha')
  host.innerHTML = STEPS.map((s, i) => `
    <div class="ficha-row">
      <span class="ficha-n">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="display text-[clamp(2rem,7vw,5.2rem)] [overflow-wrap:anywhere]">${s.name}</h3>
      <p class="max-w-[30rem] text-[1.08rem] leading-snug md:text-[1.15rem]">${s.text}</p>
    </div>`).join('')

  const rows = $$('.ficha-row', host)
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => e.target.toggleAttribute('data-on', e.isIntersecting))
  }, { rootMargin: '-42% 0px -42% 0px' })
  rows.forEach((r) => io.observe(r))
}
