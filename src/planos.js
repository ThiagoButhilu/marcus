import './style.css'
import { $, $$, waLink } from './lib.js'
import { initI18n, C } from './i18n.js'
import { PLANS } from './data.js'

/*
  Página de planos: o montador (modalidade → detalhes → valor e botão de contratar),
  a tabela completa, as fases do programa, os locais e as regras.
  Textos em content/planos.*.js; valores em data.js (PLANS).
*/
const P = C.PLANS_PAGE
const money = new Intl.NumberFormat(C.htmlLang, { style: 'currency', currency: 'BRL' }).format
const ARROW = '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12L12 4M5 4h7v7"/></svg>'
const head = (eyebrow, title, text = '') => `
  <p class="sub mb-4 text-[1.05rem] opacity-70">${eyebrow}</p>
  <h2 class="display max-w-[16ch] text-[clamp(2.6rem,7vw,6rem)]">${title}</h2>
  ${text ? `<p class="mt-5 max-w-[36rem] text-lg leading-relaxed opacity-85">${text}</p>` : ''}`

const options = (plan) => Object.keys(plan.prices)
const lowest = (plan) => Math.min(...Object.values(plan.prices))

// começa no primeiro formato do personal (o on-line vem primeiro: é o foco do Marcus)
const state = { group: 'A', item: Object.keys(P.groups.A.items)[0], option: '12', pair: false }

/* botões de escolha (rádio); o grupo diz qual parte do estado eles mudam */
const choice = (name, value, label, hint, on) => `
  <button type="button" class="plan-opt" role="radio" aria-checked="${on}" data-set="${name}" data-value="${value}">
    <span class="block">${label}</span>${hint ? `<span class="block text-[0.82rem] font-medium opacity-70">${hint}</span>` : ''}
  </button>`

