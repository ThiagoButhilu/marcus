import { $, $$, reduced } from './lib.js'
import { SITE } from './data.js'
import { UI } from './i18n.js'
import postSaude from './assets/post-saude-desculpas.webp'
import postEnergia from './assets/post-energia.webp'
import postHabitos from './assets/post-habitos.webp'
import logoClaro from './assets/logo-claro.png'
import fotoPedal from './assets/foto-pedal.webp'
import fotoSubida from './assets/foto-subida.webp'
import fotoPb from './assets/foto-pb.webp'
import fotoCostas from './assets/foto-costas.webp'
import reelLadeira from './assets/reel-ladeira.mp4'
import reelPoster from './assets/reel-ladeira.jpg'

/*
  Baralho: posts do perfil (os banners do mídia kit) intercalados com fotos e um vídeo do Marcus.
  Arraste o cartão de cima para o lado e ele vai para o fim do baralho.
  O vídeo toca mudo, em loop, só enquanto o baralho está na tela (com movimento reduzido, fica parado).
  Para trocar um post, coloque a imagem 4:5 em src/assets e importe aqui.
*/
const post = (src, alt) => `<img src="${src}" alt="${alt}" class="size-full object-cover" draggable="false" />`

const TILES = [
  post(postSaude, UI.deck.postSaude),
  `<div class="relative h-full bg-tinta text-gelo">
     <video src="${reelLadeira}" poster="${reelPoster}" class="deck-reel absolute inset-0 size-full object-cover" muted loop playsinline preload="none" aria-label="${UI.deck.reelAlt}"></video>
     <div class="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-tinta/75 via-transparent to-transparent p-[7cqw]">
       <span class="sub self-start rounded-full bg-tinta/60 px-[3.4cqw] pb-[1.2cqw] pt-[1.8cqw] text-[4.4cqw]">▶ ${UI.deck.reelTag}</span>
       <p class="display text-[12cqw]">${UI.deck.reel}</p>
     </div>
   </div>`,
  `<div class="relative h-full bg-tinta text-gelo">
     <img src="${fotoPedal}" alt="${UI.deck.pedalAlt}" class="absolute inset-0 size-full object-cover" draggable="false" />
     <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-tinta/85 via-tinta/30 to-transparent p-[7cqw]">
       <p class="sub text-[5.6cqw] opacity-85">${UI.deck.askPre}</p>
       <p class="display text-[18cqw]">${UI.deck.ask}</p>
       <p class="mt-[2cqw] text-[5.2cqw] opacity-85">${UI.deck.askSub}</p>
     </div>
   </div>`,
  post(postEnergia, UI.deck.postEnergia),
  post(fotoPb, UI.deck.pbAlt),
  post(postHabitos, UI.deck.postHabitos),
  post(fotoCostas, UI.deck.costasAlt),
  `<div class="relative h-full bg-petroleo text-gelo">
     <img src="${fotoSubida}" alt="${UI.deck.subidaAlt}" class="absolute inset-0 size-full object-cover" draggable="false" />
     <div class="absolute inset-0 flex flex-col gap-[6cqw] bg-gradient-to-b from-petroleo/90 via-petroleo/45 to-transparent p-[7cqw]">
       <img src="${logoClaro}" alt="${UI.deck.logoAlt}" class="w-[48%]" draggable="false" />
       <p class="display text-[11.5cqw]">${UI.deck.promise}</p>
     </div>
   </div>`,
]

export function initDeck() {
  const url = `https://instagram.com/${SITE.instagram}`
  $('#ig-follow').href = url

  const host = $('#deck'), n = TILES.length
  host.innerHTML = TILES.map((t, i) => `<div class="deck-card" data-i="${i}">${t}</div>`).join('')
  const els = $$('.deck-card', host)

  const reel = $('.deck-reel', host)
  if (!reduced) new IntersectionObserver(([e]) => (e.isIntersecting ? reel.play().catch(() => {}) : reel.pause()), { rootMargin: '100px' }).observe(host)
  let order = els.map((_, i) => i)
  let busy = false

  const place = (el, d) => {
    el.style.zIndex = n - d
    el.toggleAttribute('data-top', d === 0)
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
