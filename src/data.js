import { C } from './i18n.js'

/*
  Tudo o que muda de conteúdo mora aqui e em content/ (pt.js e en.js).
  Aqui ficam contatos, cores e números; os textos vêm do idioma ativo.
  Fonte: perfil @personal.marcusthomaz (bio, WhatsApp e assuntos dos posts).
*/
export const SITE = {
  name: 'Marcus Thomaz',
  whatsapp: '5527999122547',
  phone: '(27) 99912-2547',
  instagram: 'personal.marcusthomaz',
  // foto do Marcus: coloque o arquivo em /public (ex.: public/marcus.jpg) e escreva 'marcus.jpg'
  photo: 'marcus.webp',
}

export const { DAYS, REASONS, VERDICTS, STEPS, FORMATS, FAQ, GOALS, PLAN, FORMAT_CHOICES } = C

/* faders da seção "variáveis" */
export const VARS = [
  { id: 'vol', min: 1, max: 10, val: 5, unit: '/10' },
  { id: 'int', min: 1, max: 10, val: 6, unit: '/10' },
  { id: 'freq', min: 1, max: 7, val: 4, unit: 'd' },
  { id: 'rest', min: 1, max: 10, val: 7, unit: '/10' },
].map((v) => ({ ...v, ...C.VARS[v.id] }))

/* "o quê": os cinco pilares do serviço. tone: cor do texto do topo sobre o painel ('light' = texto escuro) */
export const MODS = [
  { key: 'saude', bg: '#98b7ba', fg: '#000000', tone: 'light' },
  { key: 'comportamental', bg: '#274c5f', fg: '#faf7f0', tone: 'dark' },
  { key: 'economico', bg: '#bcc3c4', fg: '#000000', tone: 'light' },
  { key: 'emagrecimento', bg: '#000000', fg: '#faf7f0', tone: 'dark' },
  { key: 'hipertrofia', bg: '#3a687b', fg: '#faf7f0', tone: 'dark' },
].map((m) => ({ ...m, ...C.MODS[m.key] }))