function initBuilder() {
  const host = $('#builder')
  const plan = () => PLANS.find((p) => p.code === state.group)

  const details = () => {
    const p = plan(), g = P.groups[p.code], B = P.builder
    const items = Object.entries(g.items)
    const opts = options(p)
    return `
      ${items.length > 1 ? `
        <p class="sub mt-2 text-[0.95rem] opacity-70">${B.format}</p>
        <div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="${B.format}">${items.map(([code, label]) => choice('item', code, label, code, state.item === code)).join('')}</div>` : ''}
      <p class="sub mt-6 text-[0.95rem] opacity-70">${p.kind === 'pacote' ? B.sessions : B.period}</p>
      <div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="${p.kind === 'pacote' ? B.sessions : B.period}">${opts.map((o) => p.kind === 'pacote'
        ? choice('option', o, P.sessionsLabel(o), P.sessionHints[o], state.option === o)
        : choice('option', o, P.periods[o], o === 'mensal' ? '' : B.save(Math.round((1 - p.prices[o] / p.prices.mensal) * 100)), state.option === o)).join('')}
      </div>
      ${p.pair ? `
        <label class="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-white p-4">
          <input type="checkbox" class="mt-1 size-5 accent-[#274c5f]" data-pair ${state.pair ? 'checked' : ''} />
          <span><b class="block">${B.pair}</b><span class="text-[0.92rem] opacity-70">${B.pairHint}</span></span>
        </label>` : ''}
      ${p.minPeople ? `<p class="mt-5 rounded-2xl bg-white p-4 text-[0.95rem]">${B.minPeople}</p>` : ''}`
  }

  const result = () => {
    const p = plan(), g = P.groups[p.code], B = P.builder
    const price = p.prices[state.option]
    const name = `${state.item} · ${g.name}${Object.keys(g.items).length > 1 ? ` (${g.items[state.item]})` : ''}`
    const detail = p.kind === 'pacote' ? P.sessionsLabel(state.option) : P.periods[state.option]
    const pair = p.pair && state.pair
    return `
      <p class="sub text-[0.95rem] opacity-70">${name}</p>
      <p class="display mt-2 text-[clamp(2.8rem,6vw,4.4rem)] tabular-nums" aria-live="polite">${money(price)}</p>
      <p class="text-[1rem] opacity-80">${p.kind === 'pacote' ? `${B.perPackage} · ${B.perSession(money(price / +state.option))}` : B.perMonth} · ${detail}</p>
      ${pair ? `<p class="mt-3 rounded-2xl bg-white/10 px-4 py-3 text-[1rem]">${B.pairLine(money(price * p.pair), money(price * (1 + p.pair)))}</p>` : ''}
      <p class="sub mt-6 text-[0.95rem] opacity-70">${B.includes}</p>
      <ul class="mt-2 grid gap-2">${g.includes.map((i) => `<li class="flex gap-3 text-[1rem] leading-snug"><span class="mt-[0.5em] size-2 shrink-0 rounded-full bg-bruma" aria-hidden="true"></span>${i}</li>`).join('')}</ul>
      <a class="btn btn-hot mt-7 !whitespace-normal" href="${waLink(B.msg(name, detail, p.kind === 'pacote' ? money(price) : `${money(price)} ${B.perMonth}`, pair))}" target="_blank" rel="noopener">${B.cta} ${ARROW}</a>
      <p class="mt-4 text-[0.9rem] opacity-65">${B.payment}</p>`
  }

  host.innerHTML = `
    <h2 class="display text-[clamp(2.6rem,7vw,6rem)]">${P.builder.title}</h2>
    <p class="sub mt-8 text-[1.05rem]">${P.builder.step1}</p>
    <div class="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" role="radiogroup" aria-label="${P.builder.step1}">${PLANS.map((p) => {
      const g = P.groups[p.code]
      return `
      <button type="button" class="plan-card" role="radio" aria-checked="${state.group === p.code}" data-set="group" data-value="${p.code}">
        <span class="sub text-[0.85rem] opacity-70">${g.tag}</span>
        <span class="display mt-1 block text-[1.6rem]">${g.name}</span>
        <span class="mt-2 block text-[0.95rem] leading-snug opacity-80">${g.desc}</span>
        <span class="sub mt-4 block text-[0.95rem]">${P.builder.from(money(lowest(p)))}${p.kind === 'pacote' ? '' : ` ${P.builder.perMonth}`}</span>
      </button>`
    }).join('')}
    </div>
    <div class="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div><p class="sub text-[1.05rem]">${P.builder.step2}</p><div id="details" class="mt-1"></div></div>
      <div id="plan-result" class="tone-dark rounded-[1.75rem] bg-petroleo p-6 text-gelo md:p-8 lg:sticky lg:top-24"></div>
    </div>`

  const render = () => {
    $$('[data-set="group"]', host).forEach((b) => b.setAttribute('aria-checked', String(b.dataset.value === state.group)))
    $('#details', host).innerHTML = details()
    $('#plan-result', host).innerHTML = result()
  }

  host.addEventListener('click', (e) => {
    const b = e.target.closest('[data-set]')
    if (!b) return
    const { set, value } = b.dataset
    if (set === 'group' && value !== state.group) {
      const p = PLANS.find((x) => x.code === value)
      state.group = value
      state.item = Object.keys(P.groups[value].items)[0]
      // mantém a escolha de sessões/período quando faz sentido; senão, a maior (pacote) ou o mensal
      if (!(state.option in p.prices)) state.option = p.kind === 'pacote' ? options(p).at(-1) : 'mensal'
      if (!p.pair) state.pair = false
    } else state[set] = value
    render()
  })
  host.addEventListener('change', (e) => { if (e.target.matches('[data-pair]')) { state.pair = e.target.checked; $('#plan-result', host).innerHTML = result() } })
  render()
}

