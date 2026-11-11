import { $, $$, clamp } from './lib.js'
import { VARS, DAYS, VERDICTS } from './data.js'

/*
  Mesa de variáveis: quatro barras de arrastar.
  Estímulo sobe com volume, intensidade e frequência; recuperação sobe com descanso e dias livres.
  O veredito compara os dois. É ilustrativo: a dose real sai da avaliação.
*/
export function initVariables() {
  const val = Object.fromEntries(VARS.map((v) => [v.id, v.val]))
  const host = $('#faders'), hint = $('#fader-hint')
  hint.textContent = 'Arraste uma barra para mudar a dose.'

  host.innerHTML = VARS.map((v) => `
    <div class="fader" data-id="${v.id}" role="slider" tabindex="0" aria-orientation="vertical"
      aria-label="${v.name}" aria-valuemin="${v.min}" aria-valuemax="${v.max}" aria-valuenow="${v.val}">
      <div class="fader-track">
        <div class="fader-fill"></div>
        <output class="fader-thumb"></output>
      </div>
      <span class="sub text-[clamp(0.8rem,2.4vw,1.5rem)]">${v.name}</span>
    </div>`).join('')

  const chart = $('#week-chart')
  chart.innerHTML = DAYS.map((d) => `
    <div class="flex h-full flex-col gap-2 text-center">
      <div class="relative min-h-0 flex-1"><div class="bar absolute inset-x-0 bottom-0 h-full rounded-t-xl rounded-b-sm" style="transform:scaleY(.06)"></div></div>
      <span class="text-[0.8rem] font-semibold opacity-60 md:text-sm">${d}</span>
    </div>`).join('')
  const bars = $$('.bar', chart)

  const update = () => {
    const { vol, int, freq, rest } = val
    const stim = clamp(((vol / 10) * 0.5 + (int / 10) * 0.5) * (0.35 + (0.65 * freq) / 7))
    const rec = clamp((rest / 10) * 0.7 + ((7 - freq) / 6) * 0.3)
    const key = stim < 0.2 ? 'low' : stim - rec * 0.9 > 0.2 ? 'over' : rec - stim > 0.45 ? 'spare' : 'ok'

    // dias de treino espalhados pela semana
    const days = new Set(Array.from({ length: freq }, (_, k) => Math.floor(((k + 0.5) * 7) / freq)))
    const session = 0.2 + 0.8 * clamp((int / 10) * 0.55 + (vol / 10) * 0.45)
    bars.forEach((b, i) => {
      const train = days.has(i)
      b.toggleAttribute('data-rest', !train)
      b.style.transform = `scaleY(${train ? session.toFixed(3) : 0.06})`
    })
    chart.style.setProperty('--bar', key === 'over' ? '#457d93' : key === 'ok' ? '#000000' : 'rgb(0 0 0 / 0.42)')

    $('#m-stim').style.transform = `scaleX(${Math.max(stim, 0.03).toFixed(3)})`
    $('#m-rec').style.transform = `scaleX(${Math.max(rec, 0.03).toFixed(3)})`
    $('#t-stim').textContent = `${Math.round(stim * 100)}%`
    $('#t-rec').textContent = `${Math.round(rec * 100)}%`
    $('#verdict-title').textContent = VERDICTS[key].title
    $('#verdict-text').textContent = VERDICTS[key].text

    const prefill = `Brinquei com as variáveis no site: volume ${vol}/10, intensidade ${int}/10, ${freq} ${freq === 1 ? 'dia' : 'dias'} por semana e descanso ${rest}/10. Quero ajustar isso de verdade.`
    $$('[data-var-cta]').forEach((a) => (a.dataset.prefill = prefill))

    VARS.forEach((v) => {
      const el = $(`.fader[data-id="${v.id}"]`, host)
      el.style.setProperty('--r', ((val[v.id] - v.min) / (v.max - v.min)).toFixed(3))
      el.setAttribute('aria-valuenow', val[v.id])
      $('.fader-thumb', el).textContent = `${val[v.id]}${v.unit}`
    })
  }

  const setVal = (v, n) => {
    n = clamp(Math.round(n), v.min, v.max)
    hint.innerHTML = `<b>${v.name}:</b> ${v.hint}`
    if (n === val[v.id]) return
    val[v.id] = n
    update()
  }

  // arrastar: a posição do dedo dentro da trilha vira o valor
  const fromPointer = (el, e) => {
    const v = VARS.find((x) => x.id === el.dataset.id)
    const r = $('.fader-track', el).getBoundingClientRect()
    const ratio = clamp(1 - (e.clientY - r.top) / r.height)
    setVal(v, v.min + ratio * (v.max - v.min))
  }
  let current = null
  host.addEventListener('pointerdown', (e) => {
    const el = e.target.closest('.fader')
    if (!el) return
    current = el
    el.classList.add('drag')
    try { el.setPointerCapture(e.pointerId) } catch {}
    el.focus({ preventScroll: true })
    fromPointer(el, e)
  })
  host.addEventListener('pointermove', (e) => { if (current) fromPointer(current, e) })
  const stop = () => { current?.classList.remove('drag'); current = null }
  host.addEventListener('pointerup', stop)
  host.addEventListener('pointercancel', stop)

  host.addEventListener('keydown', (e) => {
    const el = e.target.closest('.fader')
    if (!el) return
    const v = VARS.find((x) => x.id === el.dataset.id)
    const d = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 2, PageDown: -2 }[e.key]
    if (d === undefined && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    setVal(v, e.key === 'Home' ? v.min : e.key === 'End' ? v.max : val[v.id] + d)
  })
  update()
}
