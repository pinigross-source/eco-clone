export const explainerProducts = [
  { slug: 'biologic-mini', name: 'BioLogic Mini', coverage: 300, price: 98, noiseDb: 25, text: 'Bedrooms, nurseries, offices, pet corners.' },
  { slug: 'biotica-800', name: 'Biotica 800', coverage: 800, price: 299, text: 'Living rooms, open plans, shared spaces. Plug in once.' },
  { slug: 'ebiotic-pro', name: 'E-Biotic Pro', coverage: 25000, price: null, text: 'Whole buildings through your HVAC, up to 25,000 sq ft.' },
] as const;
export const explainerTrial = { days: 30, startsAt: 'delivery', returnShippingPaid: true } as const;
export const explainerFaqs = [
  { question: 'Is it an air purifier?', answer: "No. It doesn't filter air. It releases natural probiotics that settle on surfaces and fabrics, where odor-causing bacteria, mold and allergens build up." },
  { question: 'How soon will I notice a difference?', answer: 'Probiotics take two to three weeks to settle across a room. Give it 30 days; if you don’t notice the difference, we refund you in full.' },
  { question: 'Does it replace cleaning?', answer: "No. It works between cleanings, on the surfaces you can't clean every hour. Spills, accidents and litter still need cleaning up." },
  { question: 'Is it safe around kids and pets?', answer: 'EnviroBiotics is registered with the EPA (Reg. No. 94339-1); use it as the label directs. The devices are MADE SAFE certified and PTPA parent-tested.' },
  { question: 'How often do I change the cartridge?', answer: 'About every 90 days. Auto-Refill can send them for you.' },
  { question: 'Is it noisy?', answer: 'The BioLogic Mini runs under 25 dB, quiet enough for a nightstand.' },
];
