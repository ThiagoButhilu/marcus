import { $, $$, clamp } from './lib.js'
import { MUSCLES, RUN_TEST_KM, RUN_SPLITS, HIIT_EFFORT_X, HIIT_RATIOS } from './data.js'
import { C, UI } from './i18n.js'

/*
  Calculadoras de treino, uma por aba. As três primeiras medem volume para hipertrofia (post do Marcus):
  - séries por músculo: séries semanais de cada músculo comparadas com a faixa de referência (a opção mais simples);
  - volume da sessão: séries × repetições × carga de cada exercício, somados;
  - volume da semana: séries × repetições × carga × número de exercícios × treinos por semana.
  As duas últimas são de corrida (planilha do Marcus):
  - teste de 2400 m: ritmo e velocidade, e os tempos-alvo dos tiros de 400, 800 e 1200 m;
  - HIIT: a partir da iVO2máx e do Tempo Limite, quantos tiros, de quanto tempo, com quanto descanso.
  Os campos ficam montados; cada mudança só redesenha o resultado, para o foco não sair do campo.
*/
const T = UI.calc
const fmt = new Intl.NumberFormat(C.htmlLang, { maximumFractionDigits: 1 })
const kg = (n) => `${fmt.format(Math.round(n))} kg`
const num = (s) => { const n = parseFloat(String(s).replace(',', '.')); return Number.isFinite(n) && n > 0 ? n : 0 }
const show = (n) => fmt.format(n)
// dentro dos campos, sem separador de milhar: "1.000" seria lido de volta como 1
const plain = new Intl.NumberFormat(C.htmlLang, { maximumFractionDigits: 1, useGrouping: false }).format
const SCALE = 30 // séries por semana no fim da barra de cada músculo
/* segundos → "m:ss" (ou "h:mm:ss") */
const clock = (s) => {
  s = Math.round(s)
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = String(s % 60).padStart(2, '0')
  return h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`
}
const kmh = (km, s) => `${fmt.format(Math.round((km / (s / 3600)) * 10) / 10)} km/h`

const state = {
  tab: 0,
  muscles: Object.fromEntries(MUSCLES.map((m) => [m.id, m.val])),
  rows: T.examples.map((ex) => ({ ...ex })),
  week: { sets: 3, reps: 10, kg: 40, ex: 6, freq: 3 },
  run: { min: 13, sec: 28 },
  hiit: { vmax: 14, tlim: 3, work: 120, ratio: '1:2', warm: 5 },
}

/* campo numérico com − e +; a chave diz onde o valor mora no estado */
const stepper = (key, value, label, { step = 1, min = 0, max = 999, decimal = false } = {}) => `
  <div class="stepper" data-key="${key}" data-step="${step}" data-min="${min}" data-max="${max}">
    <button type="button" data-d="-1" aria-label="${T.minus(label)}">−</button>
    <input type="text" inputmode="${decimal ? 'decimal' : 'numeric'}" value="${plain(value)}" aria-label="${label}" autocomplete="off" />
    <button type="button" data-d="1" aria-label="${T.plus(label)}">+</button>
  </div>`

/* rótulo à esquerda do campo no celular; em cima dele a partir de sm */
const field = (label, html) => `<label class="flex items-center justify-between gap-3 sm:grid sm:justify-stretch sm:gap-1.5"><span class="text-[0.9rem] font-semibold opacity-70">${label}</span>${html}</label>`

const statusOf = (m) => (state.muscles[m.id] < m.min ? 'low' : state.muscles[m.id] > m.max ? 'high' : 'ok')
const CHIP = { low: 'bg-tinta/10 text-tinta', ok: 'bg-petroleo text-gelo', high: 'bg-tinta text-gelo' }
const rowVolume = (r) => r.sets * r.reps * r.kg
const weekVolume = () => { const w = state.week; return w.sets * w.reps * w.kg * w.ex * w.freq }
const runSeconds = () => state.run.min * 60 + state.run.sec
const splits = () => RUN_SPLITS.map((sp) => {
  const base = runSeconds() / sp.div, lo = base * sp.lo, hi = base * sp.hi, avg = (lo + hi) / 2
  return { ...sp, lo, hi, avg }
})
const hiitPlan = () => {
  const h = state.hiit, work = h.work
  const [rec, eff] = h.ratio.split(':').map(Number)
  const goal = HIIT_EFFORT_X * h.tlim * 60
  const reps = Math.max(1, Math.round(goal / work))
  const rest = (work * rec) / eff
  return { work, rest, reps, goal, effort: reps * work, total: h.warm * 60 + reps * work + (reps - 1) * rest, meters: (h.vmax * work) / 3.6 }
}

/* ---------- entradas de cada aba ---------- */
const INPUTS = [
  () => `
    <p class="max-w-[34rem] text-[1.05rem] leading-snug">${T.muscleIntro}</p>
    <ul class="mt-5 grid gap-2">${MUSCLES.map((m) => `
      <li class="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2.5 rounded-2xl bg-white px-4 py-3 sm:grid-cols-[10rem_auto_1fr]" data-muscle="${m.id}">
        <span><b class="block leading-tight">${m.name}</b><span class="text-[0.85rem] opacity-60">${T.range(m.min, m.max)}</span></span>
        ${stepper(`m:${m.id}`, state.muscles[m.id], m.name, { max: 60 })}
        <div class="col-span-2 flex items-center gap-3 sm:col-span-1">
          <div class="relative h-2.5 flex-1 rounded-full bg-tinta/10" aria-hidden="true">
            <span class="absolute inset-y-0 rounded-full bg-bruma" style="left:${(m.min / SCALE) * 100}%;width:${((m.max - m.min) / SCALE) * 100}%"></span>
            <span class="calc-mark absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-tinta transition-[left] duration-300"></span>
          </div>
          <span class="calc-chip sub w-[5.6rem] rounded-full px-2.5 pb-1 pt-1.5 text-center text-[0.85rem]"></span>
        </div>
      </li>`).join('')}
    </ul>`,

  () => `
    <p class="max-w-[34rem] text-[1.05rem] leading-snug">${T.sessionIntro}</p>
    <ol class="mt-5 grid gap-2">${state.rows.map((r, i) => `
      <li class="grid gap-3 rounded-2xl bg-white p-4" data-row="${i}">
        <div class="flex items-center gap-2">
          <input class="field !py-2.5" value="${r.name.replace(/"/g, '&quot;')}" placeholder="${T.exercise} ${i + 1}" aria-label="${T.exercise} ${i + 1}" data-name="${i}" />
          ${state.rows.length > 1 ? `<button type="button" class="grid size-10 shrink-0 place-items-center rounded-full text-xl hover:bg-tinta/10" data-remove="${i}" aria-label="${T.remove(r.name || `${T.exercise} ${i + 1}`)}">×</button>` : ''}
        </div>
        <div class="grid gap-2 sm:grid-cols-3">
          ${field(T.setsL, stepper(`r:${i}:sets`, r.sets, `${T.setsL}, ${r.name || i + 1}`, { max: 20 }))}
          ${field(T.reps, stepper(`r:${i}:reps`, r.reps, `${T.reps}, ${r.name || i + 1}`, { max: 100 }))}
          ${field(T.kg, stepper(`r:${i}:kg`, r.kg, `${T.kg}, ${r.name || i + 1}`, { step: 2.5, max: 1000, decimal: true }))}
        </div>
        <p class="text-right text-[0.95rem]"><span class="opacity-60">=</span> <b class="calc-row tabular-nums"></b></p>
      </li>`).join('')}
    </ol>
    <button type="button" class="btn btn-line mt-3" data-add>${T.add}</button>`,

  () => `
    <p class="max-w-[34rem] text-[1.05rem] leading-snug">${T.weekIntro}</p>
    <div class="mt-5 grid gap-3 sm:grid-cols-2">${Object.entries(T.fields).map(([k, label]) => `
      <div class="rounded-2xl bg-white p-4">${field(label, stepper(`w:${k}`, state.week[k], label, k === 'kg' ? { step: 2.5, max: 1000, decimal: true } : { max: k === 'freq' ? 7 : 100 }))}</div>`).join('')}
    </div>`,

  () => `
    <p class="max-w-[34rem] text-[1.05rem] leading-snug">${T.runIntro}</p>
    <div class="mt-5 grid gap-3 sm:grid-cols-2">
      <div class="rounded-2xl bg-white p-4">${field(T.minutes, stepper('t:min', state.run.min, T.minutes, { max: 60 }))}</div>
      <div class="rounded-2xl bg-white p-4">${field(T.seconds, stepper('t:sec', state.run.sec, T.seconds, { max: 59 }))}</div>
    </div>
    <p class="mt-4 max-w-[34rem] text-[0.95rem] leading-snug opacity-70">${T.runHow}</p>`,

  () => `
    <p class="max-w-[34rem] text-[1.05rem] leading-snug">${T.hiitIntro}</p>
    <div class="mt-5 grid gap-3 sm:grid-cols-2">
      <div class="rounded-2xl bg-white p-4">${field(T.hiitFields.vmax, stepper('h:vmax', state.hiit.vmax, T.hiitFields.vmax, { step: 0.5, min: 1, max: 30, decimal: true }))}</div>
      <div class="rounded-2xl bg-white p-4">${field(T.hiitFields.tlim, stepper('h:tlim', state.hiit.tlim, T.hiitFields.tlim, { step: 0.5, max: 30, decimal: true }))}</div>
      <div class="rounded-2xl bg-white p-4">${field(T.hiitFields.work, stepper('h:work', state.hiit.work, T.hiitFields.work, { step: 15, min: 10, max: 600 }))}</div>
      <div class="rounded-2xl bg-white p-4"><label class="flex items-center justify-between gap-3 sm:grid sm:justify-stretch sm:gap-1.5"><span class="text-[0.9rem] font-semibold opacity-70">${T.hiitFields.ratio}</span>
        <select class="field !w-auto !py-2.5 sm:!w-full" data-ratio>${HIIT_RATIOS.map((r) => `<option value="${r}" ${r === state.hiit.ratio ? 'selected' : ''}>${r}</option>`).join('')}</select></label></div>
      <div class="rounded-2xl bg-white p-4">${field(T.hiitFields.warm, stepper('h:warm', state.hiit.warm, T.hiitFields.warm, { max: 30 }))}</div>
    </div>
    <p class="mt-4 max-w-[34rem] text-[0.95rem] leading-snug opacity-70">${T.hiitHow}</p>`,
]

/* ---------- resultado de cada aba ---------- */
const RESULTS = [
  () => {
    const st = MUSCLES.map(statusOf)
    const count = (s) => st.filter((x) => x === s).length
    return {
      big: `${count('ok')}<span class="opacity-50">/${MUSCLES.length}</span>`,
      label: T.inRange,
      body: `
        <ul class="grid grid-cols-3 gap-2 text-center">${['low', 'ok', 'high'].map((s) => `
          <li class="rounded-2xl bg-white/10 px-2 py-3"><b class="display block text-[2rem]">${count(s)}</b><span class="text-[0.9rem] opacity-80">${T.status[s]}</span></li>`).join('')}
        </ul>
        <p class="mt-5 text-[1rem] leading-snug opacity-85">${T.muscleTip}</p>`,
      prefill: T.prefill.muscle(MUSCLES.map((m) => `${m.name} ${state.muscles[m.id]}`).join(', ')),
    }
  },
  () => {
    const total = state.rows.reduce((a, r) => a + rowVolume(r), 0)
    return {
      big: kg(total),
      label: T.sessionTotal,
      body: `
        <p class="sub text-[0.95rem] opacity-70">${T.formula}</p>
        <ul class="mt-2 grid gap-1.5 text-[1rem] tabular-nums">${state.rows.map((r, i) => `
          <li class="flex justify-between gap-3 border-b border-white/15 pb-1.5"><span class="opacity-80">${r.name || `${T.exercise} ${i + 1}`}: ${show(r.sets)} × ${show(r.reps)} × ${show(r.kg)} kg</span><b>${kg(rowVolume(r))}</b></li>`).join('')}
        </ul>`,
      prefill: T.prefill.session(kg(total)),
    }
  },
  () => {
    const w = state.week
    return {
      big: kg(weekVolume()),
      label: T.weekTotal,
      body: `
        <p class="sub text-[0.95rem] opacity-70">${T.formula}</p>
        <p class="mt-2 text-[1.05rem] leading-relaxed tabular-nums">${show(w.sets)} ${T.short.sets} × ${show(w.reps)} ${T.short.reps} × ${show(w.kg)} kg × ${show(w.ex)} ${T.short.ex} × ${show(w.freq)} ${T.short.freq}</p>`,
      prefill: T.prefill.week(kg(weekVolume())),
    }
  },
  () => {
    const s = runSeconds()
    if (s < 60) return { big: '—', label: T.runPace, body: `<p class="text-[1.05rem]">${T.runEmpty}</p>`, prefill: T.prefill.run('—', '—') }
    return {
      big: `${clock(s / RUN_TEST_KM)}<span class="text-[0.45em] opacity-60"> /km</span>`,
      label: T.runPace,
      body: `
        <p class="text-[1.05rem]">${T.runTime(clock(s))} · <b>${kmh(RUN_TEST_KM, s)}</b></p>
        <p class="sub mt-6 text-[0.95rem] opacity-70">${T.splitsTitle}</p>
        <ul class="mt-2 grid gap-2">${splits().map((sp) => `
          <li class="grid grid-cols-[5.4rem_1fr] items-baseline gap-x-3 rounded-2xl bg-white/10 px-4 py-3 tabular-nums">
            <b class="display whitespace-nowrap text-[1.5rem]">${sp.m} m</b>
            <span><b class="text-[1.15rem]">${T.between(clock(sp.lo), clock(sp.hi))}</b><span class="block text-[0.9rem] opacity-75">${clock(sp.avg / (sp.m / 1000))}/km · ${kmh(sp.m / 1000, sp.avg)}</span></span>
          </li>`).join('')}
        </ul>
        <p class="mt-4 text-[0.95rem] leading-snug opacity-80">${T.splitsHow}</p>`,
      prefill: T.prefill.run(clock(s), clock(s / RUN_TEST_KM)),
    }
  },
  () => {
    const h = state.hiit, p = hiitPlan()
    const blocks = Array.from({ length: p.reps }, (_, i) => `<span class="h-full rounded-[0.35rem] bg-bruma" style="flex:${p.work}"></span>${i < p.reps - 1 && p.rest ? `<span class="h-full rounded-[0.35rem] bg-white/15" style="flex:${p.rest}"></span>` : ''}`).join('')
    return {
      big: `${p.reps} <span class="text-[0.45em] opacity-60">${T.hiitReps(p.reps)}</span>`,
      label: T.hiitLabel,
      body: `
        <div class="flex h-8 gap-[3px]" aria-hidden="true">${blocks}</div>
        <ul class="mt-5 grid gap-2 text-[1rem] tabular-nums">
          <li class="flex justify-between gap-3 border-b border-white/15 pb-1.5"><span class="opacity-80">${T.hiitRows.work}</span><b>${clock(p.work)} · ${fmt.format(h.vmax)} km/h (${clock(3600 / h.vmax)}/km)</b></li>
          <li class="flex justify-between gap-3 border-b border-white/15 pb-1.5"><span class="opacity-80">${T.hiitRows.rest}</span><b>${clock(p.rest)}</b></li>
          <li class="flex justify-between gap-3 border-b border-white/15 pb-1.5"><span class="opacity-80">${T.hiitRows.dist}</span><b>~${fmt.format(Math.round(p.meters / 10) * 10)} m</b></li>
          <li class="flex justify-between gap-3 border-b border-white/15 pb-1.5"><span class="opacity-80">${T.hiitRows.effort}</span><b>${clock(p.effort)}</b></li>
          <li class="flex justify-between gap-3"><span class="opacity-80">${T.hiitRows.total}</span><b>${clock(p.total)}</b></li>
        </ul>
        <p class="mt-4 text-[0.95rem] leading-snug opacity-80">${T.hiitMath(fmt.format(h.tlim), clock(p.goal), clock(p.work), p.reps)}</p>`,
      prefill: T.prefill.hiit(p.reps, clock(p.work), fmt.format(h.vmax), clock(p.rest), fmt.format(h.tlim)),
    }
  },
]

export function initCalculator() {
  const tabs = $('#calc-tabs'), inputs = $('#calc-inputs'), result = $('#calc-result')
  tabs.setAttribute('aria-label', T.tabsLabel)
  tabs.innerHTML = T.tabs.map((t, i) => `
    <button type="button" role="tab" id="calc-tab-${i}" class="calc-tab" aria-controls="calc-panel" aria-selected="${i === state.tab}" tabindex="${i === state.tab ? 0 : -1}" data-tab="${i}">
      <span class="block">${t}</span>${T.hints[i] ? `<span class="block text-[0.8rem] font-medium opacity-70">${T.hints[i]}</span>` : ''}
    </button>`).join('')

  const refresh = () => {
    const r = RESULTS[state.tab]()
    result.innerHTML = `
      <p class="text-[0.95rem] font-semibold opacity-70">${r.label}</p>
      <p class="display mt-1 text-[clamp(2.8rem,6vw,4.4rem)] tabular-nums" aria-live="polite">${r.big}</p>
      <div class="mt-6">${r.body}</div>
      <a class="btn btn-hot mt-7 !whitespace-normal text-left" href="#contato" data-prefill="${r.prefill.replace(/"/g, '&quot;')}">${T.cta} <span aria-hidden="true">↗</span></a>
      <p class="mt-4 text-[0.9rem] opacity-60">${T.note}</p>`
    if (state.tab === 0) MUSCLES.forEach((m) => {
      const li = $(`[data-muscle="${m.id}"]`, inputs), s = statusOf(m)
      $('.calc-mark', li).style.left = `${clamp(state.muscles[m.id] / SCALE) * 100}%`
      const chip = $('.calc-chip', li)
      chip.className = `calc-chip sub w-[5.6rem] rounded-full px-2.5 pb-1 pt-1.5 text-center text-[0.85rem] ${CHIP[s]}`
      chip.textContent = T.status[s]
    })
    if (state.tab === 1) $$('[data-row]', inputs).forEach((li, i) => { $('.calc-row', li).textContent = kg(rowVolume(state.rows[i])) })
  }
  const render = () => {
    $$('[data-tab]', tabs).forEach((b, i) => { b.setAttribute('aria-selected', String(i === state.tab)); b.tabIndex = i === state.tab ? 0 : -1 })
    $('#calc-panel').setAttribute('aria-labelledby', `calc-tab-${state.tab}`)
    inputs.innerHTML = INPUTS[state.tab]()
    refresh()
  }

  const set = (key, v) => {
    const [scope, a, b] = key.split(':')
    if (scope === 'm') state.muscles[a] = v
    if (scope === 'r') state.rows[+a][b] = v
    if (scope === 'w') state.week[a] = v
    if (scope === 't') state.run[a] = v
    if (scope === 'h') state.hiit[a] = v
    refresh()
  }

  tabs.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tab]')
    if (b) { state.tab = +b.dataset.tab; render() }
  })
  tabs.addEventListener('keydown', (e) => {
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!d) return
    state.tab = (state.tab + d + T.tabs.length) % T.tabs.length
    render()
    $(`#calc-tab-${state.tab}`).focus()
  })

  inputs.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-d]')
    if (btn) {
      const box = btn.closest('.stepper'), input = $('input', box)
      const v = clamp(num(input.value) + +btn.dataset.d * +box.dataset.step, +box.dataset.min, +box.dataset.max)
      input.value = plain(v)
      return set(box.dataset.key, v)
    }
    if (e.target.closest('[data-add]')) {
      state.rows.push({ name: '', sets: 3, reps: 10, kg: 20 })
      render()
      return $$('[data-name]', inputs).at(-1).focus()
    }
    const rm = e.target.closest('[data-remove]')
    if (rm) { state.rows.splice(+rm.dataset.remove, 1); render() }
  })
  inputs.addEventListener('input', (e) => {
    const box = e.target.closest('.stepper')
    if (box) return set(box.dataset.key, clamp(num(e.target.value), +box.dataset.min, +box.dataset.max))
    if (e.target.dataset.name !== undefined) { state.rows[+e.target.dataset.name].name = e.target.value; refresh() }
  })
  inputs.addEventListener('change', (e) => {
    if (e.target.matches('[data-ratio]')) { state.hiit.ratio = e.target.value; refresh() }
  })

  render()
}
