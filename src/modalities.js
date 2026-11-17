import { scroll } from 'motion'
import { $, $$, clamp } from './lib.js'
import { MODS } from './data.js'
import { UI } from './i18n.js'

/*
  Um painel por pilar, lado a lado, cada um com uma foto do Marcus. A rolagem vertical da seção empurra a trilha para o lado:
  a seção tem n * 100svh de altura e o palco fica preso no topo.
*/
export function initModalities() {
  const n = MODS.length
  const sec = $('#treinos'), stage = $('#treinos-stage'), track = $('#track'), bar = $('#treinos-bar'), dots = $('#treinos-dots')
  sec.style.height = `${n * 100}svh`
  track.style.width = `${n * 100}%`
  track.style.setProperty('--w', `${100 / n}%`)

  track.innerHTML = MODS.map((m, i) => `
    <article class="panel" data-nav="${m.tone}" style="--card:${m.bg};--cardfg:${m.fg}" aria-label="${m.title}">
      <div class="mx-auto grid h-full max-w-[110rem] grid-rows-[minmax(0,1fr)_auto] gap-4 px-4 pb-24 pt-[8.4rem] md:grid-cols-[1.05fr_1fr] md:grid-rows-none md:items-center md:gap-10 md:px-8 md:pb-16 md:pt-28">
        <div class="panel-art grid min-h-0 place-items-center">
          <img src="${m.photo}" alt="${m.alt}" class="h-full max-h-[26rem] w-full rounded-[1.75rem] object-cover md:max-h-[34rem]" style="object-position:${m.pos}" loading="lazy" draggable="false" />
        </div>
        <div class="panel-copy">
          <h3 class="display text-[clamp(2.6rem,5.8vw,7.6rem)]">${m.title}</h3>
          <p class="mt-3 text-[1.25rem] font-bold leading-tight md:text-[1.6rem]">${m.line}</p>
          <p class="mt-3 hidden max-w-[30rem] text-[1.05rem] leading-relaxed opacity-85 sm:block">${m.text}</p>
          <div class="mt-5 flex flex-wrap items-center gap-2">
            ${m.tags.map((t) => `<span class="tag max-sm:hidden">${t}</span>`).join('')}
            <a href="#contato" data-prefill="${UI.pillars.prefill(m.title)}" class="btn" style="background:${m.fg};color:${m.bg}">${UI.pillars.cta} <i data-arr></i></a>
          </div>
        </div>
      </div>
    </article>`).join('')

  dots.innerHTML = MODS.map((m, i) => `<button type="button" class="dotnav" aria-label="${UI.pillars.goTo(m.title)}" aria-current="false"></button>`).join('')
  const panels = $$('.panel', track), arts = $$('.panel-art', track), copies = $$('.panel-copy', track), dotEls = $$('.dotnav', dots)

  dotEls.forEach((d, i) => d.addEventListener('click', () => scrollTo({ top: sec.offsetTop + i * innerHeight, behavior: 'smooth' })))

  let W = stage.clientWidth, active = -1
  addEventListener('resize', () => { W = stage.clientWidth })

  scroll((p) => {
    const f = p * (n - 1)
    track.style.transform = `translate3d(${(-f * W).toFixed(1)}px,0,0)`
    // as camadas andam em velocidades diferentes: dá profundidade ao deslize
    panels.forEach((_, i) => {
      const d = clamp(i - f, -1, 1)
      arts[i].style.transform = `translate3d(${(d * 90).toFixed(1)}px,0,0)`
      copies[i].style.transform = `translate3d(${(d * 40).toFixed(1)}px,0,0)`
    })
    const a = Math.round(f)
    if (a !== active) {
      active = a
      panels.forEach((el, i) => el.toggleAttribute('data-active', i === a))
      dotEls.forEach((d, i) => d.setAttribute('aria-current', String(i === a)))
      bar.style.color = MODS[a].fg
    }
  }, { target: sec, offset: ['start start', 'end end'] })
}