function initTable() {
  const T = P.table
  const rows = (kind) => PLANS.filter((p) => p.kind === kind).flatMap((p) => Object.entries(P.groups[p.code].items).sort(([a], [b]) => a.localeCompare(b)).map(([code, label]) => `
    <tr class="border-t border-tinta/10">
      <th scope="row" class="py-3 pr-4 text-left font-semibold"><span class="sub mr-2 opacity-60">${code}</span>${P.groups[p.code].name}${Object.keys(P.groups[p.code].items).length > 1 ? ` · ${label}` : ''}</th>
      ${options(p).map((o) => `<td class="py-3 pl-4 text-right tabular-nums">${money(p.prices[o])}</td>`).join('')}
    </tr>`)).join('')
  const table = (caption, kind) => {
    const first = PLANS.find((p) => p.kind === kind)
    return `
      <div class="mt-8 overflow-x-auto rounded-[1.5rem] bg-gelo p-4 md:p-6">
        <table class="w-full min-w-[34rem] text-[1rem]">
          <caption class="sub pb-3 text-left text-[1.05rem]">${caption}<span class="ml-2 font-medium opacity-60 sm:hidden">${T.swipe}</span></caption>
          <thead><tr class="text-[0.9rem] opacity-70"><th scope="col" class="pb-2 text-left font-semibold">${T.modality}</th>${options(first).map((o) => `<th scope="col" class="pb-2 pl-4 text-right font-semibold">${kind === 'pacote' ? P.sessionsLabel(o) : P.periods[o]}</th>`).join('')}</tr></thead>
          <tbody>${rows(kind)}</tbody>
        </table>
      </div>`
  }
  $('#price-table').innerHTML = `<h2 class="display text-[clamp(2.2rem,5vw,4rem)]">${T.title}</h2>${table(T.packages, 'pacote')}${table(T.consult, 'periodo')}`
}

function initSections() {
  const H = P.hero
  $('#plans-hero').innerHTML = `
    <p class="sub mb-4 text-[1.05rem] opacity-70">${H.eyebrow}</p>
    <h1 class="display max-w-[14ch] text-[clamp(3rem,9vw,7.6rem)]">${H.title}</h1>
    <p class="mt-6 max-w-[38rem] text-lg leading-relaxed opacity-85">${H.text}</p>
    <p class="sub mt-8 inline-flex rounded-full px-4 pb-2 pt-2.5 text-[0.95rem] ring-1 ring-white/30">${H.cred}</p>`

  const F = P.phases
  $('#phases').innerHTML = `
    ${head(F.eyebrow, F.title, F.text)}
    <ol class="mt-10 grid gap-3 md:grid-cols-3">${F.items.map((s) => `
      <li class="rounded-[1.5rem] bg-gelo p-6"><span class="display text-[2.4rem] opacity-30">${s.n}</span><h3 class="display mt-2 text-[1.8rem]">${s.name}</h3><p class="mt-2 text-[1.02rem] leading-snug opacity-85">${s.text}</p></li>`).join('')}
    </ol>
    <div class="mt-10 grid gap-8 lg:grid-cols-2">
      <div>
        <p class="sub text-[1.05rem]">${F.partnersTitle}</p>
        <ul class="mt-3 grid gap-2">${F.partners.map((p) => `<li class="rounded-2xl bg-white/60 px-5 py-4 font-semibold">${p}</li>`).join('')}</ul>
      </div>
      <div>
        <p class="sub text-[1.05rem]">${F.goalsTitle}</p>
        <ul class="mt-3 flex flex-wrap gap-2">${F.goals.map((g) => `<li class="tag">${g}</li>`).join('')}</ul>
      </div>
    </div>`

  const L = P.places
  $('#places').innerHTML = `
    ${head(L.eyebrow, L.title)}
    <ul class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">${L.list.map((p) => `
      <li class="rounded-[1.5rem] bg-white/10 p-5"><b class="display block text-[1.35rem]">${p.name}</b><span class="mt-1 block opacity-75">${p.area}</span></li>`).join('')}
    </ul>`

  const R = P.rules
  $('#rules').innerHTML = `
    ${head(R.eyebrow, R.title)}
    <div class="mt-10 grid gap-3 md:grid-cols-2">${R.blocks.map((b) => `
      <div class="rounded-[1.5rem] bg-white p-6">
        <h3 class="display text-[1.6rem]">${b.title}</h3>
        <ul class="mt-3 grid gap-2">${b.items.map((i) => `<li class="flex gap-3 leading-snug"><span class="mt-[0.5em] size-2 shrink-0 rounded-full bg-aco" aria-hidden="true"></span>${i}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>`

  const E = P.final
  $('#final').innerHTML = `
    <h2 class="display max-w-[14ch] text-[clamp(2.6rem,7vw,6rem)]">${E.title}</h2>
    <p class="mt-5 max-w-[34rem] text-lg opacity-85">${E.text}</p>
    <a class="btn btn-hot mt-8" href="${waLink(E.msg)}" target="_blank" rel="noopener">${E.cta} ${ARROW}</a>`
  $('#top-wa').href = waLink(E.msg)
}

initI18n()
initSections()
initBuilder()
initTable()
