export const explainerProducts = [
  { slug: 'biologic-mini', name: 'BioLogic Mini', coverage: 300, price: 98, noiseDb: 25, text: 'Bedrooms, nurseries, offices, pet corners.' },
  { slug: 'biotica-800', name: 'Biotica 800', coverage: 800, price: 299, text: 'Living rooms, open plans, basements, shared spaces. Plug in once.' },
  { slug: 'ebiotic-pro', name: 'E-Biotic Pro', coverage: 25000, price: null, text: 'Whole buildings through your HVAC, up to 25,000 sq ft.' },
] as const;
export const explainerTrial = { days: 30, startsAt: 'delivery', returnShippingPaid: true } as const;
export const explainerFaqs = [
  { question: 'Is it an air purifier?', answer: "No. It doesn't filter air. It releases natural probiotics that settle on surfaces and fabrics, where odor-causing bacteria, mold and allergens build up, and keep working there." },
  { question: "Wait, you're adding bacteria to my home?", answer: 'Yes, the good kind. Every surface already carries microbes; EnviroBiotics adds beneficial probiotics so they, not odor-causing bacteria and mold, take up the space. The product is EPA registered (Reg. No. 94339-1); use it as the label directs.' },
  { question: 'Does it help with allergies?', answer: "It works on allergen proteins from dust mites, pet dander and mold on the surfaces where they settle. In lab testing, allergen levels on treated surfaces dropped within 8 days. It is not a medical device and does not treat any condition; keep following your doctor's advice." },
  { question: 'Will it get rid of mold I can already see?', answer: 'No. Visible mold needs to be cleaned or professionally removed, and the moisture source fixed. EnviroBiotics helps keep mold from taking hold again on the surfaces around it.' },
  { question: 'How soon will I notice a difference?', answer: 'Probiotics take two to three weeks to settle across a room. Give it 30 days; if you don’t notice the difference, we refund you in full.' },
  { question: 'Does it replace cleaning?', answer: "No. It works between cleanings, on the surfaces you can't clean every hour. Spills, accidents and litter still need cleaning up." },
  { question: 'Is it safe around kids and pets?', answer: 'EnviroBiotics is registered with the EPA (Reg. No. 94339-1); use it as the label directs. The devices are MADE SAFE certified and PTPA parent-tested.' },
  { question: 'Which device do I need?', answer: 'BioLogic Mini for one room up to 300 sq ft. Biotica 800 for open spaces up to 800 sq ft. E-Biotic Pro for whole buildings through the HVAC. Larger homes often use a Biotica 800 plus a Mini in the bedroom.' },
  { question: 'How often do I change the cartridge?', answer: 'About every 90 days. Auto-Refill can send them for you.' },
  { question: 'Is it noisy?', answer: 'The BioLogic Mini runs under 25 dB, quiet enough for a nightstand.' },
];
