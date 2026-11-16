import { $, reduced } from './lib.js'
import { FAQ } from './data.js'
import { UI } from './i18n.js'

/** Perguntas como conversa: escolher uma pergunta a coloca no chat e o Marcus responde. */
export function initFaq() {
  const log = $('#chat-log'), asks = $('#chat-asks')
  let busy = false

  const add = (cls, html) => {
    const el = document.createElement('div')
    el.className = `bubble ${cls}`
    el.innerHTML = html
    log.append(el)
    log.scrollTo({ top: log.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
    return el
  }

  add('him', UI.faq.hello)
  asks.innerHTML = FAQ.map(([q], i) => `<button type="button" class="ask" data-i="${i}">${q}</button>`).join('')

  asks.addEventListener('click', (e) => {
    const b = e.target.closest('.ask')
    if (!b || busy) return
    busy = true
    const [q, a] = FAQ[+b.dataset.i]
    b.remove()
    add('me', q)
    const typing = add('him typing', '<i></i><i></i><i></i>')
    setTimeout(() => {
      typing.className = 'bubble him'
      typing.innerHTML = a
      log.scrollTo({ top: log.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
      busy = false
      if (!asks.children.length) asks.innerHTML = `<a class="btn btn-hot" href="#contato">${UI.faq.cta}</a>`
    }, reduced ? 0 : 900)
  })
}
