/* Plans page (planos.html), in English. Same structure as planos.pt.js. */
export default {
  hero: {
    eyebrow: 'Plans and pricing',
    title: 'Choose how to train with Marcus',
    text: 'Online or in-person personal training, small group training or remote coaching. Build your plan, see the price and sign up on WhatsApp.',
    cred: 'Marcus Thomaz, exercise science specialist · CREF 5186/ES',
  },

  builder: {
    title: 'Build your plan',
    step1: '1. Type',
    step2: '2. Details',
    from: (v) => `from ${v}`,
    format: 'Format',
    sessions: 'Sessions in the package',
    period: 'Billing period',
    pair: 'I will train with a partner',
    pairHint: 'Same days and times. The second person pays 50%.',
    perPackage: 'per package (30 days)',
    perMonth: 'per month',
    perSession: (v) => `${v} per session`,
    pairLine: (v, total) => `+ ${v} for the second person · ${total} for both`,
    save: (p) => `${p}% less per month`,
    includes: 'Includes',
    cta: 'Sign up on WhatsApp',
    payment: 'Payment through the Asaas platform.',
    minPeople: 'At least 3 people, on the same days and times.',
    msg: (plan, detail, price, pair) => `Hi, Marcus! I found your plans page and would like to sign up for: ${plan}${detail ? `, ${detail}` : ''} (${price}).${pair ? ' I will train with a partner.' : ''} What are the next steps?`,
  },

  groups: {
    A: {
      name: 'Personal Trainer', tag: 'One-on-one',
      desc: '100% exclusive coaching, by video call or in person.',
      items: { 'A.2': 'Video call', 'A.1': 'In person' },
      includes: ['Initial assessment and reassessment', 'Strength and aerobic training built for you', 'Form corrected in every session', 'Partner training with 50% off for the second person'],
    },
    B: {
      name: 'Small Group', tag: 'Small group',
      desc: 'Training in a small group of at least 3 people, online or in person.',
      items: { 'B.1': 'Online, at home', 'B.2': 'In person' },
      includes: ['Initial assessment and reassessment', 'Group training with at least 3 people', 'Same days and times for the group'],
    },
    C: {
      name: 'Remote coaching', tag: 'Digital',
      desc: 'Planning and ongoing support through the app, at your own pace.',
      items: { 'C.1': 'Personal Trainer coaching' },
      includes: ['Health form and review by video call (20 min)', 'Program sent and adjusted whenever needed', 'Q&A channel on WhatsApp', 'Weekly attendance follow-up'],
    },
    D: {
      name: 'Coaching + Nutrition', tag: 'Complete',
      desc: 'Training coaching plus nutrition follow-up with Dr. Amy Joy Foster.',
      items: { 'D.1': 'Training + Nutrition coaching' },
      includes: ['Everything in Remote coaching', 'About 60 min nutrition consultation by video, with a follow-up within 20 days', 'New consultation and adjusted diet every 4 weeks'],
    },
  },
  sessionHints: { 8: 'about 2x a week', 10: '2 to 3x a week', 12: 'about 3x a week' },
  periods: { mensal: 'Monthly', trimestral: 'Quarterly', anual: 'Yearly' },
  sessionsLabel: (n) => `${n} sessions`,

  table: {
    title: 'Full price list',
    code: 'Code', modality: 'Type',
    packages: 'Session packages (30 days)',
    consult: 'Coaching (monthly price)',
    swipe: 'swipe sideways →',
  },

  phases: {
    eyebrow: 'What is included',
    title: 'One program, three phases',
    text: 'Every plan follows the same path: assess, train with a prescription and reassess to measure your progress.',
    items: [
      { n: 'I', name: 'Assessment', text: 'Cardiology check-up and cardiopulmonary exercise test (VO₂ max), sports nutrition consultation and physical assessment.' },
      { n: 'II', name: 'Prescription', text: 'A training routine that combines aerobic work (running, cycling) and strength training, with guidance and calorie control.' },
      { n: 'III', name: 'Reassessment', text: 'Comparison with your Phase I data and a report on your physical and metabolic progress.' },
    ],
    partnersTitle: 'Partner professionals',
    partners: ['Cardiologist', 'Sports nutritionist'],
    goalsTitle: 'Program goals',
    goals: ['Blood pressure, cholesterol and blood sugar under control', 'Less fat, more lean mass', 'Better endurance (VO₂ max)', 'Sustainable eating habits'],
  },

  places: {
    eyebrow: 'Where',
    title: 'Online or in person in Vitória, Brazil',
    list: [
      { name: 'Video call', area: 'Wherever you are' },
      { name: 'Academia Wellness', area: 'Praia de Camburi' },
      { name: 'Academia Ponto 1', area: 'Praia do Canto' },
      { name: 'Academia Bodytech', area: 'Enseada do Suá' },
      { name: 'Academia Vitória Sports', area: 'Praia do Canto' },
    ],
  },

  rules: {
    eyebrow: 'Terms',
    title: 'Clear rules from day one',
    blocks: [
      { title: 'Payment', items: ['Payment through the Asaas platform.', 'No refunds for any plan.'] },
      { title: 'Remote coaching', items: ['Health form.', 'Review together by video call (20 min).', 'Program sent to you.', 'Q&A channel on WhatsApp.', 'Weekly attendance follow-up.', 'Form to request program changes.', 'Updated program sent to you.'] },
    ],
  },

  final: { title: 'Still have questions?', text: 'Talk to Marcus directly and choose your plan together.', cta: 'Message on WhatsApp', msg: 'Hi, Marcus! I saw your plans page and have a question.' },
}
