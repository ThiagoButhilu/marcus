/*
  Textos em inglês. Mesma estrutura de pt.js.
  STATIC traduz os textos fixos do index.html: a chave é o texto em português, exatamente como está no HTML.
  Se um texto do HTML mudar, atualize a chave aqui também (senão ele fica em português na versão em inglês).
*/
export default {
  htmlLang: 'en',
  ogLocale: 'en_US',

  DAYS: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

  REASONS: [
    { now: 'Running out of breath on the first flight of stairs.', gain: 'Fitness is what makes the day feel lighter. Breath, energy and better sleep are health you can feel.' },
    { now: 'Starting on Monday and quitting by Thursday.', gain: 'Consistency is built. With an organized routine and close guidance, the habit sticks and willpower stops being the plan.' },
    { now: 'Paying for a gym you never use.', gain: 'A well-prescribed program wastes neither time nor money. And taking care of your body today is prevention for tomorrow.' },
    { now: 'Dieting and watching the weight come back.', gain: 'Losing weight while training preserves muscle. The result lasts because your body changes too, not just your plate.' },
    { now: 'Training for months and seeing no change.', gain: 'Muscle growth needs progressive load, the right volume and rest. Without a plan, it is just repetition.' },
  ],

  VARS: {
    vol: { name: 'Volume', hint: 'How many sets you accumulate in a week.' },
    int: { name: 'Intensity', hint: 'How close to your limit each set gets.' },
    freq: { name: 'Frequency', hint: 'How many days a week you train.' },
    rest: { name: 'Rest', hint: 'Sleep, breaks and easy days between workouts.' },
  },

  VERDICTS: {
    low: { title: 'Low stimulus.', text: 'It is safe, but your body has no reason to change. You can ask for more.' },
    over: { title: 'Load above recovery.', text: 'This is the road to fatigue, plateaus and injury. Your training needs adjusting.' },
    spare: { title: 'Recovery to spare.', text: 'You rest more than you need. There is room for more volume or intensity.' },
    ok: { title: 'Progress zone.', text: 'Stimulus and recovery in balance. That is exactly what the assessment looks for.' },
  },

  MODS: {
    saude: {
      alt: 'Marcus Thomaz with his bike on a foggy road',
      title: 'Health and well-being', line: 'To live longer and better.',
      text: 'Training, sleep, everyday movement and respect for your history. A body cared for to last, not just for the next photo.',
      tags: ['Longevity', 'Prevention', 'Energy'],
    },
    comportamental: {
      alt: 'Marcus Thomaz riding alone up a long road',
      title: 'Behavior', line: 'Discipline that becomes habit.',
      text: 'Results come from what you repeat. An organized routine, step-by-step goals and close follow-up so you do not depend on motivation.',
      tags: ['Habit', 'Discipline', 'Consistency'],
    },
    economico: {
      alt: 'Marcus Thomaz cycling on a country road',
      title: 'Cost-effective', line: 'Results without waste.',
      text: 'Every session has a purpose: no paying for random workouts or wasting time at the gym. The plan fits your location, your equipment and the format that suits your routine.',
      tags: ['Value for money', 'Time well spent', 'In person or online'],
    },
    emagrecimento: {
      alt: 'Marcus Thomaz sweating on a stationary bike at the gym',
      title: 'Weight loss', line: 'Lose fat, keep muscle.',
      text: 'Strength and conditioning, HIIT included, dosed for your level and built into a realistic routine. Lose weight in a way that keeps it off.',
      tags: ['Fat loss', 'Conditioning', 'HIIT'],
    },
    hipertrofia: {
      alt: "Marcus Thomaz's sweaty face after a set at the gym",
      title: 'Muscle growth', line: 'Progressive load, with technique.',
      text: 'Strength training built for your body and your week. Corrected form, logged loads and planned progression, no random workouts.',
      tags: ['Weight training', 'Strength', 'Technique'],
    },
  },

  STEPS: [
    { name: 'Sign-up', text: 'You choose in person or online and confirm the plan.' },
    { name: 'Health form', text: 'An interactive form about your goal, history and routine. You learn as you answer.' },
    { name: 'Video call', text: 'We review your form together, with notes and recommendations.' },
    { name: 'First workout', text: 'Your program, built for your real week. The routine begins.' },
    { name: 'Feedback', text: 'You tell me how it went: loads, fatigue, soreness and routine.' },
    { name: 'Adjustment', text: 'Your training is readjusted based on your feedback. Then the cycle starts again.' },
  ],

  FORMATS: {
    presencial: {
      title: 'Right by your side.',
      items: ['Form corrected on the spot, set by set.', 'Load and volume adjusted during the workout.', 'Ideal for beginners or anyone who needs technique.'],
    },
    online: {
      title: 'Training on your phone.',
      items: ['A plan built for where you train.', 'Follow-up by video and message.', 'Ideal for busy schedules or training far away.'],
    },
  },

  FAQ: [
    ['Do I need experience?', 'No. The assessment sets your starting point, whether it is your first workout or a comeback after time off.'],
    ['In person or online, which one?', 'It depends on your routine and how much live correction you need. We decide together in the assessment.'],
    ['Does it work for cyclists or runners?', 'Yes. Strength and conditioning are built around your outdoor training, so one does not get in the way of the other.'],
    ['What if I have an injury or health issue?', 'Tell me in the assessment. Your training respects your history and, when it makes sense, is aligned with your doctor.'],
    ['What happens after I sign up?', 'You fill out the health form, we review everything on a video call and training begins. After that, your feedback adjusts every cycle.'],
    ['How much does it cost?', 'It depends on the format and frequency. Request an assessment and get the options on WhatsApp.'],
  ],

  GOALS: ['Lose weight', 'Build muscle', 'Health and well-being', 'Build consistency', 'Cycling or running performance', 'Get back to training'],

  PLAN: {
    'Lose weight': ['Strength', 'HIIT', 'Strength', 'Light cardio', 'Strength', 'Active walk', 'Mobility'],
    'Build muscle': ['Strength A', 'Strength B', 'Strength C', 'Strength D', 'Strength E', 'Light cardio', 'Mobility'],
    'Cycling or running performance': ['Strength', 'Intervals', 'Easy ride', 'Strength', 'Long session', 'Mobility', 'Recovery'],
    'Health and well-being': ['Strength', 'Walk', 'Strength', 'Mobility', 'Strength', 'Active walk', 'Stretch'],
    'Build consistency': ['Strength', 'Walk', 'Strength', 'Mobility', 'Light strength', 'Active walk', 'Stretch'],
    'Get back to training': ['Adaptation', 'Walk', 'Adaptation', 'Mobility', 'Light strength', 'Active walk', 'Stretch'],
  },

  FORMAT_CHOICES: ['In person', 'Online', 'Not sure yet'],

  UI: {
    hero: {
      desktop: [['TRAIN', 'WITHOUT'], ['SHORTCUTS.']],
      mobile: [['TRAIN'], ['WITHOUT'], ['SHORTCUTS.']],
      hollow: 'WITHOUT',
      week: (n) => `Week ${n}`,
      shortcut: 'shortcut',
      noShortcut: 'shortcut: doesn’t exist',
    },
    stops: { top: 'Start', marcus: 'Marcus', mitos: 'Why', variaveis: 'Variables', treinos: 'Pillars', metodo: 'How', contato: 'Assessment' },
    menu: { open: 'Menu', close: 'Close' },
    reasons: {
      now: 'Today', gain: 'With training', flip: 'Tap to flip ↻',
      count: (i, n) => `${i} of ${n}`,
      aria: (i, n, text) => `Reason ${i} of ${n}: ${text} Tap to see what training changes.`,
    },
    vars: {
      hint: 'Drag a bar to change the dose.',
      prefill: ({ vol, int, freq, rest }) => `I played with the variables on the website: volume ${vol}/10, intensity ${int}/10, ${freq} ${freq === 1 ? 'day' : 'days'} a week and rest ${rest}/10. I want to get this right for real.`,
    },
    pillars: {
      cta: 'I want this',
      goTo: (t) => `Go to ${t}`,
      prefill: (t) => `I saw the ${t} pillar on the website and want to know how it works for me.`,
    },
    method: {
      phases: ['Before you start', 'Training', 'Every cycle'],
      loop: 'Feedback and adjustment repeat every cycle: your training evolves with you.',
    },
    wheel: { photo: 'Photo of Marcus Thomaz in the center of a bicycle wheel', logo: 'Bicycle wheel with the MT logo in the center' },
    deck: {
      postSaude: 'Instagram post (in Portuguese): more health, fewer excuses. Have you been paying proper attention to your health?',
      postEnergia: 'Instagram post (in Portuguese): energy, vitality and health. That is what you deserve every day.',
      postHabitos: 'Instagram post (in Portuguese): your body reflects your habits. What is it saying about you today?',
      pedalAlt: 'Marcus Thomaz cycling on a road',
      subidaAlt: 'Marcus Thomaz riding his bike up a hill',
      logoAlt: 'Marcus Thomaz, personal trainer',
      askPre: 'Do you really', ask: 'Train?', askSub: 'Get to know your training variables.',
      promise: 'Committed to your results.',
      reel: 'Strength on the climb', reelTag: 'Reel',
      reelAlt: 'Video: Marcus Thomaz riding a mountain bike up a trail',
      pbAlt: 'Marcus Thomaz cycling on a road, in black and white',
      costasAlt: 'Marcus Thomaz seen from behind, cycling on a country road',
    },
    faq: { hello: 'Hi! I’m Marcus. What would you like to know before getting started?', cta: 'Request my assessment' },
    contact: {
      hello: 'Hi, Marcus! I found you through your website and would like to request an assessment.',
      step: (i, n) => `Step ${i} of ${n}`,
      ready: 'All set',
      goal: 'What is your goal?',
      days: 'Which days can you train?',
      daysCount: (n) => `${n} ${n === 1 ? 'day' : 'days'} a week.`,
      daysEmpty: 'Tap the days you can train.',
      next: 'Continue',
      format: 'In person or online?',
      name: 'What should I call you?',
      nameLabel: 'Your name', namePh: 'Your first name',
      noteLabel: 'Anything else you’d like to share?', optional: '(optional)', notePh: 'Injuries, routine, a race you want to do...',
      seeWeek: 'See my week',
      week: (name) => `${name}, here is a possible week.`,
      free: 'Free', session: 'Workout',
      weekNote: 'An initial suggestion. Your real plan comes from the assessment.',
      send: 'Send on WhatsApp', redo: 'Start over',
      nameError: 'Write your name so Marcus knows who he is talking to.',
      sent: 'We opened WhatsApp with your message ready. Just hit send.',
      msg: {
        intro: (name) => `Hi, Marcus! I’m ${name} and I would like to request an assessment.`,
        goal: (g) => `My goal: ${g}.`,
        days: (list) => `I can train on: ${list}.`,
        format: (f) => `Format: ${f}.`,
      },
    },
  },

  /* textos fixos do index.html: português → inglês */
  STATIC: {
    'Marcus Thomaz | Personal Trainer, treino sem atalhos': 'Marcus Thomaz | Personal Trainer, training without shortcuts',
    'Marcus Thomaz, personal trainer. Saúde e bem-estar, comportamento, emagrecimento e hipertrofia, com disciplina, seriedade e compromisso com o seu resultado. Presencial e online.':
      'Marcus Thomaz, personal trainer. Health and well-being, behavior, weight loss and muscle growth, with discipline, seriousness and commitment to your results. In person and online.',
    'Treino sem atalhos. Disciplina, seriedade e compromisso com o seu resultado.': 'Training without shortcuts. Discipline, seriousness and commitment to your results.',
    'Pular para o conteúdo': 'Skip to content',
    'Marcus Thomaz, início': 'Marcus Thomaz, home',
    'Seções': 'Sections',
    'Idioma': 'Language',
    'Variáveis': 'Variables',
    'Pilares': 'Pillars',
    'Como funciona': 'How it works',
    'Perguntas': 'Questions',
    'Pedir avaliação': 'Request an assessment',
    'Por que treinar': 'Why train',
    'Chamar no WhatsApp': 'Message on WhatsApp',
    'Treino sem atalhos.': 'Train without shortcuts.',
    'Semana 1': 'Week 1',
    'Disciplina, seriedade e um compromisso: o seu resultado. Eu prescrevo, acompanho e ajusto o seu treino, presencial ou online.':
      'Discipline, seriousness and one commitment: your results. I prescribe, follow and adjust your training, in person or online.',
    'Ver como funciona': 'See how it works',
    'Role': 'Scroll',
    'Roda de bicicleta com as letras MT no centro': 'Bicycle wheel with the letters MT in the center',
    'Treina o que prescreve': 'Trains what he prescribes',
    'Marcus Thomaz é personal trainer e vive o que ensina, da musculação ao pedal. Trabalha com autenticidade, disciplina e seriedade, e se compromete com uma coisa só: o seu resultado. Disciplina não é frase de efeito, é o que se repete toda semana.':
      'Marcus Thomaz is a personal trainer who lives what he teaches, from the weight room to the bike. He works with authenticity, discipline and seriousness, and commits to one thing only: your results. Discipline is not a catchphrase, it is what you repeat every week.',
    'Como você prefere treinar?': 'How do you prefer to train?',
    'Formato do treino': 'Training format',
    'Presencial': 'In person',
    'Por que': 'Why',
    'treinar?': 'train?',
    'Condicionamento físico não é vaidade, é o que sustenta o seu dia. Toque em cada cartão: na frente, o que você vive hoje; atrás, o que o treino muda.':
      'Fitness is not vanity, it is what carries you through the day. Tap each card: on the front, what you live with today; on the back, what training changes.',
    'Cartão anterior': 'Previous card',
    'Próximo cartão': 'Next card',
    'As variáveis do seu treino': 'Your training variables',
    'Volume, intensidade, frequência e descanso. Mexa nas barras e veja o que acontece com a sua semana. Acertar isso no palpite é o atalho mais caro que existe.':
      'Volume, intensity, frequency and rest. Move the bars and see what happens to your week. Guessing this is the most expensive shortcut there is.',
    'Arraste as barras': 'Drag the bars',
    'Sua semana, com esses números': 'Your week, with these numbers',
    'Gráfico de carga por dia da semana': 'Training load chart by day of the week',
    'Estímulo': 'Stimulus',
    'Recuperação': 'Recovery',
    'Ajustar isso para mim': 'Adjust this for me',
    'Simulação ilustrativa. A sua dose real sai da avaliação.': 'Illustrative simulation. Your real dose comes from the assessment.',
    'Os cinco pilares do serviço': 'The five pillars of the service',
    'O serviço: cinco pilares': 'The service: five pillars',
    'Do papel ao suor': 'From paper to sweat',
    'Seis passos. Os três primeiros acontecem uma vez; depois, o seu treino segue num ciclo de feedback e ajuste.': 'Six steps. The first three happen once; after that, your training runs on a cycle of feedback and adjustment.',
    'Treino no dia a dia': 'Training, day to day',
    'Saúde, hábitos e rotina: os assuntos que o Marcus publica, do jeito que ele publica. Arraste os cartões.':
      'Health, habits and routine: the topics Marcus posts about, the way he posts them. Drag the cards.',
    'Seguir no Instagram': 'Follow on Instagram',
    'Cartões do perfil. Arraste ou use as setas do teclado.': 'Profile cards. Drag or use the arrow keys.',
    'Pergunte antes de começar': 'Ask before you start',
    'Escolha uma pergunta e a resposta aparece aqui mesmo.': 'Pick a question and the answer shows up right here.',
    'Peça sua avaliação': 'Request your assessment',
    'Responda quatro perguntas rápidas, veja uma semana de exemplo e a mensagem já abre no WhatsApp do Marcus. É só enviar.':
      'Answer four quick questions, see a sample week and the message opens straight in Marcus’s WhatsApp. Just hit send.',
    'Atendimento': 'Sessions',
    'Presencial e online': 'In person and online',
    'Voltar': 'Back',
    '© 2026 Marcus Thomaz, personal trainer': '© 2026 Marcus Thomaz, personal trainer',
    'Voltar ao topo ↑': 'Back to top ↑',
    'Navegar pela página': 'Navigate the page',
    'Início': 'Start',
    'Chamar o Marcus no WhatsApp': 'Message Marcus on WhatsApp',
  },
}
