import { animate, scroll, stagger } from 'motion'
import { $, $$, clamp, lerp, smooth, reduced, profile } from './lib.js'

/*
  Herói: o título "treino sem atalhos" estica de condensado para expandido enquanto a página sobe.
  Atrás dele, um perfil de altimetria se desenha (como o de uma subida de pedal) com o ciclista na ponta.
  No fim, um "atalho" em linha reta aparece e é riscado.
*/
const W0 = 64 // largura inicial da fonte (condensada)
const W1 = 125 // largura final (expandida)
const DESKTOP = matchMedia('(min-width: 768px)')

export function initHero() {
  const sec = $('#top'), stage = $('#stage'), h1 = $('#h1'), base = $('#hero-base')
  const copy = $('#hero-copy'), hint = $('#hint'), wrap = $('#climb-wrap'), svg = $('#climb'), tag = $('#rider-tag')

  let fits = [], nat = [], boxW = 0, budget = 0, p = reduced ? 1 : 0
  let W = 0, H = 0, baseY = 0, topY = 0
  let el = {}

  const rows = () => (DESKTOP.matches
    ? [['TREINO', 'SEM'], ['ATALHOS.']]
    : [['TREINO'], ['SEM'], ['ATALHOS.']])

  const buildTitle = () => {
    h1.innerHTML = rows().map((words) => {
      const inner = words.map((w) => (w === 'SEM' ? `<span class="hollow">${w}</span>` : w)).join('&nbsp;')
      return `<span class="fit line hero-title" aria-hidden="true"><span class="line-in">${inner}</span></span>`
    }).join('')
    fits = $$('.fit', h1)
  }

  // largura natural de cada linha a 100px, nas duas pontas do eixo de largura
  const measure = () => {
    boxW = h1.clientWidth
    nat = fits.map((f) => {
      const t = $('.line-in', f)
      const at = (wd) => {
        f.style.fontSize = '100px'
        f.style.fontVariationSettings = `"wdth" ${wd}`
        return t.getBoundingClientRect().width
      }
      return [at(W0), at(W1)]
    })
    const top = h1.getBoundingClientRect().top - stage.getBoundingClientRect().top
    budget = stage.clientHeight - top - base.offsetHeight - 18
  }

  const buildClimb = () => {
    W = wrap.clientWidth; H = wrap.clientHeight
    if (!W || !H) return
    topY = 34; baseY = H - 18
    const X = (t) => t * W
    const Y = (t) => baseY - profile(t) * (baseY - topY)
    const pts = Array.from({ length: 90 }, (_, i) => { const t = i / 89; return `${X(t).toFixed(1)} ${Y(t).toFixed(1)}` })
    const d = `M${pts.join('L')}`
    const ticks = Array.from({ length: 12 }, (_, i) => `M${X(i / 11).toFixed(1)} ${baseY + 6}v7`).join('')
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
    svg.innerHTML = `
      <defs>
        <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M1.5 0V9" stroke="currentColor" stroke-opacity=".2" stroke-width="2.4"/></pattern>
        <clipPath id="clip-a"><rect id="clip-a-r" x="0" y="0" width="0" height="${H}"/></clipPath>
        <clipPath id="clip-s"><rect id="clip-s-r" x="0" y="0" width="0" height="${H}"/></clipPath>
      </defs>
      <path d="${d}L${W} ${baseY}L0 ${baseY}Z" fill="url(#hatch)" clip-path="url(#clip-a)"/>
      <path d="${d}" fill="none" stroke="currentColor" stroke-opacity=".22" stroke-width="2"/>
      <path d="M0 ${baseY + 6}H${W}${ticks}" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="1.5"/>
      <path id="shortcut" d="M0 ${Y(0).toFixed(1)}L${W} ${Y(1).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="7 9" stroke-linecap="round" clip-path="url(#clip-s)"/>
      <path id="line" d="${d}" pathLength="1" fill="none" stroke="var(--hot)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1" stroke-dashoffset="1"/>
      <g id="x" opacity="0" transform="translate(${W / 2} ${((Y(0) + Y(1)) / 2).toFixed(1)})">
        <circle r="17" fill="var(--bg)"/>
        <path d="M-9 -9L9 9M9 -9L-9 9" stroke="var(--hot)" stroke-width="4.5" stroke-linecap="round"/>
      </g>
      <text id="sc-t" opacity="0" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor" stroke="var(--bg)" stroke-width="6" paint-order="stroke" x="${W / 2}" y="${((Y(0) + Y(1)) / 2 - 28).toFixed(1)}">atalho</text>
      <g id="rider"><circle r="17" fill="var(--hot)" fill-opacity=".25"/><circle r="7.5" fill="var(--hot)" stroke="var(--bg)" stroke-width="3.5"/></g>`
    el = { clipA: $('#clip-a-r', svg), clipS: $('#clip-s-r', svg), line: $('#line', svg), rider: $('#rider', svg), x: $('#x', svg), t: $('#sc-t', svg) }
    el.Y = Y
  }

  const apply = (v) => {
    p = v
    const q = clamp(v / 0.8)
    const wd = lerp(W0, W1, smooth(q))
    const k = (wd - W0) / (W1 - W0)

    // título: cada linha preenche a largura; se faltar altura, todas encolhem juntas
    const sizes = fits.map((_, i) => (boxW / lerp(nat[i][0], nat[i][1], k)) * 100 * 0.995)
    const total = sizes.reduce((a, s) => a + s * 0.86, 0)
    const fit = Math.min(1, budget / total)
    fits.forEach((f, i) => {
      f.style.fontSize = `${(sizes[i] * fit).toFixed(2)}px`
      f.style.fontVariationSettings = `"wdth" ${wd.toFixed(1)}`
    })

    // subida
    if (el.line) {
      const x = q * W, y = el.Y(q)
      el.line.style.strokeDashoffset = (1 - q).toFixed(4)
      el.clipA.setAttribute('width', x.toFixed(1))
      el.rider.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`)
      const tw = tag.offsetWidth
      tag.style.transform = `translate(${clamp(x - tw / 2, 0, W - tw).toFixed(1)}px, ${(y - 52).toFixed(1)}px)`
      tag.textContent = `Semana ${Math.round(1 + 11 * q)}`

      const s = clamp((v - 0.8) / 0.2)
      el.clipS.setAttribute('width', (W * clamp(s / 0.5)).toFixed(1))
      const mark = clamp((s - 0.55) / 0.2)
      el.x.setAttribute('opacity', mark.toFixed(2))
      el.x.setAttribute('transform', `translate(${W / 2} ${((el.Y(0) + el.Y(1)) / 2).toFixed(1)}) scale(${(0.6 + 0.4 * mark).toFixed(2)})`)
      el.t.setAttribute('opacity', clamp(s / 0.3).toFixed(2))
      el.t.textContent = s > 0.6 ? 'atalho: não existe' : 'atalho'
    }

    const r = smooth(clamp((v - 0.42) / 0.3))
    copy.style.opacity = r.toFixed(3)
    copy.style.transform = `translateY(${((1 - r) * 18).toFixed(1)}px)`
    copy.inert = r < 0.25
    hint.style.opacity = (0.7 * (1 - clamp(v / 0.05))).toFixed(2)
  }

  const layout = () => {
    buildTitle(); measure(); buildClimb(); apply(p)
  }

  const start = () => {
    layout()
    if (reduced) return
    scroll(apply, { target: sec, offset: ['start start', 'end end'] })
    animate($$('.line-in', h1), { transform: ['translateY(108%)', 'translateY(0%)'] }, { duration: 1.1, delay: stagger(0.1), ease: [0.16, 1, 0.3, 1] })
    animate('[data-intro]', { opacity: [0, 0.7], transform: ['translateY(10px)', 'translateY(0px)'] }, { duration: 0.9, ease: [0.16, 1, 0.3, 1] })
  }

  // fonte variável precisa estar pronta para medir a largura certa
  document.fonts.load('800 100px Archivo', 'TREINO').then(() => document.fonts.ready).then(start, start)

  let lastW = innerWidth, lastH = innerHeight
  addEventListener('resize', () => {
    // barra de endereço do celular muda só a altura: ignora para não reconstruir à toa
    if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 120) return
    lastW = innerWidth; lastH = innerHeight
    layout()
    if (!reduced) animate($$('.line-in', h1), { transform: 'translateY(0%)' }, { duration: 0 })
  })
}
