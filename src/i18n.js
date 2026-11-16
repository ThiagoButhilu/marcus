import pt from './content/pt.js'
import en from './content/en.js'

/*
  Idiomas: português (padrão) e inglês.
  Ordem de escolha: ?lang= na URL (bom para compartilhar), a escolha salva no navegador
  e, sem nenhuma das duas, o idioma do navegador (português fica em português; o resto vê inglês).
  Trocar de idioma salva a escolha e recarrega a página: cada seção monta o HTML uma vez só.
*/
const LANGS = { pt, en }

const saved = () => { try { return localStorage.getItem('lang') } catch { return null } }
const pick = () => {
  const q = new URLSearchParams(location.search).get('lang')
  if (LANGS[q]) return q
  if (LANGS[saved()]) return saved()
  return (navigator.languages || [navigator.language]).some((l) => /^pt\b/i.test(l || '')) ? 'pt' : 'en'
}

export const lang = pick()
export const C = LANGS[lang]
export const UI = C.UI

export function setLang(next) {
  if (next === lang || !LANGS[next]) return
  try { localStorage.setItem('lang', next) } catch {}
  const url = new URL(location.href)
  if (url.searchParams.has('lang')) {
    url.searchParams.set('lang', next)
    location.href = url
  } else location.reload()
}

/** Troca os textos fixos do index.html (escritos em português) e liga o seletor PT/EN. */
export function initI18n() {
  const root = document.documentElement
  root.lang = C.htmlLang
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', C.ogLocale)

  const dict = C.STATIC
  if (dict) {
    const tr = (s) => { const k = s.trim(); return dict[k] ? s.replace(k, dict[k]) : s }
    document.title = tr(document.title)
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    for (let n = walk.nextNode(); n; n = walk.nextNode()) if (n.nodeValue.trim()) n.nodeValue = tr(n.nodeValue)
    document.querySelectorAll('[aria-label], [placeholder], [alt], meta[name="description"], meta[property^="og:"]').forEach((el) => {
      for (const a of ['aria-label', 'placeholder', 'alt', 'content']) if (el.hasAttribute(a)) el.setAttribute(a, tr(el.getAttribute(a)))
    })
  }

  document.querySelectorAll('[data-lang]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang))
    b.addEventListener('click', () => setLang(b.dataset.lang))
  })
}
