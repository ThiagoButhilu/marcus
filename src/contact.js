import { animate } from 'motion'
import { $, $$, reduced, waLink } from './lib.js'
import { SITE, DAYS, GOALS, PLAN, FORMAT_CHOICES } from './data.js'
import { UI } from './i18n.js'

/*
  Assistente de avaliação, uma pergunta por vez: objetivo, dias, formato e nome.
  No fim mostra uma semana de exemplo e a mensagem sai pronta para o WhatsApp.
*/
export function initContact() {
  const T = UI.contact
  const hello = waLink(T.hello)
  ;['#menu-wa', '#hero-wa', '#wa-direct', '#fab'].forEach((s) => ($(s).href = hello))
  $('#wa-direct').textContent = SITE.phone
  const ig = `https://instagram.com/${SITE.instagram}`
  ;['#ig-direct', '#foot-ig'].forEach((s) => { $(s).href = ig; $(s).textContent = `@${SITE.instagram}` })

  const state = { goal: '', days: new Set(), format: '', name: '', note: '' }
  let step = 0
  const body = $('#wiz-body'), label = $('#wiz-step'), back = $('#wiz-back'), bars = $('#wiz-bars')
  bars.innerHTML = '<span class="wiz-seg"><i></i></span>'.repeat(4)
  const segs = $$('.wiz-seg', bars)

  // dias escolhidos, em ordem, recebem as sessões do objetivo
  const week = () => {
    const sessions = PLAN[state.goal] || [T.session]
    return [...state.days].sort((a, b) => a - b).map((d, n) => [d, sessions[n % sessions.length]])
  }
  const h = (t) => `<h3 class="display text-[clamp(2.1rem,6vw,3rem)]" tabindex="-1">${t}</h3>`

  const VIEWS = [
    () => `${h(T.goal)}
      <div class="mt-5 grid gap-2">${GOALS.map((g) => `<button type="button" class="opt" data-goal="${g}" aria-pressed="${state.goal === g}">${g}</button>`).join('')}</div>`,

    () => `${h(T.days)}
      <div class="mt-5 grid grid-cols-7 gap-1.5 md:gap-2">${DAYS.map((d, i) => `<button type="button" class="day" data-day="${i}" aria-pressed="${state.days.has(i)}" aria-label="${d}">${d}</button>`).join('')}</div>
      <p id="days-note" class="mt-3 text-[0.95rem] opacity-70"></p>
      <button id="wiz-next" type="button" class="btn btn-ink mt-6">${T.next}</button>`,

    () => `${h(T.format)}
      <div class="mt-5 grid gap-2">${FORMAT_CHOICES.map((f) => `<button type="button" class="opt" data-format="${f}" aria-pressed="${state.format === f}">${f}</button>`).join('')}</div>`,

    () => `${h(T.name)}
      <div class="mt-5 grid gap-3">
        <label class="grid gap-1.5"><span class="font-semibold">${T.nameLabel}</span>
          <input id="name" class="field" autocomplete="given-name" placeholder="${T.namePh}" value="${state.name.replace(/"/g, '&quot;')}" /></label>
        <label class="grid gap-1.5"><span class="font-semibold">${T.noteLabel} <span class="font-normal opacity-60">${T.optional}</span></span>
          <textarea id="msg" class="field min-h-24 resize-y" rows="3" placeholder="${T.notePh}">${state.note}</textarea></label>
      </div>
      <p id="form-status" class="mt-3 min-h-6 text-[0.95rem] font-semibold text-[#b3260b]" aria-live="polite"></p>
      <button id="wiz-next" type="button" class="btn btn-ink mt-2">${T.seeWeek}</button>`,

    () => `${h(T.week(state.name))}
      <ol class="mt-5 grid gap-1.5">${DAYS.map((d, i) => {
        const s = new Map(week()).get(i)
        return `<li class="flex items-center justify-between rounded-xl px-4 py-2.5 ${s ? 'bg-tinta font-bold text-gelo' : 'bg-tinta/[0.06] text-tinta/50'}"><span>${d}</span><span>${s || T.free}</span></li>`
      }).join('')}</ol>
      <p class="mt-3 text-[0.95rem] opacity-70">${T.weekNote}</p>
      <div class="mt-6 flex flex-wrap items-center gap-4">
        <button id="wiz-send" type="button" class="btn btn-hot">${T.send}</button>
        <button id="wiz-redo" type="button" class="font-semibold underline underline-offset-4">${T.redo}</button>
      </div>
      <p id="form-status" class="mt-3 min-h-6 text-[0.95rem] font-semibold" aria-live="polite"></p>`,
  ]

  const render = (dir = 1) => {
    segs.forEach((s, i) => s.toggleAttribute('data-on', i <= step))
    label.textContent = step < 4 ? T.step(step + 1, 4) : T.ready
    back.hidden = step === 0
    body.innerHTML = VIEWS[step]()
    if (step === 1) syncDays()
    if (!reduced) animate(body, { opacity: [0, 1], transform: [`translateX(${dir * 26}px)`, 'translateX(0px)'] }, { duration: 0.55, ease: [0.16, 1, 0.3, 1] })
  }
  const go = (to, dir) => { step = to; render(dir) }
  const syncDays = () => {
    const n = state.days.size
    $('#wiz-next').disabled = !n
    $('#wiz-next').classList.toggle('opacity-40', !n)
    $('#days-note').textContent = n ? T.daysCount(n) : T.daysEmpty
  }

  const compose = () => {
    const parts = [T.msg.intro(state.name)]
    if (state.goal) parts.push(T.msg.goal(state.goal))
    const w = week()
    if (w.length) parts.push(T.msg.days(w.map(([d, s]) => `${DAYS[d]} (${s})`).join(', ')))
    if (state.format) parts.push(T.msg.format(state.format))
    if (state.note.trim()) parts.push(state.note.trim())
    return parts.join('\n')
  }

  body.addEventListener('click', (e) => {
    const t = e.target
    const goal = t.closest('[data-goal]'), fmt = t.closest('[data-format]'), day = t.closest('[data-day]')
    if (goal || fmt) {
      const b = goal || fmt
      state[goal ? 'goal' : 'format'] = b.textContent
      $$('.opt', body).forEach((o) => o.setAttribute('aria-pressed', String(o === b)))
      setTimeout(() => go(step + 1, 1), reduced ? 0 : 220)
    } else if (day) {
      const i = +day.dataset.day
      state.days.has(i) ? state.days.delete(i) : state.days.add(i)
      day.setAttribute('aria-pressed', String(state.days.has(i)))
      syncDays()
    } else if (t.closest('#wiz-next')) {
      if (step === 1) return go(2, 1)
      const name = $('#name')
      if (name.value.trim().length < 2) {
        name.setAttribute('aria-invalid', 'true')
        $('#form-status').textContent = T.nameError
        return name.focus()
      }
      go(4, 1)
    } else if (t.closest('#wiz-send')) {
      window.open(waLink(compose()), '_blank', 'noopener')
      $('#form-status').textContent = T.sent
    } else if (t.closest('#wiz-redo')) {
      state.goal = ''; state.days.clear(); state.format = ''
      go(0, -1)
    }
  })
  body.addEventListener('input', (e) => {
    if (e.target.id === 'name') { state.name = e.target.value.trim(); e.target.setAttribute('aria-invalid', 'false') }
    if (e.target.id === 'msg') state.note = e.target.value
  })
  back.addEventListener('click', () => go(Math.max(0, step - 1), -1))

  // "Quero esse" dos treinos e "Ajustar isso para mim" preenchem a mensagem
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-prefill]')
    if (!a || !a.dataset.prefill) return
    state.note = a.dataset.prefill
    const msg = $('#msg')
    if (msg) msg.value = state.note
  })

  render()
}
