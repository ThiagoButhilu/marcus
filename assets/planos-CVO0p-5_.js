import{D as e,k as t,l as n,n as r,t as i,y as a}from"./lib-CqWRadCo.js";var o=e.PLANS_PAGE,s=new Intl.NumberFormat(e.htmlLang,{style:`currency`,currency:`BRL`}).format,c=`<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12L12 4M5 4h7v7"/></svg>`,l=(e,t,n=``)=>`
  <p class="sub mb-4 text-[1.05rem] opacity-70">${e}</p>
  <h2 class="display max-w-[16ch] text-[clamp(2.6rem,7vw,6rem)]">${t}</h2>
  ${n?`<p class="mt-5 max-w-[36rem] text-lg leading-relaxed opacity-85">${n}</p>`:``}`,u=e=>Object.keys(e.prices),d=e=>Math.min(...Object.values(e.prices)),f={group:`A`,item:`A.1`,option:`12`,pair:!1},p=(e,t,n,r,i)=>`
  <button type="button" class="plan-opt" role="radio" aria-checked="${i}" data-set="${e}" data-value="${t}">
    <span class="block">${n}</span>${r?`<span class="block text-[0.82rem] font-medium opacity-70">${r}</span>`:``}
  </button>`;function m(){let e=i(`#builder`),t=()=>a.find(e=>e.code===f.group),l=()=>{let e=t(),n=o.groups[e.code],r=o.builder,i=Object.entries(n.items),a=u(e);return`
      ${i.length>1?`
        <p class="sub mt-2 text-[0.95rem] opacity-70">${r.format}</p>
        <div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="${r.format}">${i.map(([e,t])=>p(`item`,e,t,e,f.item===e)).join(``)}</div>`:``}
      <p class="sub mt-6 text-[0.95rem] opacity-70">${e.kind===`pacote`?r.sessions:r.period}</p>
      <div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="${e.kind===`pacote`?r.sessions:r.period}">${a.map(t=>e.kind===`pacote`?p(`option`,t,o.sessionsLabel(t),o.sessionHints[t],f.option===t):p(`option`,t,o.periods[t],t===`mensal`?``:r.save(Math.round((1-e.prices[t]/e.prices.mensal)*100)),f.option===t)).join(``)}
      </div>
      ${e.pair?`
        <label class="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-white p-4">
          <input type="checkbox" class="mt-1 size-5 accent-[#274c5f]" data-pair ${f.pair?`checked`:``} />
          <span><b class="block">${r.pair}</b><span class="text-[0.92rem] opacity-70">${r.pairHint}</span></span>
        </label>`:``}
      ${e.minPeople?`<p class="mt-5 rounded-2xl bg-white p-4 text-[0.95rem]">${r.minPeople}</p>`:``}`},m=()=>{let e=t(),r=o.groups[e.code],i=o.builder,a=e.prices[f.option],l=`${f.item} · ${r.name}${Object.keys(r.items).length>1?` (${r.items[f.item]})`:``}`,u=e.kind===`pacote`?o.sessionsLabel(f.option):o.periods[f.option],d=e.pair&&f.pair;return`
      <p class="sub text-[0.95rem] opacity-70">${l}</p>
      <p class="display mt-2 text-[clamp(2.8rem,6vw,4.4rem)] tabular-nums" aria-live="polite">${s(a)}</p>
      <p class="text-[1rem] opacity-80">${e.kind===`pacote`?`${i.perPackage} · ${i.perSession(s(a/+f.option))}`:i.perMonth} · ${u}</p>
      ${d?`<p class="mt-3 rounded-2xl bg-white/10 px-4 py-3 text-[1rem]">${i.pairLine(s(a*e.pair),s(a*(1+e.pair)))}</p>`:``}
      <p class="sub mt-6 text-[0.95rem] opacity-70">${i.includes}</p>
      <ul class="mt-2 grid gap-2">${r.includes.map(e=>`<li class="flex gap-3 text-[1rem] leading-snug"><span class="mt-[0.5em] size-2 shrink-0 rounded-full bg-bruma" aria-hidden="true"></span>${e}</li>`).join(``)}</ul>
      <a class="btn btn-hot mt-7 !whitespace-normal" href="${n(i.msg(l,u,e.kind===`pacote`?s(a):`${s(a)} ${i.perMonth}`,d))}" target="_blank" rel="noopener">${i.cta} ${c}</a>
      <p class="mt-4 text-[0.9rem] opacity-65">${i.payment}</p>`};e.innerHTML=`
    <h2 class="display text-[clamp(2.6rem,7vw,6rem)]">${o.builder.title}</h2>
    <p class="sub mt-8 text-[1.05rem]">${o.builder.step1}</p>
    <div class="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" role="radiogroup" aria-label="${o.builder.step1}">${a.map(e=>{let t=o.groups[e.code];return`
      <button type="button" class="plan-card" role="radio" aria-checked="${f.group===e.code}" data-set="group" data-value="${e.code}">
        <span class="sub text-[0.85rem] opacity-70">${t.tag}</span>
        <span class="display mt-1 block text-[1.6rem]">${t.name}</span>
        <span class="mt-2 block text-[0.95rem] leading-snug opacity-80">${t.desc}</span>
        <span class="sub mt-4 block text-[0.95rem]">${o.builder.from(s(d(e)))}${e.kind===`pacote`?``:` ${o.builder.perMonth}`}</span>
      </button>`}).join(``)}
    </div>
    <div class="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div><p class="sub text-[1.05rem]">${o.builder.step2}</p><div id="details" class="mt-1"></div></div>
      <div id="plan-result" class="tone-dark rounded-[1.75rem] bg-petroleo p-6 text-gelo md:p-8 lg:sticky lg:top-24"></div>
    </div>`;let h=()=>{r(`[data-set="group"]`,e).forEach(e=>e.setAttribute(`aria-checked`,String(e.dataset.value===f.group))),i(`#details`,e).innerHTML=l(),i(`#plan-result`,e).innerHTML=m()};e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-set]`);if(!t)return;let{set:n,value:r}=t.dataset;if(n===`group`&&r!==f.group){let e=a.find(e=>e.code===r);f.group=r,f.item=Object.keys(o.groups[r].items)[0],f.option in e.prices||(f.option=e.kind===`pacote`?u(e).at(-1):`mensal`),e.pair||(f.pair=!1)}else f[n]=r;h()}),e.addEventListener(`change`,t=>{t.target.matches(`[data-pair]`)&&(f.pair=t.target.checked,i(`#plan-result`,e).innerHTML=m())}),h()}function h(){let e=o.table,t=e=>a.filter(t=>t.kind===e).flatMap(e=>Object.entries(o.groups[e.code].items).map(([t,n])=>`
    <tr class="border-t border-tinta/10">
      <th scope="row" class="py-3 pr-4 text-left font-semibold"><span class="sub mr-2 opacity-60">${t}</span>${o.groups[e.code].name}${Object.keys(o.groups[e.code].items).length>1?` · ${n}`:``}</th>
      ${u(e).map(t=>`<td class="py-3 pl-4 text-right tabular-nums">${s(e.prices[t])}</td>`).join(``)}
    </tr>`)).join(``),n=(n,r)=>{let i=a.find(e=>e.kind===r);return`
      <div class="mt-8 overflow-x-auto rounded-[1.5rem] bg-gelo p-4 md:p-6">
        <table class="w-full min-w-[34rem] text-[1rem]">
          <caption class="sub pb-3 text-left text-[1.05rem]">${n}<span class="ml-2 font-medium opacity-60 sm:hidden">${e.swipe}</span></caption>
          <thead><tr class="text-[0.9rem] opacity-70"><th scope="col" class="pb-2 text-left font-semibold">${e.modality}</th>${u(i).map(e=>`<th scope="col" class="pb-2 pl-4 text-right font-semibold">${r===`pacote`?o.sessionsLabel(e):o.periods[e]}</th>`).join(``)}</tr></thead>
          <tbody>${t(r)}</tbody>
        </table>
      </div>`};i(`#price-table`).innerHTML=`<h2 class="display text-[clamp(2.2rem,5vw,4rem)]">${e.title}</h2>${n(e.packages,`pacote`)}${n(e.consult,`periodo`)}`}function g(){let e=o.hero;i(`#plans-hero`).innerHTML=`
    <p class="sub mb-4 text-[1.05rem] opacity-70">${e.eyebrow}</p>
    <h1 class="display max-w-[14ch] text-[clamp(3rem,9vw,7.6rem)]">${e.title}</h1>
    <p class="mt-6 max-w-[38rem] text-lg leading-relaxed opacity-85">${e.text}</p>
    <p class="sub mt-8 inline-flex rounded-full px-4 pb-2 pt-2.5 text-[0.95rem] ring-1 ring-white/30">${e.cred}</p>`;let t=o.phases;i(`#phases`).innerHTML=`
    ${l(t.eyebrow,t.title,t.text)}
    <ol class="mt-10 grid gap-3 md:grid-cols-3">${t.items.map(e=>`
      <li class="rounded-[1.5rem] bg-gelo p-6"><span class="display text-[2.4rem] opacity-30">${e.n}</span><h3 class="display mt-2 text-[1.8rem]">${e.name}</h3><p class="mt-2 text-[1.02rem] leading-snug opacity-85">${e.text}</p></li>`).join(``)}
    </ol>
    <div class="mt-10 grid gap-8 lg:grid-cols-2">
      <div>
        <p class="sub text-[1.05rem]">${t.partnersTitle}</p>
        <ul class="mt-3 grid gap-2">${t.partners.map(e=>`
          <li><a class="flex items-center justify-between gap-4 rounded-2xl bg-white/60 px-5 py-4 transition-colors hover:bg-white" href="https://www.instagram.com/${e.ig}/" target="_blank" rel="noopener">
            <span><b class="block">${e.name}</b><span class="text-[0.92rem] opacity-70">${e.role}</span></span><span class="sub text-[0.9rem] opacity-70">@${e.ig}</span></a></li>`).join(``)}
        </ul>
      </div>
      <div>
        <p class="sub text-[1.05rem]">${t.goalsTitle}</p>
        <ul class="mt-3 flex flex-wrap gap-2">${t.goals.map(e=>`<li class="tag">${e}</li>`).join(``)}</ul>
      </div>
    </div>`;let r=o.places;i(`#places`).innerHTML=`
    ${l(r.eyebrow,r.title)}
    <ul class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">${r.list.map(e=>`
      <li class="rounded-[1.5rem] bg-white/10 p-5"><b class="display block text-[1.35rem]">${e.name}</b><span class="mt-1 block opacity-75">${e.area}</span></li>`).join(``)}
    </ul>`;let a=o.rules;i(`#rules`).innerHTML=`
    ${l(a.eyebrow,a.title)}
    <div class="mt-10 grid gap-3 md:grid-cols-2">${a.blocks.map(e=>`
      <div class="rounded-[1.5rem] bg-white p-6">
        <h3 class="display text-[1.6rem]">${e.title}</h3>
        <ul class="mt-3 grid gap-2">${e.items.map(e=>`<li class="flex gap-3 leading-snug"><span class="mt-[0.5em] size-2 shrink-0 rounded-full bg-aco" aria-hidden="true"></span>${e}</li>`).join(``)}</ul>
      </div>`).join(``)}
    </div>`;let s=o.final;i(`#final`).innerHTML=`
    <h2 class="display max-w-[14ch] text-[clamp(2.6rem,7vw,6rem)]">${s.title}</h2>
    <p class="mt-5 max-w-[34rem] text-lg opacity-85">${s.text}</p>
    <a class="btn btn-hot mt-8" href="${n(s.msg)}" target="_blank" rel="noopener">${s.cta} ${c}</a>`,i(`#top-wa`).href=n(s.msg)}t(),g(),m(),h();