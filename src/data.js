import { C } from './i18n.js'
import fotoSaude from './assets/pilar-saude.webp'
import fotoComportamental from './assets/pilar-comportamental.webp'
import fotoEconomico from './assets/pilar-economico.webp'
import fotoEmagrecimento from './assets/pilar-emagrecimento.webp'
import fotoHipertrofia from './assets/pilar-hipertrofia.webp'

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

/*
  "o quê": os cinco pilares do serviço. tone: cor do texto do topo sobre o painel ('light' = texto escuro).
  pos: ponto da foto que fica sempre à vista quando ela é recortada (object-position).
*/
export const MODS = [
  { key: 'saude', bg: '#98b7ba', fg: '#000000', tone: 'light', photo: fotoSaude, pos: '48% 72%' },
  { key: 'comportamental', bg: '#274c5f', fg: '#faf7f0', tone: 'dark', photo: fotoComportamental, pos: '50% 82%' },
  { key: 'economico', bg: '#bcc3c4', fg: '#000000', tone: 'light', photo: fotoEconomico, pos: '62% 60%' },
  { key: 'emagrecimento', bg: '#000000', fg: '#faf7f0', tone: 'dark', photo: fotoEmagrecimento, pos: '45% 40%' },
  { key: 'hipertrofia', bg: '#3a687b', fg: '#faf7f0', tone: 'dark', photo: fotoHipertrofia, pos: '42% 35%' },
].map((m) => ({ ...m, ...C.MODS[m.key] }))
