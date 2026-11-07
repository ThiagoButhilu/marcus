import { $, clamp, frame, profile } from './lib.js'

/*
  Barra de altimetria: a subida do herói vira o mapa da página.
  O ponto mostra onde você está; toque num marco para ir até a seção ou arraste para percorrer a página.
*/
const STOPS = [['#top', 'Início'], ['#mitos', 'Mitos'], ['#variaveis', 'Variáveis'], ['#treinos', 'Treinos'], ['#metodo', 'Método'], ['#marcus', 'Marcus'], ['#contato', 'Avaliação']]
const PAD = 22

export function initAltimetry() {
  const dock = $('#dock'), box = $('#alt'), svg = $('#alt-svg'), label = $('#alt-label'), hero = $('#top')
  let W = 0, H = 0, max = 1, stops = [], active = -1
  let line, rider

  const X = (t) => PAD + t * (W - 2 * PAD)
  const Y = (t) => H - 12 - profile(t) * (H - 30)

  const measure = () => {
    max = Math.max(1, document.documentElement.scrollHeight - innerHeight)
    stops = STOPS.map(([sel, name]) => {
      const el = $(sel)
      // 64 = scroll-padding-top do html: é onde a âncora para
      return { el, name, t: clamp((el.getBoundingClientRect().top + scrollY - 64) / max) }
    })
  }

  const build = () => {
    W = box.clientWidth; H = box.clientHeight
    if (!W) return
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
    const pts = Array.from({ length: 70 }, (_, i) => { const t = i / 69; return `${X(t).toFixed(1)} ${Y(t).toFixed(1)}` })
    const d = `M${pts.join('L')}`
    const dots = stops.map((s) => `<circle cx="${X(s.t).toFixed(1)}" cy="${Y(s.t).toFixed(1)}" r="3.2" fill="currentColor"/>`).join('')
    svg.innerHTML = `
      <path d="${d}" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="2.5" stroke-linecap="round"/>
      <path id="alt-line" d="${d}" pathLength="1" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/>
      ${dots}
      <g id="alt-rider"><circle r="7.5" fill="#ff5a36" stroke="#0e1011" stroke-width="3"/></g>`
    line = $('#alt-line', svg); rider = $('#alt-rider', svg)
  }

  const update = () => {
    if (!line) return
    const p = clamp(scrollY / max)
    line.style.strokeDashoffset = (1 - p).toFixed(4)
    rider.setAttribute('transform', `translate(${X(p).toFixed(1)} ${Y(p).toFixed(1)})`)
    box.setAttribute('aria-valuenow', String(Math.round(p * 100)))
    let i = 0
    stops.forEach((s, n) => { if (s.t <= p + 0.004) i = n })
    if (i !== active) { active = i; label.textContent = stops[i].name }
    // aparece quando o herói começa a sair da tela
    dock.toggleAttribute('data-show', scrollY > hero.offsetHeight - innerHeight * 0.95)
  }
  const onScroll = frame(update)

  const refresh = () => { measure(); build(); update() }
  document.fonts.ready.then(refresh)
  new ResizeObserver(frame(refresh)).observe(document.body)
  addEventListener('scroll', onScroll, { passive: true })

  // arrastar percorre a página; tocar num marco leva à seção
  let drag = false, moved = false, sx = 0
  const tAt = (e) => clamp((e.clientX - box.getBoundingClientRect().left - PAD) / (W - 2 * PAD))
  box.addEventListener('pointerdown', (e) => {
    drag = true; moved = false; sx = e.clientX
    try { box.setPointerCapture(e.pointerId) } catch {}
    measure()
  })
  box.addEventListener('pointermove', (e) => {
    if (!drag) return
    if (Math.abs(e.clientX - sx) > 4) moved = true
    if (moved) scrollTo({ top: tAt(e) * max, behavior: 'instant' })
  })
  const end = (e) => {
    if (!drag) return
    drag = false
    if (moved || e.type === 'pointercancel') return
    const t = tAt(e)
    const near = stops.reduce((a, s) => (Math.abs(s.t - t) < Math.abs(a.t - t) ? s : a))
    if (Math.abs(near.t - t) < 0.05) near.el.scrollIntoView({ behavior: 'smooth' })
    else scrollTo({ top: t * max, behavior: 'smooth' })
  }
  box.addEventListener('pointerup', end)
  box.addEventListener('pointercancel', end)

  box.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 0.05, ArrowUp: 0.05, ArrowLeft: -0.05, ArrowDown: -0.05 }[e.key]
    if (step === undefined && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    const to = e.key === 'Home' ? 0 : e.key === 'End' ? max : scrollY + step * max
    scrollTo({ top: clamp(to, 0, max), behavior: 'instant' })
  })
}
