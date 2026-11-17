/*
  Textos em português (idioma padrão).
  Serviço (pilares), motivos (por quê) e processo (como) seguem o briefing do Marcus de 10/11/2026.
  Cores, números e contatos ficam em data.js; aqui só o que muda de idioma.
  Os textos fixos do index.html já estão em português; a versão em inglês deles fica em en.js (STATIC).
*/
export default {
  htmlLang: 'pt-BR',
  ogLocale: 'pt_BR',

  DAYS: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],

  /* "por quê": na frente, o que a pessoa vive hoje; atrás, o que o condicionamento muda (um por pilar) */
  REASONS: [
    { now: 'Perder o fôlego no primeiro lance de escada.', gain: 'Condicionamento é o que faz o dia pesar menos. Fôlego, disposição e sono melhor são saúde que você sente.' },
    { now: 'Começar na segunda e parar na quinta.', gain: 'Constância se constrói. Com rotina organizada e acompanhamento, o hábito fica e a força de vontade deixa de ser o plano.' },
    { now: 'Pagar academia que você não usa.', gain: 'Treino bem prescrito não desperdiça tempo nem dinheiro. E cuidar do corpo hoje é prevenção para amanhã.' },
    { now: 'Fazer dieta e ver o peso voltar.', gain: 'Emagrecer treinando preserva músculo. O resultado dura porque o corpo muda junto, não só o prato.' },
    { now: 'Treinar há meses e o corpo não mudar.', gain: 'Hipertrofia pede carga que progride, volume certo e descanso. Sem plano, é só repetição.' },
  ],

  /* faders da seção "variáveis", pelo id */
  VARS: {
    vol: { name: 'Volume', hint: 'Quantas séries você acumula na semana.' },
    int: { name: 'Intensidade', hint: 'Quão perto do limite cada série chega.' },
    freq: { name: 'Frequência', hint: 'Em quantos dias da semana você treina.' },
    rest: { name: 'Descanso', hint: 'Sono, pausas e dias leves entre os treinos.' },
  },

  VERDICTS: {
    low: { title: 'Estímulo baixo.', text: 'É seguro, mas o corpo não tem motivo para mudar. Dá para pedir mais.' },
    over: { title: 'Carga acima da recuperação.', text: 'Esse é o caminho do cansaço, do platô e da lesão. Aqui o treino pede ajuste.' },
    spare: { title: 'Recuperação sobrando.', text: 'Você descansa mais do que precisa. Dá para subir volume ou intensidade.' },
    ok: { title: 'Zona de progresso.', text: 'Estímulo e recuperação conversando. É esse equilíbrio que a avaliação procura.' },
  },

  /* "o quê": os cinco pilares do serviço, pela chave */
  MODS: {
    saude: {
      alt: 'Marcus Thomaz com a bicicleta numa estrada com neblina',
      title: 'Saúde e bem-estar', line: 'Para viver mais e melhor.',
      text: 'Treino, sono, movimento no dia a dia e respeito ao seu histórico. O corpo cuidado para durar, não só para a próxima foto.',
      tags: ['Longevidade', 'Prevenção', 'Disposição'],
    },
    comportamental: {
      alt: 'Marcus Thomaz subindo sozinho uma estrada longa de bicicleta',
      title: 'Comportamental', line: 'Disciplina que vira hábito.',
      text: 'O resultado vem do que se repete. Rotina organizada, metas por etapa e acompanhamento próximo para você não depender de motivação.',
      tags: ['Hábito', 'Disciplina', 'Constância'],
    },
    economico: {
      alt: 'Marcus Thomaz pedalando numa estrada rural',
      title: 'Econômico', line: 'Resultado sem desperdício.',
      text: 'Cada sessão tem propósito: nada de pagar por treino aleatório ou perder tempo na academia. O plano é feito para o seu local, o seu equipamento e o formato que cabe na sua rotina.',
      tags: ['Custo-benefício', 'Tempo bem usado', 'Presencial ou online'],
    },
    emagrecimento: {
      alt: 'Marcus Thomaz suado na bicicleta ergométrica da academia',
      title: 'Emagrecimento', line: 'Perder gordura, manter músculo.',
      text: 'Força e condicionamento, HIIT incluso, dosados para o seu nível e somados a uma rotina possível. Emagrecer de um jeito que o peso não volte.',
      tags: ['Perda de gordura', 'Condicionamento', 'HIIT'],
    },
    hipertrofia: {
      alt: 'Rosto suado do Marcus Thomaz depois de uma série na academia',
      title: 'Hipertrofia', line: 'Carga que progride, com técnica.',
      text: 'Treino de força montado para o seu corpo e a sua semana. Execução corrigida, cargas registradas e progressão planejada, sem treino aleatório.',
      tags: ['Musculação', 'Força', 'Técnica'],
    },
  },

  /* "como": o processo em seis etapas; as fases e a volta do ciclo ficam em UI.method */
  STEPS: [
    { name: 'Contratação', text: 'Você escolhe presencial ou online e confirma o plano.' },
    { name: 'Anamnese', text: 'Um formulário interativo sobre objetivo, histórico e rotina. Você já aprende enquanto responde.' },
    { name: 'Videochamada', text: 'Revisamos juntos a sua anamnese, com apontamentos e recomendações.' },
    { name: 'Primeiro treino', text: 'O treino montado para a sua semana real. A rotina começa.' },
    { name: 'Feedback', text: 'Você conta como foi: cargas, cansaço, dores e rotina.' },
    { name: 'Ajuste', text: 'Com o seu feedback, o treino é reajustado. E o ciclo recomeça.' },
  ],

  FORMATS: {
    presencial: {
      title: 'Eu do seu lado.',
      items: ['Execução corrigida na hora, série por série.', 'Carga e volume ajustados durante o treino.', 'Ideal para começar ou para quem precisa de técnica.'],
    },
    online: {
      title: 'Treino no seu celular.',
      items: ['Plano montado para o seu local de treino.', 'Acompanhamento por vídeo e mensagem.', 'Ideal para agenda corrida ou para quem treina longe.'],
    },
  },

  FAQ: [
    ['Preciso ter experiência?', 'Não. A avaliação define o ponto de partida, seja o seu primeiro treino ou a volta depois de um tempo parado.'],
    ['Presencial ou online, qual escolher?', 'Depende da sua rotina e de quanta correção ao vivo você precisa. Na avaliação a gente decide junto.'],
    ['Serve para quem pedala ou corre?', 'Serve. A musculação e o condicionamento entram em volta do seu treino de rua, sem um atrapalhar o outro.'],
    ['E se eu tiver lesão ou problema de saúde?', 'Conte na avaliação. O treino respeita o seu histórico e, quando fizer sentido, é alinhado com o seu médico.'],
    ['O que acontece depois que eu contrato?', 'Você preenche a anamnese, a gente revisa tudo numa videochamada e o treino começa. Depois, o seu feedback ajusta cada ciclo.'],
    ['Quanto custa?', 'Depende do formato e da frequência. Peça a avaliação e receba as opções pelo WhatsApp.'],
  ],

  GOALS: ['Emagrecer', 'Hipertrofia', 'Saúde e bem-estar', 'Criar constância', 'Performance no pedal ou na corrida', 'Voltar a treinar'],

  /* sessões sugeridas por objetivo, na ordem em que entram nos dias escolhidos */
  PLAN: {
    'Emagrecer': ['Força', 'HIIT', 'Força', 'Cardio leve', 'Força', 'Passeio ativo', 'Mobilidade'],
    'Hipertrofia': ['Força A', 'Força B', 'Força C', 'Força D', 'Força E', 'Cardio leve', 'Mobilidade'],
    'Performance no pedal ou na corrida': ['Força', 'Intervalado', 'Rodagem leve', 'Força', 'Treino longo', 'Mobilidade', 'Regenerativo'],
    'Saúde e bem-estar': ['Força', 'Caminhada', 'Força', 'Mobilidade', 'Força', 'Passeio ativo', 'Alongar'],
    'Criar constância': ['Força', 'Caminhada', 'Força', 'Mobilidade', 'Força leve', 'Passeio ativo', 'Alongar'],
    'Voltar a treinar': ['Adaptação', 'Caminhada', 'Adaptação', 'Mobilidade', 'Força leve', 'Passeio ativo', 'Alongar'],
  },

  FORMAT_CHOICES: ['Presencial', 'Online', 'Ainda não sei'],

  /* textos que os scripts escrevem na página */
  UI: {
    hero: {
      desktop: [['TREINO', 'SEM'], ['ATALHOS.']],
      mobile: [['TREINO'], ['SEM'], ['ATALHOS.']],
      hollow: 'SEM',
      week: (n) => `Semana ${n}`,
      shortcut: 'atalho',
      noShortcut: 'atalho: não existe',
    },
    stops: { top: 'Início', marcus: 'Marcus', mitos: 'Por quê', variaveis: 'Variáveis', treinos: 'Pilares', metodo: 'Como', contato: 'Avaliação' },
    menu: { open: 'Menu', close: 'Fechar' },
    reasons: {
      now: 'Hoje', gain: 'Com treino', flip: 'Toque para virar ↻',
      count: (i, n) => `${i} de ${n}`,
      aria: (i, n, text) => `Motivo ${i} de ${n}: ${text} Toque para ver o que o treino muda.`,
    },
    vars: {
      hint: 'Arraste uma barra para mudar a dose.',
      prefill: ({ vol, int, freq, rest }) => `Brinquei com as variáveis no site: volume ${vol}/10, intensidade ${int}/10, ${freq} ${freq === 1 ? 'dia' : 'dias'} por semana e descanso ${rest}/10. Quero ajustar isso de verdade.`,
    },
    pillars: {
      cta: 'Quero esse',
      goTo: (t) => `Ir para ${t}`,
      prefill: (t) => `Vi o pilar ${t} no site e quero saber como funciona para o meu caso.`,
    },
    method: {
      phases: ['Antes de começar', 'Treino', 'A cada ciclo'],
      loop: 'Feedback e ajuste se repetem a cada ciclo: o treino evolui com você.',
    },
    wheel: { photo: 'Foto do Marcus Thomaz no centro de uma roda de bicicleta', logo: 'Roda de bicicleta com o logo MT no centro' },
    deck: {
      postSaude: 'Post do Instagram: mais saúde, menos desculpas. Você tem dado a devida atenção à sua saúde?',
      postEnergia: 'Post do Instagram: energia, disposição e saúde. É isso que você merece todos os dias.',
      postHabitos: 'Post do Instagram: seu corpo é o reflexo dos seus hábitos. O que ele está dizendo sobre você hoje?',
      pedalAlt: 'Marcus Thomaz pedalando numa estrada',
      subidaAlt: 'Marcus Thomaz subindo uma ladeira de bicicleta',
      logoAlt: 'Marcus Thomaz, personal trainer',
      askPre: 'Será que você', ask: 'Treina?', askSub: 'Conheça as variáveis do seu treino.',
      promise: 'Compromisso com o seu resultado.',
      reel: 'Força na ladeira', reelTag: 'Reel',
      reelAlt: 'Vídeo: Marcus Thomaz subindo uma trilha de mountain bike',
      pbAlt: 'Marcus Thomaz pedalando numa estrada, em preto e branco',
      costasAlt: 'Marcus Thomaz de costas, pedalando numa estrada rural',
    },
    faq: { hello: 'Oi! Sou o Marcus. O que você quer saber antes de começar?', cta: 'Pedir minha avaliação' },
    contact: {
      hello: 'Olá, Marcus! Vim pelo site e quero pedir uma avaliação.',
      step: (i, n) => `Passo ${i} de ${n}`,
      ready: 'Tudo pronto',
      goal: 'Qual é o seu objetivo?',
      days: 'Em quais dias você consegue treinar?',
      daysCount: (n) => `${n} ${n === 1 ? 'dia' : 'dias'} por semana.`,
      daysEmpty: 'Toque nos dias em que você consegue treinar.',
      next: 'Continuar',
      format: 'Presencial ou online?',
      name: 'Como posso te chamar?',
      nameLabel: 'Seu nome', namePh: 'Seu primeiro nome',
      noteLabel: 'Quer contar mais alguma coisa?', optional: '(opcional)', notePh: 'Lesões, rotina, prova que quer fazer...',
      seeWeek: 'Ver a minha semana',
      week: (name) => `${name}, essa é uma semana possível.`,
      free: 'Livre', session: 'Treino',
      weekNote: 'Sugestão inicial. O plano de verdade sai da avaliação.',
      send: 'Enviar no WhatsApp', redo: 'Refazer',
      nameError: 'Escreva seu nome para o Marcus saber com quem está falando.',
      sent: 'Abrimos o WhatsApp com a sua mensagem pronta. É só enviar.',
      msg: {
        intro: (name) => `Olá, Marcus! Sou ${name} e quero pedir uma avaliação.`,
        goal: (g) => `Meu objetivo: ${g}.`,
        days: (list) => `Consigo treinar em: ${list}.`,
        format: (f) => `Formato: ${f}.`,
      },
    },
  },
}
