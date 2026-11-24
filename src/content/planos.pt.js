/*
  Página de planos (planos.html), em português.
  Fonte: "Programa de Condicionamento Físico e Nutricional", versão 2026. Valores ficam em data.js (PLANS).
*/
export default {
  hero: {
    eyebrow: 'Planos e investimento',
    title: 'Escolha como treinar com o Marcus',
    text: 'Personal online ou presencial, treino em grupo reduzido ou consultoria. Monte o seu plano, veja o valor e contrate pelo WhatsApp.',
    cred: 'Prof. Esp. Marcus Thomaz · CREF 5186/ES',
  },

  builder: {
    title: 'Monte o seu plano',
    step1: '1. Modalidade',
    step2: '2. Detalhes',
    from: (v) => `a partir de ${v}`,
    format: 'Formato',
    sessions: 'Sessões no pacote',
    period: 'Período',
    pair: 'Vou treinar em dupla',
    pairHint: 'Mesmos dias e horários. O segundo aluno paga 50%.',
    perPackage: 'por pacote (30 dias)',
    perMonth: 'por mês',
    perSession: (v) => `${v} por sessão`,
    pairLine: (v, total) => `+ ${v} do segundo aluno · ${total} os dois`,
    save: (p) => `${p}% a menos por mês`,
    includes: 'Inclui',
    cta: 'Contratar pelo WhatsApp',
    payment: 'Pagamento pela plataforma Asaas.',
    minPeople: 'Mínimo de 3 alunos, nos mesmos dias e horários.',
    msg: (plan, detail, price, pair) => `Olá, Marcus! Vim pela página de planos e quero contratar: ${plan}${detail ? `, ${detail}` : ''} (${price}).${pair ? ' Vou treinar em dupla.' : ''} Como seguimos?`,
  },

  /* uma entrada por modalidade, pela letra do código */
  groups: {
    A: {
      name: 'Personal Trainer', tag: 'Individual',
      desc: 'Acompanhamento 100% exclusivo, por videoconferência ou presencial.',
      items: { 'A.2': 'Videoconferência', 'A.1': 'Presencial' },
      includes: ['Avaliação inicial e reavaliação', 'Treino de força e aeróbio montado para você', 'Execução corrigida em cada sessão', 'Treino em dupla com 50% para o segundo aluno'],
    },
    B: {
      name: 'Small Group', tag: 'Grupo reduzido',
      desc: 'Treino em grupo pequeno, de pelo menos 3 alunos, online ou presencial.',
      items: { 'B.1': 'Online, em casa', 'B.2': 'Presencial' },
      includes: ['Avaliação inicial e reavaliação', 'Treino em grupo de no mínimo 3 alunos', 'Mesmos dias e horários para o grupo'],
    },
    C: {
      name: 'Consultoria', tag: 'Digital',
      desc: 'Planejamento e suporte contínuo pelo aplicativo, no seu ritmo.',
      items: { 'C.1': 'Consultoria Personal Trainer' },
      includes: ['Anamnese e análise por videoconferência (20 min)', 'Prescrição enviada e ajustada sempre que preciso', 'Canal de dúvidas pelo WhatsApp', 'Acompanhamento semanal da frequência'],
    },
    D: {
      name: 'Consultoria + Nutrição', tag: 'Completo',
      desc: 'Consultoria de treino com acompanhamento nutricional da Dra. Amy Joy Foster.',
      items: { 'D.1': 'Consultoria Físico + Nutricional' },
      includes: ['Tudo da Consultoria', 'Consulta nutricional de cerca de 60 min por vídeo, com retorno em até 20 dias', 'Nova consulta e dieta ajustada a cada 4 semanas'],
    },
  },
  sessionHints: { 8: 'cerca de 2x por semana', 10: '2 a 3x por semana', 12: 'cerca de 3x por semana' },
  periods: { mensal: 'Mensal', trimestral: 'Trimestral', anual: 'Anual' },
  sessionsLabel: (n) => `${n} sessões`,

  table: {
    title: 'Tabela completa',
    code: 'Código', modality: 'Modalidade',
    packages: 'Pacotes de sessões (30 dias)',
    consult: 'Consultorias (valor mensal)',
    swipe: 'arraste para o lado →',
  },

  phases: {
    eyebrow: 'O que está incluído',
    title: 'Um programa, três fases',
    text: 'Todo plano segue o mesmo caminho: avaliar, treinar com prescrição e reavaliar para medir a evolução.',
    items: [
      { n: 'I', name: 'Avaliação', text: 'Checagem cardiológica e teste cardiopulmonar (VO₂ máx.), consulta nutricional esportiva e avaliação física.' },
      { n: 'II', name: 'Prescrição', text: 'Rotina de treino que combina estímulos aeróbios (corrida, ciclismo) e de força, com orientação e controle calórico.' },
      { n: 'III', name: 'Reavaliação', text: 'Comparação com os dados da Fase I e relatório de evolução física e metabólica.' },
    ],
    partnersTitle: 'Profissionais parceiros',
    partners: ['Cardiologista', 'Nutricionista esportiva'],
    goalsTitle: 'Objetivos do programa',
    goals: ['Pressão arterial, colesterol e glicemia sob controle', 'Menos gordura, mais massa magra', 'Mais fôlego (VO₂ máx.) e resistência', 'Reeducação alimentar sustentável'],
  },

  places: {
    eyebrow: 'Onde',
    title: 'Online ou presencial em Vitória',
    list: [
      { name: 'Videoconferência', area: 'De onde você estiver' },
      { name: 'Academia Wellness', area: 'Praia de Camburi' },
      { name: 'Academia Ponto 1', area: 'Praia do Canto' },
      { name: 'Academia Bodytech', area: 'Enseada do Suá' },
      { name: 'Academia Vitória Sports', area: 'Praia do Canto' },
    ],
  },

  rules: {
    eyebrow: 'Condições',
    title: 'Regras claras, do primeiro dia',
    blocks: [
      { title: 'Pagamento', items: ['Pagamento pela plataforma Asaas.', 'Não há restituição de valores em nenhuma modalidade.'] },
      { title: 'Consultoria digital', items: ['Anamnese.', 'Análise junto, por videoconferência (20 min).', 'Envio da prescrição.', 'Canal de dúvidas pelo WhatsApp.', 'Acompanhamento semanal da frequência.', 'Formulário para alteração da prescrição.', 'Envio da nova prescrição.'] },
    ],
  },

  final: { title: 'Ficou alguma dúvida?', text: 'Fale direto com o Marcus e escolha o plano junto com ele.', cta: 'Chamar no WhatsApp', msg: 'Olá, Marcus! Vi a página de planos e tenho uma dúvida.' },
}
