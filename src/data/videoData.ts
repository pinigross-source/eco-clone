export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  vimeoId: string;
  transcript?: string;
}

export const videoCategories = [
  {
    id: "innovation-mission",
    title: "The Mission and the Team",
    description: "",
  },
  {
    id: "solving-problems",
    title: "Innovation That Solves Problems",
    description: "",
  },
  {
    id: "products",
    title: "Smart Products",
    description: "See our product lineup in action",
  },
];

export const videos: Video[] = [
  // Innovation & Mission
  {
    id: "less-traveled-road",
    title: "Taking the Less Traveled Road",
    description: "Explore how a proactive technique protects us and our environment better",
    thumbnail: "/images/videos/less-traveled-road.jpg",
    category: "innovation-mission",
    vimeoId: "1050653030",
    transcript: "Traditional indoor air treatment focuses on reactive measures: filters that capture particles already in the air, and chemicals that kill on contact. EnviroBiotics takes a fundamentally different approach. By continuously dispersing beneficial Bacillus probiotics, we treat the source of contamination on surfaces, fabrics, and inside HVAC systems. This proactive method uses competitive exclusion, where beneficial bacteria consume the organic nutrients that harmful microorganisms need to survive. The result is a continuously protected indoor environment without chemicals, ozone, or VOCs.",
  },
  {
    id: "the-mission",
    title: "The Mission",
    description: "Our dedicated team is determined to assist with resolving global challenges",
    thumbnail: "/images/videos/the-mission.jpg",
    category: "innovation-mission",
    vimeoId: "812284268",
    transcript: "EnviroBiotics was founded with a clear mission: to create healthier indoor environments using nature's own mechanisms. Our team of microbiologists and engineers developed a system that harnesses beneficial Bacillus probiotics to treat indoor spaces. These probiotics are FDA GRAS certified, MADE SAFE certified, and EPA registered. Our goal is to shift the paradigm from reactive cleaning to proactive biological protection, making homes, schools, hospitals, and workplaces safer for everyone.",
  },
  {
    id: "research-production",
    title: "Research & Production",
    description: "Certified facilities foster high standards of Research & Production by a dedicated team",
    thumbnail: "/images/videos/research-production.jpg",
    category: "innovation-mission",
    vimeoId: "1042278823",
    transcript: "Every EnviroBiotics probiotic cartridge is produced in ISO 9001 certified facilities under strict quality controls. Our research team carefully selects and cultures Bacillus probiotic strains with proven safety profiles and beneficial properties. Each batch undergoes rigorous laboratory testing for purity, potency, and safety before production. Independent third-party laboratories verify our results, ensuring every product meets FDA GRAS, EPA, and MADE SAFE certification standards. This commitment to quality is what makes EnviroBiotics the trusted leader in probiotic air and surface purification.",
  },
  // Innovation That Solves Problems
  {
    id: "focus-fixing",
    title: "Focus on What Needs Fixing",
    description: "Explore the foundations of our innovations, secure all indoor elements",
    thumbnail: "/images/videos/focus-fixing.jpg",
    category: "solving-problems",
    vimeoId: "1041721190",
    transcript: "Up to 80% of indoor allergens, including dust mite proteins, pet dander, and mold spores, settle on surfaces within minutes of becoming airborne. Traditional air purifiers only treat what passes through the machine, leaving the settled contamination untouched. EnviroBiotics addresses this gap by dispersing beneficial probiotics that travel with airflow and settle on surfaces, fabrics, furniture, and HVAC ducts. These probiotics then suppress harmful organisms through competitive exclusion, treating contamination where it actually lives.",
  },
  {
    id: "wrong-path",
    title: "Walking the Wrong Path",
    description: "Pathogens keep evolving while we stayed behind, the risk is substantial",
    thumbnail: "/images/videos/wrong-path.jpg",
    category: "solving-problems",
    vimeoId: "1042275693",
    transcript: "Over-sanitization with chemical disinfectants creates a cycle of resistance. Pathogens evolve to withstand chemical treatments, while beneficial microorganisms that naturally suppress them are eliminated. EnviroBiotics takes a different approach: instead of killing everything, we introduce beneficial Bacillus probiotics that outcompete harmful organisms naturally. This biological method doesn't create resistance because it works through nutrient competition rather than chemical destruction. The result is a more resilient, balanced indoor microbiome.",
  },
  {
    id: "mold-issues",
    title: "The Issues of Mold",
    description: "Molds & Fungi toxins are highly poisonous, generating bad odor to alert us",
    thumbnail: "/images/videos/mold-issues.jpg",
    category: "solving-problems",
    vimeoId: "676735566",
    transcript: "Mold produces mycotoxins that are harmful to human health and creates musty odors that signal its presence. Traditional mold treatments use chemical biocides that kill on contact but leave surfaces vulnerable to recolonization. EnviroBiotics probiotics suppress mold growth biologically by consuming the organic substrates mold depends on and creating continuous biological competition. This is especially effective inside HVAC ductwork, where moisture and darkness create ideal mold habitats. By treating the air handling system at its source, EnviroBiotics helps prevent mold spores from recirculating throughout your home.",
  },
  // Smart Products
  {
    id: "ebiotic-pro",
    title: "E-Biotic Pro",
    description: "HVAC air ducts are a primary cause of building related illnesses",
    thumbnail: "/images/videos/ebiotic-pro.jpg",
    category: "products",
    vimeoId: "1031551996",
    transcript: "The E-Biotic Pro is EnviroBiotics' commercial-grade HVAC probiotic treatment system, designed for spaces up to 25,000 square feet. It integrates directly into existing HVAC systems, dispensing beneficial Bacillus probiotics through the ductwork. As air circulates, probiotics are carried to every connected room and settle on internal surfaces, coils, and ducts. This treats the biological contamination that accumulates inside HVAC systems, a primary contributor to building-related illnesses, sick building syndrome, and poor indoor air quality in commercial environments.",
  },
  {
    id: "ba-2080",
    title: "The All-in-One BA-2080",
    description: "A dual engine device that concurrently filters air and proactively cleans surfaces",
    thumbnail: "/images/videos/ba-2080.jpg",
    category: "products",
    vimeoId: "1050657976",
    transcript: "The BA-2080 is a hybrid device that combines HEPA air filtration with probiotic surface treatment. The HEPA engine captures airborne particles, while the probiotic engine disperses beneficial Bacillus bacteria that settle on surfaces throughout the room. This dual approach treats both airborne and surface-level contamination simultaneously, covering up to 2,600 square feet. It runs automatically with no daily effort required, providing continuous protection between cleanings.",
  },
  {
    id: "biotica-800",
    title: "Biotica 800",
    description: "The largest of our room purifiers model. Overall protection for surfaces and objects.",
    thumbnail: "/images/videos/biotica-800.jpg",
    category: "products",
    vimeoId: "1035918499",
    transcript: "The Biotica 800 is EnviroBiotics' flagship room probiotic purifier, treating spaces up to 800 square feet. It automatically disperses beneficial Bacillus probiotics every 30 minutes, creating a continuous protective layer on surfaces, fabrics, and objects throughout the room. The device operates silently and requires only a cartridge replacement every 3 to 4 months. Independent testing shows measurable reductions in surface allergens, mold growth, and odor-causing bacteria within the first 30 days of continuous use.",
  },
];

export const getVideosByCategory = (categoryId: string): Video[] => {
  return videos.filter(video => video.category === categoryId);
};

export const getVideoById = (id: string): Video | undefined => {
  return videos.find(video => video.id === id);
};
