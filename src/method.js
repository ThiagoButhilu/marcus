import { $ } from './lib.js'
import { STEPS } from './data.js'
import { UI } from './i18n.js'

/*
  "Como funciona": as seis etapas em três fases, lado a lado em telas largas e empilhadas nas menores.
  Antes de começar (1 a 3) acontece uma vez; o treino (4) recebe feedback e ajuste (5 e 6) a cada ciclo,
  e a seta embaixo mostra essa volta.
*/
const PHASE = [0, 0, 0, 1, 2, 2]
const CARD = ['bg-gelo text-tinta', 'bg-tinta text-gelo', 'bg-petroleo text-gelo']
const COLS = ['sm:grid-cols-3', '', 'sm:grid-cols-2']

/* um ícone por etapa: contrato, formulário, vídeo, treino, conversa, ajuste */
const ICON = [
  '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="m10 14 2 2 4-4"/>',
  '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.5h6V4M8.5 10h7M8.5 14h7M8.5 18h4"/>',
  '<rect x="2.5" y="6.5" width="13" height="11" rx="2"/><path d="m15.5 11 6-3.5v9l-6-3.5"/>',
  '<path d="M6 7.5v9M3 9.5v5M18 7.5v9M21 9.5v5M6 12h12"/>',
  '<path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.6L3.5 20.5l1.4-4.4a8.5 8.5 0 1 1 15.6-4.6Z"/>',
  '<path d="M4 7h9M18 7h2M4 17h3M12 17h8"/><circle cx="15.5" cy="7" r="2.5"/><circle cx="9.5" cy="17" r="2.5"/>',
]

export function initMethod() {
  const steps = STEPS.map((s, i) => ({ ...s, i }))

  const card = (s) => `
    <li class="flex h-full flex-col rounded-[1.5rem] p-5 ${CARD[PHASE[s.i]]}">
      <div class="flex items-center justify-between">
        <span class="sub text-[0.95rem] tabular-nums opacity-70">${String(s.i + 1).padStart(2, '0')}</span>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[s.i]}</svg>
      </div>
      <h3 class="display mt-4 text-[clamp(1.35rem,1.45vw,1.75rem)] max-xl:text-[1.6rem] xl:mt-10">${s.name}</h3>
      <p class="mt-2 text-[1rem] leading-snug opacity-85">${s.text}</p>
    </li>`

  $('#steps').innerHTML = `
    <div class="grid gap-10 xl:grid-cols-[3fr_1fr_2fr] xl:gap-3">
      ${UI.method.phases.map((name, k) => {
        const mine = steps.filter((s) => PHASE[s.i] === k)
        return `
        <div class="flex flex-col">
          <p class="sub flex items-center gap-2 border-t-2 border-tinta pt-3 text-[1.05rem]">${k === 2 ? '<span aria-hidden="true">↻</span>' : ''}${name}</p>
          <ol class="mt-4 grid flex-1 gap-3 ${COLS[k]}" start="${mine[0].i + 1}">${mine.map(card).join('')}</ol>
          ${k === 2 ? `<p class="mt-4 text-[1rem] font-semibold xl:hidden">${UI.method.loop}</p>` : ''}
        </div>`
      }).join('')}
    </div>
    <div class="mt-3 hidden xl:grid xl:grid-cols-[3fr_1fr_2fr] xl:gap-3">
      <div></div>
      <div class="col-span-2">
        <!-- seta em U: sai da etapa 6 e volta para a 4 -->
        <div class="relative mx-[16.6%] h-9 rounded-b-[1.4rem] border-2 border-t-0 border-tinta" aria-hidden="true">
          <svg class="absolute -left-[7px] -top-[10px]" width="12" height="12" viewBox="0 0 12 12"><path d="M6 0 12 10H0Z" fill="currentColor"/></svg>
        </div>
        <p class="mt-3 text-center text-[1rem] font-semibold">${UI.method.loop}</p>
      </div>
    </div>`
}
