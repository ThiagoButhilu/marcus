/*
  Tudo o que muda de conteúdo mora aqui.
  Fonte: perfil @personal.marcusthomaz (bio, WhatsApp e assuntos dos posts).
  Serviço (pilares), motivos (por quê) e processo (como) seguem o briefing do Marcus de 10/11/2026.
*/
export const SITE = {
  name: 'Marcus Thomaz',
  whatsapp: '5527999122547',
  phone: '(27) 99912-2547',
  instagram: 'personal.marcusthomaz',
  // foto do Marcus: coloque o arquivo em /public (ex.: public/marcus.jpg) e escreva 'marcus.jpg'
  photo: 'marcus.webp',
}

export const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

/* "por quê": na frente, o que a pessoa vive hoje; atrás, o que o condicionamento muda (um por pilar) */
export const REASONS = [
  { now: 'Perder o fôlego no primeiro lance de escada.', gain: 'Condicionamento é o que faz o dia pesar menos. Fôlego, disposição e sono melhor são saúde que você sente.' },
  { now: 'Começar na segunda e parar na quinta.', gain: 'Constância se constrói. Com rotina organizada e acompanhamento, o hábito fica e a força de vontade deixa de ser o plano.' },
  { now: 'Pagar academia que você não usa.', gain: 'Treino bem prescrito não desperdiça tempo nem dinheiro. E cuidar do corpo hoje é prevenção para amanhã.' },
  { now: 'Fazer dieta e ver o peso voltar.', gain: 'Emagrecer treinando preserva músculo. O resultado dura porque o corpo muda junto, não só o prato.' },
  { now: 'Treinar há meses e o corpo não mudar.', gain: 'Hipertrofia pede carga que progride, volume certo e descanso. Sem plano, é só repetição.' },
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

/* "o quê": os cinco pilares do serviço. tone: cor do texto do topo sobre o painel ('light' = texto escuro) */
export const MODS = [
  {
    key: 'saude', title: 'Saúde e bem-estar', line: 'Para viver mais e melhor.',
    text: 'Treino, sono, movimento no dia a dia e respeito ao seu histórico. O corpo cuidado para durar, não só para a próxima foto.',
    tags: ['Longevidade', 'Prevenção', 'Disposição'], bg: '#98b7ba', fg: '#000000', tone: 'light',
  },
  {
    key: 'comportamental', title: 'Comportamental', line: 'Disciplina que vira hábito.',
    text: 'O resultado vem do que se repete. Rotina organizada, metas por etapa e acompanhamento próximo para você não depender de motivação.',
    tags: ['Hábito', 'Disciplina', 'Constância'], bg: '#274c5f', fg: '#faf7f0', tone: 'dark',
  },
  {
    key: 'economico', title: 'Econômico', line: 'Resultado sem desperdício.',
    text: 'Cada sessão tem propósito: nada de pagar por treino aleatório ou perder tempo na academia. O plano é feito para o seu local, o seu equipamento e o formato que cabe na sua rotina.',
    tags: ['Custo-benefício', 'Tempo bem usado', 'Presencial ou online'], bg: '#bcc3c4', fg: '#000000', tone: 'light',
  },
  {
    key: 'emagrecimento', title: 'Emagrecimento', line: 'Perder gordura, manter músculo.',
    text: 'Força e condicionamento, HIIT incluso, dosados para o seu nível e somados a uma rotina possível. Emagrecer de um jeito que o peso não volte.',
    tags: ['Perda de gordura', 'Condicionamento', 'HIIT'], bg: '#000000', fg: '#faf7f0', tone: 'dark',
  },
  {
    key: 'hipertrofia', title: 'Hipertrofia', line: 'Carga que progride, com técnica.',
    text: 'Treino de força montado para o seu corpo e a sua semana. Execução corrigida, cargas registradas e progressão planejada, sem treino aleatório.',
    tags: ['Musculação', 'Força', 'Técnica'], bg: '#3a687b', fg: '#faf7f0', tone: 'dark',
  },
]

/* "como": o processo, do primeiro contato à evolução do treino */
export const STEPS = [
  { name: 'Contratação', text: 'Você escolhe o formato, presencial ou online, e confirma o plano. A partir daqui o compromisso é com o seu resultado.' },
  { name: 'Anamnese', text: 'Um formulário interativo sobre objetivo, histórico, lesões e rotina. Enquanto responde, você já aprende os conceitos do seu treino.' },
  { name: 'Videochamada', text: 'Revisamos juntos a sua anamnese, com apontamentos e recomendações antes do primeiro treino.' },
  { name: 'Início', text: 'O treino montado para a sua semana real: dias disponíveis, tempo, local e equipamento. A rotina começa.' },
  { name: 'Feedback', text: 'Você conta como foi: cargas, cansaço, dores e o que encaixou na rotina. Nada é ajustado no palpite.' },
  { name: 'Ajuste', text: 'Com o seu feedback, volume, intensidade e descanso são reajustados a cada ciclo. O treino evolui com você.' },
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
  ['O que acontece depois que eu contrato?', 'Você preenche a anamnese, a gente revisa tudo numa videochamada e o treino começa. Depois, o seu feedback ajusta cada ciclo.'],
  ['Quanto custa?', 'Depende do formato e da frequência. Peça a avaliação e receba as opções pelo WhatsApp.'],
]

export const GOALS = ['Emagrecer', 'Hipertrofia', 'Saúde e bem-estar', 'Criar constância', 'Performance no pedal ou na corrida', 'Voltar a treinar']

/* sessões sugeridas por objetivo, na ordem em que entram nos dias escolhidos */
export const PLAN = {
  'Emagrecer': ['Força', 'HIIT', 'Força', 'Cardio leve', 'Força', 'Passeio ativo', 'Mobilidade'],
  'Hipertrofia': ['Força A', 'Força B', 'Força C', 'Força D', 'Força E', 'Cardio leve', 'Mobilidade'],
  'Performance no pedal ou na corrida': ['Força', 'Intervalado', 'Rodagem leve', 'Força', 'Treino longo', 'Mobilidade', 'Regenerativo'],
  'Saúde e bem-estar': ['Força', 'Caminhada', 'Força', 'Mobilidade', 'Força', 'Passeio ativo', 'Alongar'],
  'Criar constância': ['Força', 'Caminhada', 'Força', 'Mobilidade', 'Força leve', 'Passeio ativo', 'Alongar'],
  'Voltar a treinar': ['Adaptação', 'Caminhada', 'Adaptação', 'Mobilidade', 'Força leve', 'Passeio ativo', 'Alongar'],
}

export const FORMAT_CHOICES = ['Presencial', 'Online', 'Ainda não sei']
