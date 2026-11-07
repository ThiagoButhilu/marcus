import { scroll } from 'motion'
import { $, $$, clamp } from './lib.js'
import { MODS } from './data.js'

/* Ilustrações de cada treino. Traço em currentColor, para herdar a cor do painel. */
const ART = {
  forca: `
    <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"><path d="M20 200H380"/></g>
    <g fill="currentColor">
      <rect x="62" y="110" width="26" height="180" rx="9"/><rect x="94" y="78" width="30" height="244" rx="10"/><rect x="130" y="124" width="20" height="152" rx="8"/>
      <rect x="250" y="124" width="20" height="152" rx="8"/><rect x="276" y="78" width="30" height="244" rx="10"/><rect x="312" y="110" width="26" height="180" rx="9"/>
    </g>
    <g fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round" opacity=".55"><path d="M40 346H360"/></g>`,
  hiit: `
    <g fill="currentColor">
      ${[70, 150, 70, 190, 70, 230, 70, 270, 70, 310].map((h, i) => `<rect class="hb" style="--k:${i}" x="${24 + i * 36}" y="${340 - h}" width="24" height="${h}" rx="${i % 2 ? 12 : 7}" opacity="${i % 2 ? 1 : 0.4}"/>`).join('')}
    </g>
    <g fill="none" stroke="currentColor" stroke-width="3" opacity=".5"><path d="M16 346H384"/></g>`,
  endurance: `
    <g fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="3 14" stroke-linecap="round" opacity=".6"><path d="M10 348H390"/></g>
    <g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="104" cy="264" r="74"/><circle cx="296" cy="264" r="74"/>
      <path d="M104 264L158 160L248 160L296 264M158 160L196 264L248 160M196 264L104 264"/>
      <path d="M248 160L236 132H268M140 150H178"/>
      <circle cx="196" cy="264" r="10" fill="currentColor"/>
    </g>
    <g fill="none" stroke="currentColor" stroke-width="2.5" opacity=".5">
      <path d="M104 190V338M30 264H178M52 212L156 316M156 212L52 316"/>
      <path d="M296 190V338M222 264H370M244 212L348 316M348 212L244 316"/>
    </g>`,
  saude: `
    <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 220H110L140 140L190 300L228 180L252 220H390"/></g>
    <g fill="currentColor" opacity=".9"><path d="M300 62a52 52 0 1 0 42 84a42 42 0 0 1-42-84Z"/></g>
    <g fill="none" stroke="currentColor" stroke-width="3" opacity=".4"><path d="M10 344H390"/></g>`,
}

/*
  Quatro painéis lado a lado. A rolagem vertical da seção empurra a trilha para o lado:
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
          <svg viewBox="0 0 400 400" class="h-full max-h-[26rem] w-full md:max-h-[34rem]" aria-hidden="true">${ART[m.key]}</svg>
        </div>
        <div class="panel-copy">
          <h3 class="display text-[clamp(3rem,8.4vw,7.6rem)]">${m.title}</h3>
          <p class="mt-3 text-[1.25rem] font-bold leading-tight md:text-[1.6rem]">${m.line}</p>
          <p class="mt-3 hidden max-w-[30rem] text-[1.05rem] leading-relaxed opacity-85 sm:block">${m.text}</p>
          <div class="mt-5 flex flex-wrap items-center gap-2">
            ${m.tags.map((t) => `<span class="tag max-sm:hidden">${t}</span>`).join('')}
            <a href="#contato" data-prefill="Vi o treino de ${m.title} no site e quero saber como funciona para o meu caso." class="btn" style="background:${m.fg};color:${m.bg}">Quero esse <i data-arr></i></a>
          </div>
        </div>
      </div>
    </article>`).join('')

  dots.innerHTML = MODS.map((m, i) => `<button type="button" class="dotnav" aria-label="Ir para ${m.title}" aria-current="false"></button>`).join('')
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
