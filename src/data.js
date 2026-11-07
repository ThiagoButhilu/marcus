/*
  Tudo o que muda de conteúdo mora aqui.
  Fonte: perfil @personal.marcusthomaz (bio, WhatsApp e assuntos dos posts).
  Os textos de serviço são rascunhos baseados na bio: confirme com o Marcus antes de publicar.
*/
export const SITE = {
  name: 'Marcus Thomaz',
  whatsapp: '5527999122547',
  phone: '(27) 99912-2547',
  instagram: 'personal.marcusthomaz',
  // foto do Marcus: coloque o arquivo em /public (ex.: public/marcus.jpg) e escreva 'marcus.jpg'
  photo: '',
}

export const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

export const MYTHS = [
  { myth: 'Treinar até não aguentar mais.', truth: 'Falha em todo treino cobra caro. A intensidade se dosa, e quem manda é o plano.' },
  { myth: 'Suar muito é treinar bem.', truth: 'Suor é o corpo se resfriando, não uma métrica. O que conta é a carga somada na semana.' },
  { myth: 'O treino da internet serve para mim.', truth: 'Foi montado para outra pessoa, com outra rotina e outro histórico. O seu começa na avaliação.' },
  { myth: 'Descansar é perder tempo.', truth: 'É no descanso que o corpo se adapta. Sem ele, a conta do treino não fecha.' },
  { myth: 'Musculação e cardio brigam.', truth: 'Bem organizados, um ajuda o outro. Pergunte a quem pedala e levanta peso.' },
]

/* faders da seção "variáveis" */
export const VARS = [
  { id: 'vol', name: 'Volume', min: 1, max: 10, val: 5, unit: '/10', hint: 'Quantas séries você acumula na semana.' },
  { id: 'int', name: 'Intensidade', min: 1, max: 10, val: 6, unit: '/10', hint: 'Quão perto do limite cada série chega.' },
  { id: 'freq', name: 'Frequência', min: 1, max: 7, val: 4, unit: 'd', hint: 'Em quantos dias da semana você treina.' },
  { id: 'rest', name: 'Descanso', min: 1, max: 10, val: 7, unit: '/10', hint: 'Sono, pausas e dias leves entre os treinos.' },
]

export const VERDICTS = {
  low: { title: 'Estímulo baixo.', text: 'É seguro, mas o corpo não tem motivo para mudar. Dá para pedir mais.' },
  over: { title: 'Carga acima da recuperação.', text: 'Esse é o caminho do cansaço, do platô e da lesão. Aqui o treino pede ajuste.' },
  spare: { title: 'Recuperação sobrando.', text: 'Você descansa mais do que precisa. Dá para subir volume ou intensidade.' },
  ok: { title: 'Zona de progresso.', text: 'Estímulo e recuperação conversando. É esse equilíbrio que a avaliação procura.' },
}

/* tone: cor do texto do topo sobre o painel ('light' = texto escuro) */
export const MODS = [
  {
    key: 'forca', title: 'Musculação', line: 'Força com técnica, carga que progride.',
    text: 'Treino de força montado para o seu corpo e a sua semana. Execução corrigida, cargas registradas e progressão planejada, sem treino aleatório.',
    tags: ['Hipertrofia', 'Força', 'Técnica'], bg: '#ff5a36', fg: '#0e1011', tone: 'light',
  },
  {
    key: 'hiit', title: 'HIIT', line: 'Da teoria à prática.',
    text: 'Treino intervalado de alta intensidade, dosado para render no tempo que você tem. Menos minutos no relógio, com intensidade que faz sentido para o seu nível.',
    tags: ['Condicionamento', 'Treino curto', 'Intervalado'], bg: '#0e1011', fg: '#eef0ef', tone: 'dark',
  },
  {
    key: 'endurance', title: 'Ciclismo e endurance', line: 'Pedal e corrida com plano.',
    text: 'Musculação e condicionamento organizados em volta do seu treino de rua, para você render mais sem que um atrapalhe o outro.',
    tags: ['Base aeróbia', 'Força para atletas', 'Prova'], bg: '#ffb23e', fg: '#0e1011', tone: 'light',
  },
  {
    key: 'saude', title: 'Saúde e rotina', line: 'Para viver mais e melhor.',
    text: 'Treino, sono, movimento no dia a dia e constância. Eu organizo a rotina que sustenta o resultado depois da primeira semana.',
    tags: ['Rotina', 'Longevidade', 'Constância'], bg: '#17382c', fg: '#eef0ef', tone: 'dark',
  },
]

export const STEPS = [
  { name: 'Avaliação', text: 'Conversa sobre objetivo, histórico, lesões e rotina. É daqui que sai o ponto de partida.' },
  { name: 'Prescrição', text: 'O treino montado para a sua semana real: dias disponíveis, tempo, local e equipamento.' },
  { name: 'Acompanhamento', text: 'Presencial ou online, com a execução corrigida e as cargas registradas.' },
  { name: 'Ajuste', text: 'A cada ciclo, volume, intensidade e descanso são reajustados. O treino muda com você.' },
]

export const FORMATS = {
  presencial: {
    title: 'Eu do seu lado.',
    items: ['Execução corrigida na hora, série por série.', 'Carga e volume ajustados durante o treino.', 'Ideal para começar ou para quem precisa de técnica.'],
  },
  online: {
    title: 'Treino no seu celular.',
    items: ['Plano montado para o seu local de treino.', 'Acompanhamento por vídeo e mensagem.', 'Ideal para agenda corrida ou para quem treina longe.'],
  },
}

export const FAQ = [
  ['Preciso ter experiência?', 'Não. A avaliação define o ponto de partida, seja o seu primeiro treino ou a volta depois de um tempo parado.'],
  ['Presencial ou online, qual escolher?', 'Depende da sua rotina e de quanta correção ao vivo você precisa. Na avaliação a gente decide junto.'],
  ['Serve para quem pedala ou corre?', 'Serve. A musculação e o condicionamento entram em volta do seu treino de rua, sem um atrapalhar o outro.'],
  ['E se eu tiver lesão ou problema de saúde?', 'Conte na avaliação. O treino respeita o seu histórico e, quando fizer sentido, é alinhado com o seu médico.'],
  ['Quanto custa?', 'Depende do formato e da frequência. Peça a avaliação e receba as opções pelo WhatsApp.'],
]

export const GOALS = ['Emagrecer', 'Ganhar massa', 'Performance no pedal ou na corrida', 'Saúde e rotina', 'Voltar a treinar']

/* sessões sugeridas por objetivo, na ordem em que entram nos dias escolhidos */
export const PLAN = {
  'Emagrecer': ['Força', 'HIIT', 'Força', 'Cardio leve', 'Força', 'Passeio ativo', 'Mobilidade'],
  'Ganhar massa': ['Força A', 'Força B', 'Força C', 'Força D', 'Força E', 'Cardio leve', 'Mobilidade'],
  'Performance no pedal ou na corrida': ['Força', 'Intervalado', 'Rodagem leve', 'Força', 'Treino longo', 'Mobilidade', 'Regenerativo'],
  'Saúde e rotina': ['Força', 'Caminhada', 'Força', 'Mobilidade', 'Força', 'Passeio ativo', 'Alongar'],
  'Voltar a treinar': ['Adaptação', 'Caminhada', 'Adaptação', 'Mobilidade', 'Força leve', 'Passeio ativo', 'Alongar'],
}

export const FORMAT_CHOICES = ['Presencial', 'Online', 'Ainda não sei']
