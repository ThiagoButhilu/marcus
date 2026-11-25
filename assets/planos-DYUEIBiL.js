import{A as e,O as t,_ as n,l as r,n as i,t as a,y as o}from"./lib-GFDg2r0D.js";var s=t.PLANS_PAGE,c=new Intl.NumberFormat(t.htmlLang,{style:`currency`,currency:`BRL`}).format,l=`<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12L12 4M5 4h7v7"/></svg>`,u=(e,t,n=``)=>`
  <p class="sub mb-4 text-[1.05rem] opacity-70">${e}</p>
  <h2 class="display max-w-[16ch] text-[clamp(2.6rem,7vw,6rem)]">${t}</h2>
  ${n?`<p class="mt-5 max-w-[36rem] text-lg leading-relaxed opacity-85">${n}</p>`:``}`,d=e=>Object.keys(e.prices),f=e=>Math.min(...Object.values(e.prices)),p={group:`A`,item:Object.keys(s.groups.A.items)[0],option:`12`,pair:!1},m=(e,t,n,r,i)=>`
  <button type="button" class="plan-opt" role="radio" aria-checked="${i}" data-set="${e}" data-value="${t}">
    <span class="block">${n}</span>${r?`<span class="block text-[0.82rem] font-medium opacity-70">${r}</span>`:``}
  </button>`;function h(){let e=a(`#builder`),t=()=>o.find(e=>e.code===p.group),u=()=>{let e=t(),n=s.groups[e.code],r=s.builder,i=Object.entries(n.items),a=d(e);return`
      ${i.length>1?`
        <p class="sub mt-2 text-[0.95rem] opacity-70">${r.format}</p>
        <div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="${r.format}">${i.map(([e,t])=>m(`item`,e,t,e,p.item===e)).join(``)}</div>`:``}
      <p class="sub mt-6 text-[0.95rem] opacity-70">${e.kind===`pacote`?r.sessions:r.period}</p>
      <div class="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="${e.kind===`pacote`?r.sessions:r.period}">${a.map(t=>e.kind===`pacote`?m(`option`,t,s.sessionsLabel(t),s.sessionHints[t],p.option===t):m(`option`,t,s.periods[t],t===`mensal`?``:r.save(Math.round((1-e.prices[t]/e.prices.mensal)*100)),p.option===t)).join(``)}
      </div>
      ${e.pair?`
        <label class="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-white p-4">
          <input type="checkbox" class="mt-1 size-5 accent-[#274c5f]" data-pair ${p.pair?`checked`:``} />
          <span><b class="block">${r.pair}</b><span class="text-[0.92rem] opacity-70">${r.pairHint}</span></span>
        </label>`:``}
      ${e.minPeople?`<p class="mt-5 rounded-2xl bg-white p-4 text-[0.95rem]">${r.minPeople}</p>`:``}`},h=()=>{let e=t(),i=s.groups[e.code],a=s.builder,o=e.prices[p.option],u=`${p.item} · ${i.name}${Object.keys(i.items).length>1?` (${i.items[p.item]})`:``}`,d=e.kind===`pacote`?s.sessionsLabel(p.option):s.periods[p.option],f=e.pair&&p.pair,m=r(a.msg(u,d,e.kind===`pacote`?c(o):`${c(o)} ${a.perMonth}`,f)),h=!f&&n[`${p.item}:${p.option}`],g=/^https:\/\//.test(h||``)?h:``;return`
      <p class="sub text-[0.95rem] opacity-70">${u}</p>
      <p class="display mt-2 text-[clamp(2.8rem,6vw,4.4rem)] tabular-nums" aria-live="polite">${c(o)}</p>
      <p class="text-[1rem] opacity-80">${e.kind===`pacote`?`${a.perPackage} · ${a.perSession(c(o/+p.option))}`:a.perMonth} · ${d}</p>
      ${f?`<p class="mt-3 rounded-2xl bg-white/10 px-4 py-3 text-[1rem]">${a.pairLine(c(o*e.pair),c(o*(1+e.pair)))}</p>`:``}
      <p class="sub mt-6 text-[0.95rem] opacity-70">${a.includes}</p>
      <ul class="mt-2 grid gap-2">${i.includes.map(e=>`<li class="flex gap-3 text-[1rem] leading-snug"><span class="mt-[0.5em] size-2 shrink-0 rounded-full bg-bruma" aria-hidden="true"></span>${e}</li>`).join(``)}</ul>
      ${g?`<div class="mt-7 flex flex-wrap items-center gap-3">
            <a class="btn btn-hot !whitespace-normal" href="${g}" target="_blank" rel="noopener">${a.pay} ${l}</a>
            <a class="btn btn-line !whitespace-normal" href="${m}" target="_blank" rel="noopener">${a.ask}</a>
          </div>
          <p class="mt-4 text-[0.9rem] opacity-65">${a.payNote}</p>`:`<a class="btn btn-hot mt-7 !whitespace-normal" href="${m}" target="_blank" rel="noopener">${a.cta} ${l}</a>
          <p class="mt-4 text-[0.9rem] opacity-65">${a.payment}</p>`}`};e.innerHTML=`
    <h2 class="display text-[clamp(2.6rem,7vw,6rem)]">${s.builder.title}</h2>
    <p class="sub mt-8 text-[1.05rem]">${s.builder.step1}</p>
    <div class="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" role="radiogroup" aria-label="${s.builder.step1}">${o.map(e=>{let t=s.groups[e.code];return`
      <button type="button" class="plan-card" role="radio" aria-checked="${p.group===e.code}" data-set="group" data-value="${e.code}">
        <span class="sub text-[0.85rem] opacity-70">${t.tag}</span>
        <span class="display mt-1 block text-[1.6rem]">${t.name}</span>
        <span class="mt-2 block text-[0.95rem] leading-snug opacity-80">${t.desc}</span>
        <span class="sub mt-4 block text-[0.95rem]">${s.builder.from(c(f(e)))}${e.kind===`pacote`?``:` ${s.builder.perMonth}`}</span>
      </button>`}).join(``)}
    </div>
    <div class="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div><p class="sub text-[1.05rem]">${s.builder.step2}</p><div id="details" class="mt-1"></div></div>
      <div id="plan-result" class="tone-dark rounded-[1.75rem] bg-petroleo p-6 text-gelo md:p-8 lg:sticky lg:top-24"></div>
    </div>`;let g=()=>{i(`[data-set="group"]`,e).forEach(e=>e.setAttribute(`aria-checked`,String(e.dataset.value===p.group))),a(`#details`,e).innerHTML=u(),a(`#plan-result`,e).innerHTML=h()};e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-set]`);if(!t)return;let{set:n,value:r}=t.dataset;if(n===`group`&&r!==p.group){let e=o.find(e=>e.code===r);p.group=r,p.item=Object.keys(s.groups[r].items)[0],p.option in e.prices||(p.option=e.kind===`pacote`?d(e).at(-1):`mensal`),e.pair||(p.pair=!1)}else p[n]=r;g()}),e.addEventListener(`change`,t=>{t.target.matches(`[data-pair]`)&&(p.pair=t.target.checked,a(`#plan-result`,e).innerHTML=h())}),g()}function g(){let e=s.table,t=e=>o.filter(t=>t.kind===e).flatMap(e=>Object.entries(s.groups[e.code].items).sort(([e],[t])=>e.localeCompare(t)).map(([t,n])=>`
    <tr class="border-t border-tinta/10">
      <th scope="row" class="py-3 pr-4 text-left font-semibold"><span class="sub mr-2 opacity-60">${t}</span>${s.groups[e.code].name}${Object.keys(s.groups[e.code].items).length>1?` · ${n}`:``}</th>
      ${d(e).map(t=>`<td class="py-3 pl-4 text-right tabular-nums">${c(e.prices[t])}</td>`).join(``)}
    </tr>`)).join(``),n=(n,r)=>{let i=o.find(e=>e.kind===r);return`
      <div class="mt-8 overflow-x-auto rounded-[1.5rem] bg-gelo p-4 md:p-6">
        <table class="w-full min-w-[34rem] text-[1rem]">
          <caption class="sub pb-3 text-left text-[1.05rem]">${n}<span class="ml-2 font-medium opacity-60 sm:hidden">${e.swipe}</span></caption>
          <thead><tr class="text-[0.9rem] opacity-70"><th scope="col" class="pb-2 text-left font-semibold">${e.modality}</th>${d(i).map(e=>`<th scope="col" class="pb-2 pl-4 text-right font-semibold">${r===`pacote`?s.sessionsLabel(e):s.periods[e]}</th>`).join(``)}</tr></thead>
          <tbody>${t(r)}</tbody>
        </table>
      </div>`};a(`#price-table`).innerHTML=`<h2 class="display text-[clamp(2.2rem,5vw,4rem)]">${e.title}</h2>${n(e.packages,`pacote`)}${n(e.consult,`periodo`)}`}function _(){let e=s.hero;a(`#plans-hero`).innerHTML=`
    <p class="sub mb-4 text-[1.05rem] opacity-70">${e.eyebrow}</p>
    <h1 class="display max-w-[14ch] text-[clamp(3rem,9vw,7.6rem)]">${e.title}</h1>
    <p class="mt-6 max-w-[38rem] text-lg leading-relaxed opacity-85">${e.text}</p>
    <p class="sub mt-8 inline-flex rounded-full px-4 pb-2 pt-2.5 text-[0.95rem] ring-1 ring-white/30">${e.cred}</p>`;let t=s.phases;a(`#phases`).innerHTML=`
    ${u(t.eyebrow,t.title,t.text)}
    <ol class="mt-10 grid gap-3 md:grid-cols-3">${t.items.map(e=>`
      <li class="rounded-[1.5rem] bg-gelo p-6"><span class="display text-[2.4rem] opacity-30">${e.n}</span><h3 class="display mt-2 text-[1.8rem]">${e.name}</h3><p class="mt-2 text-[1.02rem] leading-snug opacity-85">${e.text}</p></li>`).join(``)}
    </ol>
    <div class="mt-10 grid gap-8 lg:grid-cols-2">
      <div>
        <p class="sub text-[1.05rem]">${t.partnersTitle}</p>
        <ul class="mt-3 grid gap-2">${t.partners.map(e=>`<li class="rounded-2xl bg-white/60 px-5 py-4 font-semibold">${e}</li>`).join(``)}</ul>
      </div>
      <div>
        <p class="sub text-[1.05rem]">${t.goalsTitle}</p>
        <ul class="mt-3 flex flex-wrap gap-2">${t.goals.map(e=>`<li class="tag">${e}</li>`).join(``)}</ul>
      </div>
    </div>`;let n=s.places;a(`#places`).innerHTML=`
    ${u(n.eyebrow,n.title)}
    <ul class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">${n.list.map(e=>`
      <li class="rounded-[1.5rem] bg-white/10 p-5"><b class="display block text-[1.35rem]">${e.name}</b><span class="mt-1 block opacity-75">${e.area}</span></li>`).join(``)}
    </ul>`;let i=s.rules;a(`#rules`).innerHTML=`
    ${u(i.eyebrow,i.title)}
    <div class="mt-10 grid gap-3 md:grid-cols-2">${i.blocks.map(e=>`
      <div class="rounded-[1.5rem] bg-white p-6">
        <h3 class="display text-[1.6rem]">${e.title}</h3>
        <ul class="mt-3 grid gap-2">${e.items.map(e=>`<li class="flex gap-3 leading-snug"><span class="mt-[0.5em] size-2 shrink-0 rounded-full bg-aco" aria-hidden="true"></span>${e}</li>`).join(``)}</ul>
      </div>`).join(``)}
    </div>`;let o=s.final;a(`#final`).innerHTML=`
    <h2 class="display max-w-[14ch] text-[clamp(2.6rem,7vw,6rem)]">${o.title}</h2>
    <p class="mt-5 max-w-[34rem] text-lg opacity-85">${o.text}</p>
    <a class="btn btn-hot mt-8" href="${r(o.msg)}" target="_blank" rel="noopener">${o.cta} ${l}</a>`,a(`#top-wa`).href=r(o.msg)}e(),_(),h(),g();