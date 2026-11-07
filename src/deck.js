import { $, $$ } from './lib.js'
import { SITE } from './data.js'

/*
  Baralho: os cinco assuntos recentes do perfil, refeitos como capas tipográficas (não são as fotos dele).
  Arraste o cartão de cima para o lado e ele vai para o fim do baralho.
  Para usar as imagens reais, troque o conteúdo de cada cartão por um <img>.
*/
const TILES = [
  `<div class="flex h-full flex-col justify-between bg-tinta p-[7cqw] text-gelo">
     <p class="text-[5.4cqw] font-semibold opacity-80">Será que você</p>
     <p class="display text-[30cqw]">Treina?</p>
     <p class="text-[5.2cqw] opacity-75">Conheça as variáveis do seu treino.</p>
   </div>`,
  `<div class="flex h-full flex-col justify-between bg-coral p-[7cqw] text-tinta">
     <p class="display text-[46cqw]">HIIT</p>
     <p class="text-[6cqw] font-bold leading-tight">High-intensity interval training: da teoria à prática.</p>
   </div>`,
  `<div class="flex h-full flex-col justify-between bg-gelo p-[7cqw] text-tinta">
     <div class="flex justify-between text-[4.6cqw] font-semibold"><span>Marcus Thomaz</span><span class="tabular-nums">01 / 07</span></div>
     <p class="display text-[21cqw]">Treino sem atalhos</p>
   </div>`,
  `<div class="relative flex h-full flex-col justify-between overflow-hidden bg-mata p-[7cqw] text-gelo">
     <svg viewBox="0 0 400 260" class="absolute inset-x-0 top-[6cqw] w-full" fill="none" stroke="#ffb23e" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
       <circle cx="104" cy="170" r="64"/><circle cx="296" cy="170" r="64"/><path d="M104 170L156 80L244 80L296 170M156 80L196 170L244 80M196 170H104M244 80L234 56H262"/>
     </svg>
     <span></span>
     <p class="display text-[16cqw]">Pedal também é treino</p>
   </div>`,
  `<div class="flex h-full flex-col justify-between bg-white p-[7cqw] text-tinta">
     <span class="display text-[16cqw] text-coral">MT</span>
     <p class="display text-[19cqw]">Disciplina e saúde.</p>
   </div>`,
]

export function initDeck() {
  const url = `https://instagram.com/${SITE.instagram}`
  $('#ig-follow').href = url

  const host = $('#deck'), n = TILES.length
  host.innerHTML = TILES.map((t, i) => `<div class="deck-card" data-i="${i}">${t}</div>`).join('')
  const els = $$('.deck-card', host)
  let order = els.map((_, i) => i)
  let busy = false

  const place = (el, d) => {
    el.style.zIndex = n - d
    el.style.opacity = d > 3 ? 0 : 1
    el.style.transform = `translate(${d * 13}px, ${d * 11}px) scale(${1 - d * 0.045}) rotate(${d ? (d % 2 ? 1 : -1) * d * 1.1 : 0}deg)`
  }
  const layout = () => order.forEach((idx, d) => place(els[idx], d))
  layout()

  const fling = (dir) => {
    if (busy) return
    busy = true
    const top = els[order[0]]
    top.classList.remove('dragging')
    top.style.transform = `translate(${dir * innerWidth * 0.8}px, 50px) rotate(${dir * 26}deg)`
    top.style.opacity = 0
    setTimeout(() => {
      order.push(order.shift())
      top.classList.add('snap')
      place(top, n - 1)
      void top.offsetWidth // aplica sem animação antes de voltar a animar
      top.classList.remove('snap')
      layout()
      busy = false
    }, 400)
  }

  let drag = null
  host.addEventListener('pointerdown', (e) => {
    const card = e.target.closest('.deck-card')
    if (!card || busy || card !== els[order[0]]) return
    drag = { card, x: e.clientX, t: performance.now(), dx: 0 }
    card.classList.add('dragging')
    try { card.setPointerCapture(e.pointerId) } catch {}
  })
  host.addEventListener('pointermove', (e) => {
    if (!drag) return
    drag.dx = e.clientX - drag.x
    drag.card.style.transform = `translate(${drag.dx}px, ${Math.abs(drag.dx) * 0.12}px) rotate(${drag.dx * 0.06}deg)`
  })
  const end = () => {
    if (!drag) return
    const { card, dx, t } = drag
    drag = null
    card.classList.remove('dragging')
    const v = Math.abs(dx) / (performance.now() - t)
    if (Math.abs(dx) > 90 || (Math.abs(dx) > 30 && v > 0.6)) fling(Math.sign(dx))
    else place(card, 0)
  }
  host.addEventListener('pointerup', end)
  host.addEventListener('pointercancel', end)

  host.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); fling(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); fling(-1) }
  })
  $('#deck-next').addEventListener('click', () => fling(-1))
}
