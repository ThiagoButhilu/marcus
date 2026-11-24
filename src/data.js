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

/* reels do Instagram que aparecem no baralho */
export const REELS = {
  treina: 'https://www.instagram.com/reel/DfX8preBiPP/',
  apresentacao: 'https://www.instagram.com/reel/De-NUmzg8Lm/',
}

export const { DAYS, REASONS, VERDICTS, STEPS, FAQ, GOALS, PLAN, FORMAT_CHOICES } = C

/* faders da seção "variáveis" */
export const VARS = [
  { id: 'vol', min: 1, max: 10, val: 5, unit: '/10' },
  { id: 'int', min: 1, max: 10, val: 6, unit: '/10' },
  { id: 'freq', min: 1, max: 7, val: 4, unit: 'd' },
  { id: 'rest', min: 1, max: 10, val: 7, unit: '/10' },
].map((v) => ({ ...v, ...C.VARS[v.id] }))

/*
  Calculadora de volume: faixa de referência de séries semanais por músculo (hipertrofia) e o valor de exemplo.
  10 a 20 séries é a referência geral; troque pelos números do Marcus quando ele mandar (cada músculo tem a sua faixa).
*/
export const MUSCLES = [
  { id: 'peito', min: 10, max: 20, val: 12 },
  { id: 'costas', min: 10, max: 20, val: 14 },
  { id: 'ombros', min: 10, max: 20, val: 8 },
  { id: 'biceps', min: 10, max: 20, val: 6 },
  { id: 'triceps', min: 10, max: 20, val: 9 },
  { id: 'quadriceps', min: 10, max: 20, val: 16 },
  { id: 'posteriores', min: 10, max: 20, val: 10 },
  { id: 'gluteos', min: 10, max: 20, val: 22 },
  { id: 'panturrilhas', min: 10, max: 20, val: 4 },
  { id: 'abdomen', min: 10, max: 20, val: 6 },
].map((m) => ({ ...m, name: C.MUSCLES[m.id] }))

/*
  Corrida e HIIT, da planilha do Marcus (aba "Teste de TLim; iVVO2 Máx; 2400").
  Teste de 2400 m: a base de cada tiro é o tempo dos 2400 m dividido por quantos tiros cabem nele;
  o alvo é uma fração desse tempo (fração menor = tiro mais rápido).
  As células de ritmo, km/h e base do 800 m da planilha usavam B57 no lugar de B47 (os segundos); aqui a conta usa o tempo certo.
*/
export const RUN_TEST_KM = 2.4
export const RUN_SPLITS = [
  { m: 400, div: 6, lo: 0.7, hi: 0.75 },
  { m: 800, div: 3, lo: 0.8, hi: 0.85 },
  { m: 1200, div: 2, lo: 0.9, hi: 0.95 },
]

/* HIIT: tempo total de tiros ≈ 3 × Tempo Limite (a 100% da iVO2máx); relações recuperação:esforço da planilha */
export const HIIT_EFFORT_X = 3
export const HIIT_RATIOS = ['10:1', '9:1', '8:1', '7:1', '6:1', '5:1', '4:1', '3:1', '2:1', '1:1', '1:2', '1:3', '1:4', '1:5', '1:6', '1:7', '1:8', '1:9', '1:10']

/*
  Planos e valores (Programa de Condicionamento Físico, versão 2026), em reais. Textos em content/planos.*.js.
  kind 'pacote': preço por pacote de sessões a cada 30 dias; kind 'periodo': valor mensal em cada plano.
  pair: fração paga pelo segundo aluno no treino em dupla; minPeople: mínimo de alunos do grupo.
*/
export const PLANS = [
  { code: 'A', kind: 'pacote', prices: { 8: 920, 10: 1150, 12: 1380 }, pair: 0.5 },
  { code: 'B', kind: 'pacote', prices: { 8: 414, 10: 517, 12: 621 }, minPeople: 3 },
  { code: 'C', kind: 'periodo', prices: { mensal: 345, trimestral: 316, anual: 290 } },
  { code: 'D', kind: 'periodo', prices: { mensal: 845, trimestral: 716, anual: 690 } },
]

/*
  "o quê": os cinco pilares do serviço. tone: cor do texto do topo sobre o painel ('light' = texto escuro).
  pos: ponto da foto que fica sempre à vista quando ela é recortada (object-position).
*/
export const MODS = [
  { key: 'saude', bg: '#98b7ba', fg: '#000000', tone: 'light', photo: fotoSaude, pos: '48% 72%' },
  { key: 'comportamental', bg: '#274c5f', fg: '#faf7f0', tone: 'dark', photo: fotoComportamental, pos: '50% 42%' },
  { key: 'economico', bg: '#bcc3c4', fg: '#000000', tone: 'light', photo: fotoEconomico, pos: '62% 60%' },
  { key: 'emagrecimento', bg: '#000000', fg: '#faf7f0', tone: 'dark', photo: fotoEmagrecimento, pos: '45% 40%' },
  { key: 'hipertrofia', bg: '#3a687b', fg: '#faf7f0', tone: 'dark', photo: fotoHipertrofia, pos: '42% 35%' },
].map((m) => ({ ...m, ...C.MODS[m.key] }))
