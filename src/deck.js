import { $, $$ } from './lib.js'
import { SITE } from './data.js'
import postSaude from './assets/post-saude-desculpas.webp'
import postEnergia from './assets/post-energia.webp'
import postHabitos from './assets/post-habitos.webp'
import logoClaro from './assets/logo-claro.png'
import fotoPedal from './assets/foto-pedal.webp'
import fotoSubida from './assets/foto-subida.webp'

/*
  Baralho: posts do perfil (os banners do mídia kit) intercalados com fotos do Marcus.
  Arraste o cartão de cima para o lado e ele vai para o fim do baralho.
  Para trocar um post, coloque a imagem 4:5 em src/assets e importe aqui.
*/
const post = (src, alt) => `<img src="${src}" alt="${alt}" class="size-full object-cover" draggable="false" />`

const TILES = [
  post(postSaude, 'Post do Instagram: mais saúde, menos desculpas. Você tem dado a devida atenção à sua saúde?'),
  `<div class="relative h-full bg-tinta text-gelo">
     <img src="${fotoPedal}" alt="Marcus Thomaz pedalando numa estrada" class="absolute inset-0 size-full object-cover" draggable="false" />
     <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-tinta/85 via-tinta/30 to-transparent p-[7cqw]">
       <p class="sub text-[5.6cqw] opacity-85">Será que você</p>
       <p class="display text-[18cqw]">Treina?</p>
       <p class="mt-[2cqw] text-[5.2cqw] opacity-85">Conheça as variáveis do seu treino.</p>
     </div>
   </div>`,
  post(postEnergia, 'Post do Instagram: energia, disposição e saúde. É isso que você merece todos os dias.'),
  post(postHabitos, 'Post do Instagram: seu corpo é o reflexo dos seus hábitos. O que ele está dizendo sobre você hoje?'),
  `<div class="relative h-full bg-petroleo text-gelo">
     <img src="${fotoSubida}" alt="Marcus Thomaz subindo uma ladeira de bicicleta" class="absolute inset-0 size-full object-cover" draggable="false" />
     <div class="absolute inset-0 flex flex-col gap-[6cqw] bg-gradient-to-b from-petroleo/90 via-petroleo/45 to-transparent p-[7cqw]">
       <img src="${logoClaro}" alt="Marcus Thomaz, personal trainer" class="w-[48%]" draggable="false" />
       <p class="display text-[11.5cqw]">Compromisso com o seu resultado.</p>
     </div>
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
