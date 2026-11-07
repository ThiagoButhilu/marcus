import { SITE } from './data.js'

export const $ = (s, r = document) => r.querySelector(s)
export const $$ = (s, r = document) => [...r.querySelectorAll(s)]
export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const smooth = (t) => t * t * (3 - 2 * t)

export const waLink = (text) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

/** Perfil de altimetria: a mesma subida decora o herói e vira o mapa da página na barra de baixo. */
export const profile = (t) =>
  clamp(0.1 + 0.72 * Math.pow(t, 1.12) + 0.055 * Math.sin(t * 13 + 0.6) + 0.04 * Math.sin(t * 5.2 + 1.3), 0.04, 0.96)

/** Roda `fn` no próximo frame, no máximo uma vez por frame. */
export function frame(fn) {
  let queued = false
  return (...a) => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => { queued = false; fn(...a) })
  }
}
