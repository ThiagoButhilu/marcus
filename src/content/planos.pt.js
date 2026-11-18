/*
  Página de planos (planos.html), em português.
  Fonte: "Programa de Condicionamento Físico e Nutricional", versão 2026. Valores ficam em data.js (PLANS).
*/
export default {
  hero: {
    eyebrow: 'Planos e investimento',
    title: 'Escolha como treinar com o Marcus',
    text: 'Personal presencial ou on-line, treino em grupo reduzido ou consultoria. Monte o seu plano, veja o valor e contrate pelo WhatsApp.',
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
    payment: 'Pagamento via PIX ou cartão de crédito (Asaas), sempre antes do início das orientações.',
    minPeople: 'Mínimo de 3 alunos, nos mesmos dias e horários.',
    msg: (plan, detail, price, pair) => `Olá, Marcus! Vim pela página de planos e quero contratar: ${plan}${detail ? `, ${detail}` : ''} (${price}).${pair ? ' Vou treinar em dupla.' : ''} Como seguimos?`,
  },

  /* uma entrada por modalidade, pela letra do código */
  groups: {
    A: {
      name: 'Personal Trainer', tag: 'Individual',
      desc: 'Acompanhamento 100% exclusivo, presencial ou por videoconferência.',
      items: { 'A.1': 'Presencial', 'A.2': 'Videoconferência' },
      includes: ['Avaliação inicial e reavaliação', 'Treino de força e aeróbio montado para você', 'Execução corrigida em cada sessão', 'Treino em dupla com 50% para o segundo aluno'],
    },
    B: {
      name: 'Small Group', tag: 'Grupo reduzido',
      desc: 'Treino em grupo pequeno, de pelo menos 3 alunos, presencial ou on-line.',
      items: { 'B.1': 'On-line, em casa', 'B.2': 'Presencial' },
      includes: ['Avaliação inicial e reavaliação', 'Treino em grupo de no mínimo 3 alunos', 'Mesmos dias e horários para o grupo'],
    },
    C: {
      name: 'Consultoria', tag: 'Digital',
      desc: 'Planejamento e suporte contínuo pelo aplicativo, no seu ritmo.',
      items: { 'C.1': 'Consultoria Personal Trainer' },
      includes: ['Treino individual a partir da anamnese e da avaliação biomecânica', 'Aplicativo com vídeos e descrição de cada exercício', 'Plantão tira-dúvidas com resposta em até 6 horas'],
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
    partnersTitle: 'Parceiros indicados',
    partners: [
      { name: 'Dr. Rafael Altoé', role: 'Cardiologia · Cardiodiagnóstico Vila Velha', ig: 'drrafaelaltoe' },
      { name: 'Dra. Amy Joy Foster', role: 'Nutrição esportiva', ig: 'amy_jf' },
      { name: 'O Tal Natural', role: 'Refeições alinhadas à dieta (opcional)', ig: 'otalnatural' },
    ],
    goalsTitle: 'Objetivos do programa',
    goals: ['Pressão arterial, colesterol e glicemia sob controle', 'Menos gordura, mais massa magra', 'Mais fôlego (VO₂ máx.) e resistência', 'Reeducação alimentar sustentável'],
  },

  places: {
    eyebrow: 'Onde',
    title: 'Presencial em Vitória ou on-line',
    list: [
      { name: 'Academia Wellness', area: 'Praia de Camburi' },
      { name: 'Academia Ponto 1', area: 'Praia do Canto' },
      { name: 'Academia Bodytech', area: 'Enseada do Suá' },
      { name: 'Academia Vitória Sports', area: 'Praia do Canto' },
      { name: 'Videoconferência', area: 'De onde você estiver' },
    ],
  },

  rules: {
    eyebrow: 'Condições',
    title: 'Regras claras, do primeiro dia',
    blocks: [
      { title: 'Pagamento', items: ['PIX ou cartão de crédito pela plataforma Asaas.', 'Mensalidade a cada 30 dias, paga antes do início das orientações.', 'Não há restituição de valores em nenhuma modalidade.'] },
      { title: 'Prazos e reposição', items: ['O pacote vale por 30 dias corridos, com tolerância de até 5 dias para ausências justificadas.', 'Fora desse prazo não há reposição.', 'Atrasos não são compensados: a rotina do dia tem até 1 hora para ser concluída.'] },
      { title: 'Agenda', items: ['Reagendamentos com no mínimo 24 horas de antecedência, conforme a agenda do personal.', 'Reajustes de valor podem acontecer com aviso prévio de no mínimo 30 dias.'] },
      { title: 'Consultoria digital', items: ['Prescrição individual a partir de anamnese e avaliação biomecânica.', 'Aplicativo com vídeos de execução e descrição do treino.', 'Plantão tira-dúvidas com resposta em até 6 horas.'] },
    ],
  },

  final: { title: 'Ficou alguma dúvida?', text: 'Fale direto com o Marcus e escolha o plano junto com ele.', cta: 'Chamar no WhatsApp', msg: 'Olá, Marcus! Vi a página de planos e tenho uma dúvida.' },
}
