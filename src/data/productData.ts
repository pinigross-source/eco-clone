import biologicMini from "@/assets/biologic-mini-nobg-new.avif";
import biotica800 from "@/assets/shop/biotica-800.png";
import ba2080 from "@/assets/shop/ba2080.png";
import biologicMiniRefill from "@/assets/shop/biologic-mini-refill.jpg";
import biotica800NvRefill from "@/assets/shop/biotica-800-nv-refill.png";
import ba2080Combo from "@/assets/shop/ba-2080-combo.png";
import ebioticPro from "@/assets/ebiotic-pro.avif";
import ebpf18 from "@/assets/shop/bapf-18.jpg";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductTestimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

export interface QuickFeature {
  icon: string;
  label: string;
}

export interface ProductData {
  slug: string;
  name: string;
  tagline: string;
  price?: number;
  originalPrice?: number;
  image: string;
  heroImage: string;
  shopLink?: string;
  coverage: string;
  idealFor: string[];
  description: string;
  longDescription: string;
  benefits: { icon: string; title: string; description: string }[];
  specs: ProductSpec[];
  features: string[];
  howItWorks: { step: number; title: string; description: string }[];
  faqs: ProductFAQ[];
  testimonials: ProductTestimonial[];
  refillProduct?: {
    name: string;
    price: number;
    image: string;
    link: string;
    frequency: string;
  };
  comparisonPoints: string[];
  quickFeatures?: QuickFeature[];
  whatsInTheBox?: string[];
}

export const products: ProductData[] = [
  {
    slug: "biologic-mini",
    name: "BioLogic Mini",
    tagline: "Ultra-Quiet Environmental Probiotic Diffuser – USB-C Rechargeable",
    price: 98,
    image: biologicMini,
    heroImage: biologicMini,
    shopLink: "https://envirobiotics.com/biologic-mini-portable-purification-healthy-spaces/",
    coverage: "Up to 300 sq ft",
    idealFor: ["Home offices", "Bedrooms", "Travel", "Desks", "Nurseries"],
    description: "BioLogic Mini Environmental Probiotic Diffuser – Ultra-Quiet (<5 dB), 90-Day Cartridge, USB-C Rechargeable. This compact probiotic air purification system provides indoor air & surface support for personal spaces using carefully cultured strains of beneficial bacteria.",
    longDescription: "Experience the power of environmental probiotics in a convenient, travel-friendly package. The BioLogic Mini is a natural probiotic environmental purifier that continuously releases good bacteria (carefully cultured Bacillus strains) that naturally outcompete harmful pathogens on surfaces and objects in the air. Unlike traditional air purifiers that only filter, the BioLogic Mini creates an active protective indoor environment that keeps working even when you're away, supporting healthier indoor environments for your living and work spaces.",
    benefits: [
      { icon: "Volume2", title: "Ultra-Quiet Performance", description: "Operates at less than 5 dB – virtually silent for bedrooms, offices, nurseries, and living spaces" },
      { icon: "Maximize", title: "Compact & Lightweight Design", description: "Just 4.9 x 2.05 x 2.05 inches and only 0.30 lb – ideal for desks, nightstands, and small spaces" },
      { icon: "Clock", title: "Long-Lasting Cartridge", description: "Each cartridge lasts up to 90 days for continuous probiotic dispersion" },
      { icon: "Battery", title: "USB-C Rechargeable", description: "Powered by 5V / 1A with convenient Type-C charging for modern compatibility" },
      { icon: "Shield", title: "Peace of Mind Warranty", description: "Backed by a 1-year limited manufacturer warranty" },
      { icon: "Leaf", title: "Chemical Free", description: "100% natural probiotics – no harsh chemicals. MADE SAFE® Certified" },
    ],
    specs: [
      { label: "Coverage Area", value: "Up to 300 sq ft" },
      { label: "Dimensions", value: "4.9 in (H) x 2.05 in (W) x 2.05 in (D)" },
      { label: "Weight", value: "0.30 lb (137 g)" },
      { label: "Noise Level", value: "< 5 dB (Virtually Silent)" },
      { label: "Power Input", value: "5V / 1A" },
      { label: "Charging", value: "USB Type-C (Rechargeable)" },
      { label: "Cartridge Life", value: "Up to 90 days" },
      { label: "Warranty", value: "1-Year Limited Warranty" },
    ],
    features: [
      "Continuous probiotic diffusion technology",
      "Compact, portable design",
      "Cordless, battery operated – 4 weeks between charges",
      "Low maintenance operation",
      "Easy cartridge replacement",
      "No filters to change",
      "Safe for babies and pets",
      "Eco-friendly materials",
    ],
    howItWorks: [
      { step: 1, title: "Insert Cartridge", description: "Simply insert the probiotic cartridge into the device - no tools required." },
      { step: 2, title: "Power On", description: "Press the button to turn on – the rechargeable battery lasts up to 4 weeks per charge." },
      { step: 3, title: "Continuous Protection", description: "Beneficial probiotics are released continuously, colonizing surfaces and purifying the air." },
      { step: 4, title: "Replace Every 90 Days", description: "Swap in a fresh cartridge every 3 months to maintain optimal protection." },
    ],
    faqs: [
      { question: "Is the BioLogic Mini safe for use around babies?", answer: "Absolutely. The BioLogic Mini uses MADE SAFE certified Bacillus probiotics that are completely safe for infants, children, and pets. These beneficial bacteria are found naturally in soil and have been used safely for decades." },
      { question: "How often do I need to replace the cartridge?", answer: "We recommend replacing the cartridge every 90 days for optimal performance. You'll receive a reminder, and replacement cartridges are available individually or through our subscription service." },
      { question: "Can I take it on an airplane?", answer: "Yes! The BioLogic Mini is TSA-friendly and can be packed in your carry-on luggage. It's perfect for hotel rooms, rental cars, and vacation homes." },
      { question: "Does it make any noise?", answer: "The BioLogic Mini operates at less than 25 decibels - quieter than a whisper. You won't even notice it's running." },
      { question: "How is this different from an air purifier?", answer: "Traditional air purifiers only filter particles that pass through them. The BioLogic Mini releases probiotics that actively seek out and neutralize pathogens on surfaces and in the air, providing continuous protection throughout your space." },
    ],
    testimonials: [
      { quote: "I keep one on my desk and one on my nightstand. Since using the BioLogic Mini, I've noticed I'm not getting the seasonal sniffles like I used to.", author: "Sarah M.", location: "Austin, TX", rating: 5 },
      { quote: "Perfect for my home office. It's so quiet I forget it's there, but I definitely notice when I travel and don't have it with me.", author: "Michael R.", location: "Seattle, WA", rating: 5 },
      { quote: "Bought one for our nursery and loved it so much we got two more. Peace of mind knowing the air around our baby is protected.", author: "Jennifer L.", location: "Chicago, IL", rating: 5 },
    ],
    refillProduct: {
      name: "BioLogic Mini Refill Twin-Pack",
      price: 36.10, // 2 refills ($19 each) - 5% = $36.10
      image: biologicMiniRefill,
      link: "https://envirobiotics.com/biologic-mini-refill/",
      frequency: "Every 6 months",
    },
    comparisonPoints: ["Portable design", "USB powered", "Perfect for personal spaces", "Travel friendly", "Entry level price"],
    quickFeatures: [
      { icon: "Volume2", label: "< 5 dB Silent" },
      { icon: "Clock", label: "90-Day Cartridge" },
      { icon: "Battery", label: "USB-C Rechargeable" },
      { icon: "Maximize", label: "300 sq ft" },
      { icon: "Leaf", label: "Chemical Free" },
      { icon: "Plane", label: "Travel Friendly" },
      { icon: "Shield", label: "MADE SAFE®" },
    ],
    whatsInTheBox: [
      "BioLogic Mini Device",
      "1x Probiotic Cartridge (90-day supply)",
      "USB-C Charging Cable",
      "Quick Start Guide",
    ],
  },
  {
    slug: "biotica-800",
    name: "Biotica 800",
    tagline: "Whole Room Probiotic Protection for Your Home",
    price: 299,
    image: biotica800,
    heroImage: biotica800,
    shopLink: "https://envirobiotics.com/biotica-800/",
    coverage: "Up to 800 sq ft",
    idealFor: ["Living rooms", "Master bedrooms", "Home offices", "Playrooms", "Studios"],
    description: "The Biotica 800 is a probiotic air purification system that provides comprehensive environmental probiotic protection for medium-sized rooms. Good bacteria consume organic matter on surfaces and objects, eliminating bad odor and reducing pollen, dust mite allergens, and pet dander. Set it and forget it: your indoor environment stays protected 24/7.",
    longDescription: "Transform any room in your home into a healthier indoor environment with the Biotica 800. This powerful yet elegant probiotic air purifier continuously disperses beneficial bacteria throughout indoor spaces up to 800 square feet, creating an invisible shield of environmental probiotics against harmful pathogens. The carefully cultured Bacillus strains settle on surfaces and objects, consuming organic matter that harmful microorganisms need to survive. With its modern design and silent operation, the Biotica 800 is an environmentally friendly solution that blends seamlessly into any living and work space while working tirelessly to improve your indoor air and surface quality.",
    benefits: [
      { icon: "Home", title: "Whole Room Coverage", description: "Protects up to 800 sq ft of living space continuously" },
      { icon: "Timer", title: "Set & Forget", description: "Automatic operation - just replace cartridge every 90 days" },
      { icon: "Sparkles", title: "Air & Surfaces", description: "Dual-action purification for complete protection" },
      { icon: "Heart", title: "Family Safe", description: "MADE SAFE certified for all family members including pets" },
      { icon: "Paintbrush", title: "Modern Design", description: "Elegant aesthetic complements any room décor" },
      { icon: "Battery", title: "Low Energy", description: "Energy-efficient operation costs pennies per day" },
    ],
    specs: [
      { label: "Coverage Area", value: "Up to 800 sq ft (75 m²)" },
      { label: "Dimensions", value: "9.8 in (L) x 2.1 in (W) x 3.9 in (H)" },
      { label: "Weight", value: "1.4 lb" },
      { label: "Cartridge Volume", value: "3.55 oz (105 ml)" },
      { label: "Cartridge Life", value: "Up to 90 days" },
      { label: "Input Voltage", value: "110–230 VAC" },
      { label: "Output Voltage", value: "4.2 VDC" },
      { label: "Noise Level", value: "< 30 dB" },
      { label: "Operating Temperature", value: "35–109°F (2–43°C)" },
      { label: "Operating Humidity", value: "Up to 85% RH" },
      { label: "Warranty", value: "1 year" },
    ],
    features: [
      "Patented probiotic diffusion system",
      "800 sq ft coverage area",
      "Quiet operation",
      "Energy-efficient design",
      "Easy 90-day cartridge replacement",
      "No filters to clean or replace",
      "Modern, compact design",
      "Safe for children and pets",
      "Cleans Air & Surfaces",
      "Continuous 24/7 protection",
    ],
    howItWorks: [
      { step: 1, title: "Place in Your Room", description: "Position the Biotica 800 in a central location for optimal coverage." },
      { step: 2, title: "Insert Cartridge & Plug In", description: "Load the probiotic cartridge and connect to any standard outlet." },
      { step: 3, title: "Automatic Protection", description: "The device continuously releases billions of beneficial probiotics into your space." },
      { step: 4, title: "Replace Every 90 Days", description: "Simply swap in a new cartridge every 90 days to maintain protection." },
    ],
    faqs: [
      { question: "Where should I place the Biotica 800?", answer: "For optimal coverage, place the Biotica 800 in a central location in your room, ideally on a table or shelf at mid-height. Avoid placing it in corners or behind furniture where airflow may be restricted." },
      { question: "How long does the cartridge last?", answer: "Each cartridge provides up to 90 days of continuous protection under normal operating conditions. We offer convenient subscription plans that automatically deliver fresh cartridges right when you need them." },
      { question: "Can I use it in a bedroom while sleeping?", answer: "Absolutely! The Biotica 800 operates at less than 30 dB - quieter than a library. Many customers use it in their bedrooms and report better sleep quality." },
      { question: "Is it safe for my pets?", answer: "Yes! The Bacillus probiotics used in our devices are MADE SAFE certified and completely safe for cats, dogs, birds, and other household pets." },
      { question: "How is this different from an air filter or purifier?", answer: "Air filters only trap particles that pass through them. The Biotica 800 releases probiotics that actively colonize surfaces and remain in the air, providing continuous protection throughout your space - even in areas filters can't reach." },
      { question: "What maintenance is required?", answer: "Virtually none! Simply replace the cartridge every 90 days. There are no filters to clean, no UV bulbs to change, and no complicated settings to manage." },
    ],
    testimonials: [
      { quote: "Our living room feels different since we got the Biotica 800. Less dust, fresher air, and our allergies have improved significantly.", author: "David & Karen T.", location: "Denver, CO", rating: 5 },
      { quote: "I was skeptical at first, but after a month I'm a believer. My home just feels cleaner and I love that it's completely natural.", author: "Amanda P.", location: "Portland, OR", rating: 5 },
      { quote: "We have three cats and the difference in air quality is noticeable. No more litter box smell reaching the living room!", author: "Chris M.", location: "Nashville, TN", rating: 5 },
    ],
    refillProduct: {
      name: "Biotica 800 Refill Twin-Pack",
      price: 85.50, // 2 refills ($45 each) - 5% = $85.50
      image: biotica800NvRefill,
      link: "https://envirobiotics.com/biotica-800-refill-nv/",
      frequency: "Every 90 days",
    },
    comparisonPoints: ["800 sq ft coverage", "Set and forget", "90-day cartridge life", "Ideal for main living spaces", "Best value for homes"],
    quickFeatures: [
      { icon: "Home", label: "800 sq ft" },
      { icon: "Timer", label: "Set & Forget" },
      { icon: "Clock", label: "90-Day Cartridge" },
      { icon: "Volume2", label: "< 30 dB" },
      { icon: "Leaf", label: "Chemical Free" },
      { icon: "Shield", label: "MADE SAFE®" },
    ],
    whatsInTheBox: [
      "Biotica 800 Device",
      "1x Probiotic Cartridge (90-day supply)",
      "AC Power Adapter",
      "Quick Start Guide",
    ],
  },
  {
    slug: "ba-2080",
    name: "BA 2080",
    tagline: "The Ultimate Hybrid: Probiotic + HEPA Technology",
    price: 995,
    originalPrice: 1195,
    image: ba2080,
    heroImage: ba2080,
    shopLink: "https://envirobiotics.com/ba2080-advanced-purification/",
    coverage: "Up to 2,600 sq ft",
    idealFor: ["Large homes", "Open floor plans", "Offices", "Medical offices", "Wellness centers"],
    description: "The BA 2080 combines our proven probiotic air purification system with medical grade HEPA filtration for the most comprehensive air purifier and surface treatment available. Environmental probiotics and HEPA technology work together for healthier indoor environments.",
    longDescription: "Experience the best of both worlds with the BA 2080. This premium hybrid probiotic air purification system pairs our patented environmental probiotic diffusion technology with a true HEPA filter that captures 99.97% of particles down to 0.3 microns. While the HEPA filter removes airborne particles including pollen, dust mite allergens, and pet dander, the good bacteria actively colonize surfaces and objects, consuming organic matter and eliminating bad odor. These carefully cultured Bacillus strains continue working long after the air passes through. It is the most complete, environmentally friendly indoor purification solution on the market, designed for those who want maximum protection for larger living and work spaces.",
    benefits: [
      { icon: "Layers", title: "Dual Technology", description: "Combines probiotics + HEPA for complete air & surface protection" },
      { icon: "Maximize", title: "Massive Coverage", description: "Protects up to 2,600 sq ft, whole home or commercial spaces" },
      { icon: "Filter", title: "Medical Grade HEPA", description: "Captures 99.97% of particles including viruses and bacteria" },
      { icon: "Activity", title: "Active + Passive", description: "Probiotics work actively while HEPA filters passively" },
      { icon: "Building2", title: "Commercial Ready", description: "Perfect for offices, clinics, and wellness centers" },
      { icon: "Award", title: "Premium Build", description: "Hospital grade construction with whisper quiet operation" },
    ],
    specs: [
      { label: "Coverage Area", value: "Up to 2,600 sq ft" },
      { label: "HEPA Rating", value: "True HEPA H13" },
      { label: "Particle Capture", value: "99.97% @ 0.3 microns" },
      { label: "Power", value: "110V AC" },
      { label: "Dimensions", value: "12\" x 12\" x 24\"" },
      { label: "Weight", value: "18 lbs" },
      { label: "CADR", value: "350 CFM" },
      { label: "Noise Level", value: "25-55 dB (adjustable)" },
      { label: "Probiotic Cartridge Life", value: "180 days" },
      { label: "HEPA Filter Life", value: "12 months" },
      { label: "Warranty", value: "3 years" },
    ],
    features: [
      "Hybrid probiotic + HEPA technology",
      "2,600 sq ft coverage area",
      "True HEPA H13 filtration",
      "99.97% particle capture rate",
      "Variable speed control",
      "Air quality indicator",
      "Filter replacement alerts",
      "Ultra-quiet night mode",
      "Energy Star certified",
      "Continuous probiotic diffusion",
      "Commercial grade construction",
      "Modern, professional design",
    ],
    howItWorks: [
      { step: 1, title: "Air Intake", description: "Powerful fans draw air from your entire space through the HEPA filtration system." },
      { step: 2, title: "HEPA Filtration", description: "The medical-grade HEPA filter captures 99.97% of airborne particles, allergens, and pathogens." },
      { step: 3, title: "Probiotic Enrichment", description: "Clean air is enriched with beneficial probiotics before being released back into your space." },
      { step: 4, title: "Surface Colonization", description: "Probiotics settle on surfaces throughout your space, continuously outcompeting harmful bacteria." },
    ],
    faqs: [
      { question: "Why do I need both HEPA and probiotics?", answer: "HEPA filters are excellent at capturing particles that pass through them, but they can't protect surfaces or air that doesn't reach the filter. Probiotics provide active, continuous protection throughout your space - on surfaces, in the air, and in areas HEPA alone can't reach. Together, they provide the most complete protection available." },
      { question: "How often do the filters need replacement?", answer: "The probiotic cartridge should be replaced every 6 months, while the HEPA filter lasts 12 months under normal use. The device includes smart alerts to remind you when replacements are due." },
      { question: "Is this suitable for commercial use?", answer: "Yes! The BA 2080 is ideal for medical offices, dental practices, wellness centers, and professional offices up to 2,600 sq ft. Many healthcare facilities use it for enhanced patient protection." },
      { question: "How loud is it?", answer: "On low/night mode, it operates at just 25 dB (quieter than a whisper). On high, it reaches 55 dB - similar to normal conversation. Most users run it on medium (40 dB) for optimal balance." },
      { question: "What's included in the box?", answer: "The BA 2080 comes with the main unit, one HEPA filter (12-month supply), one probiotic cartridge (6-month supply), power cord, and quick-start guide. Everything you need to get started." },
      { question: "Can it replace my existing air purifier?", answer: "Absolutely. The BA 2080 provides everything a traditional air purifier does, plus the added benefit of active probiotic protection. Most customers retire their old purifiers once they experience the BA 2080." },
    ],
    testimonials: [
      { quote: "We installed the BA 2080 in our dental office and patients immediately noticed the difference. The air feels cleaner and we've seen fewer sick days among staff.", author: "Dr. Robert K.", location: "Miami, FL", rating: 5 },
      { quote: "Living in an open-concept home, we needed something powerful. The BA 2080 covers our entire main floor and the air quality has never been better.", author: "Jennifer & Mark S.", location: "San Diego, CA", rating: 5 },
      { quote: "Worth every penny. As someone with severe allergies, this is the first purifier that's actually made a noticeable difference. The hybrid approach really works.", author: "Thomas H.", location: "Boston, MA", rating: 5 },
    ],
    refillProduct: {
      name: "BA 2080 Refill Subscription",
      price: 187.15, // Refill + HEPA filter included annually, billed every 6 months
      image: ba2080Combo,
      link: "https://envirobiotics.com/ba-2080-refill/",
      frequency: "Every 6 months",
    },
    comparisonPoints: ["Hybrid HEPA + Probiotic", "2,600 sq ft coverage", "Medical grade filtration", "Commercial ready", "Premium protection"],
    quickFeatures: [
      { icon: "Layers", label: "HEPA + Probiotic" },
      { icon: "Maximize", label: "2,600 sq ft" },
      { icon: "Filter", label: "99.97% Capture" },
      { icon: "Volume2", label: "25-55 dB" },
      { icon: "Clock", label: "180-Day Cartridge" },
      { icon: "Award", label: "3-Year Warranty" },
    ],
    whatsInTheBox: [
      "BA 2080 Unit",
      "1x True HEPA H13 Filter (12-month supply)",
      "1x Probiotic Cartridge (180-day supply)",
      "Power Cord",
      "Quick Start Guide",
    ],
  },
  {
    slug: "ebiotic-pro",
    name: "eBiotic Pro",
    tagline: "Whole Home HVAC Probiotic System",
    // No price - requires custom quote
    image: ebioticPro,
    heroImage: ebioticPro,
    coverage: "Whole Home (HVAC)",
    idealFor: ["Whole home protection", "Central HVAC systems", "Multi room coverage", "New construction", "Existing ductwork"],
    description: "The eBiotic Pro integrates directly with your HVAC systems to deliver continuous environmental probiotic protection throughout your entire home via your existing ductwork. This probiotic air purification system treats surfaces and objects in every room, creating healthier indoor environments throughout your living and work spaces.",
    longDescription: "Transform your entire home into a probiotic protected indoor environment with the eBiotic Pro. This professional grade probiotic air purification system installs directly into your central HVAC systems, continuously dispersing beneficial bacteria through every room in your home. Every time your heating or cooling runs, billions of good bacteria (carefully cultured Bacillus strains) are distributed throughout your indoor spaces, settling on surfaces and objects and consuming organic matter that harmful organisms need. These naturally occurring environmental probiotics eliminate bad odor and reduce pollen, dust mite allergens, and pet dander at the source. It is the ultimate environmentally friendly, set-and-forget solution for families who want comprehensive, whole-home protection and healthier indoor environments.",
    benefits: [
      { icon: "Home", title: "Whole Home Coverage", description: "Protects every room connected to your HVAC system automatically" },
      { icon: "Zap", title: "HVAC Integration", description: "Installs directly into your existing ductwork for seamless operation" },
      { icon: "Timer", title: "Automatic Protection", description: "Disperses probiotics every time your HVAC runs, no manual operation needed" },
      { icon: "Shield", title: "Pro Grade Build", description: "Commercial quality construction designed for years of reliable operation" },
      { icon: "Leaf", title: "Chemical Free", description: "100% natural Bacillus probiotics, safe for your entire family" },
      { icon: "Award", title: "Professional Install", description: "Expert installation ensures optimal placement and performance" },
    ],
    specs: [
      { label: "Coverage Area", value: "Whole Home (via HVAC)" },
      { label: "Installation", value: "Professional Required" },
      { label: "Compatibility", value: "Most central HVAC systems" },
      { label: "Power", value: "24V (HVAC powered)" },
      { label: "Dimensions", value: "14\" x 8\" x 6\"" },
      { label: "Weight", value: "4.5 lbs" },
      { label: "Cartridge Life", value: "180 days" },
      { label: "Warranty", value: "3 years" },
      { label: "Probiotic Type", value: "Bacillus ferment" },
    ],
    features: [
      "Whole home probiotic distribution",
      "Direct HVAC duct integration",
      "Automatic operation with HVAC cycles",
      "Professional installation included",
      "Compatible with most central systems",
      "6 month cartridge life",
      "Low maintenance design",
      "Safe for children and pets",
      "No filters to replace",
      "Works with heating and cooling",
      "Quiet, unobtrusive operation",
      "Smart cartridge monitoring",
    ],
    howItWorks: [
      { step: 1, title: "Professional Install", description: "Our certified technicians install the eBiotic Pro directly into your HVAC ductwork." },
      { step: 2, title: "HVAC Integration", description: "The system connects to your existing HVAC and activates automatically when it runs." },
      { step: 3, title: "Whole Home Distribution", description: "Probiotics are dispersed through your entire duct system, reaching every room." },
      { step: 4, title: "Continuous Protection", description: "Beneficial bacteria settle on surfaces throughout your home, providing 24/7 protection." },
    ],
    faqs: [
      { question: "Does the eBiotic Pro work with my HVAC system?", answer: "The eBiotic Pro is compatible with most central forced-air HVAC systems, including gas, electric, and heat pump systems. During your consultation, our team will verify compatibility with your specific setup." },
      { question: "Who installs the eBiotic Pro?", answer: "Installation is performed by our network of certified HVAC professionals. The installation typically takes 1 to 2 hours and is included in the purchase price." },
      { question: "How often do I need to replace the cartridge?", answer: "The probiotic cartridge should be replaced every 6 months. We offer convenient subscription plans for automatic delivery, and replacement is a simple process that takes less than 5 minutes." },
      { question: "Will it affect my HVAC efficiency?", answer: "No. The eBiotic Pro is designed to integrate seamlessly without restricting airflow or impacting your HVAC system's efficiency or performance." },
      { question: "Is it safe for my family and pets?", answer: "Absolutely. The Bacillus probiotics used are MADE SAFE certified and completely safe for everyone in your home, including infants, children, elderly family members, and all pets." },
      { question: "What maintenance is required?", answer: "Virtually none beyond the 6 month cartridge replacement. The system is designed for reliable, hands off operation. An indicator light lets you know when it's time for a new cartridge." },
    ],
    testimonials: [
      { quote: "We have a 4,000 sq ft home and the eBiotic Pro covers every room. The installation was professional and now we don't even think about it - it just works.", author: "Robert & Linda M.", location: "Scottsdale, AZ", rating: 5 },
      { quote: "After years of using individual room units, upgrading to the eBiotic Pro was a game changer. One system for the whole house - it's exactly what we needed.", author: "James T.", location: "Dallas, TX", rating: 5 },
      { quote: "Our allergies have improved dramatically since installing the eBiotic Pro. The whole home coverage makes a real difference compared to portable units.", author: "Michelle K.", location: "Atlanta, GA", rating: 5 },
    ],
    refillProduct: undefined,
    comparisonPoints: ["Whole home HVAC integration", "Professional installation", "Automatic operation", "Every room protected", "Ultimate convenience"],
  },
  {
    slug: "ebpf-18",
    name: "EBPF-18",
    tagline: "Professional Probiotic Fogger for Deep Surface Treatment",
    price: 395,
    image: ebpf18,
    heroImage: ebpf18,
    shopLink: "/shop",
    coverage: "Up to 3,000 sq ft",
    idealFor: ["Commercial spaces", "Deep cleaning", "Professional cleaners", "Gyms & fitness centers", "Healthcare facilities", "Schools"],
    description: "The EBPF-18 is a professional-grade probiotic fogger designed for deep surface treatment and large-area coverage. This probiotic air purification system disperses environmental probiotics across surfaces and objects in indoor spaces, eliminating bad odor and reducing pollen, dust mite allergens, and pet dander. Perfect for commercial applications requiring thorough, environmentally friendly sanitization.",
    longDescription: "Take surface protection to the next level with the EBPF-18 professional fogger. This commercial-grade probiotic air purification system creates a fine mist of beneficial bacteria that penetrates every surface, crack, and crevice in your indoor environment. Unlike traditional foggers that use harsh chemicals, the EBPF-18 applies our proprietary carefully cultured Bacillus probiotic formula: naturally occurring good bacteria that continue working for days after application, consuming organic matter and supporting healthier indoor environments. Ideal for professional cleaning services, healthcare facilities, gyms, and any living and work space requiring thorough, ongoing environmental probiotic protection.",
    benefits: [
      { icon: "Sparkles", title: "Deep Penetration", description: "Ultra-fine mist reaches every surface, including hard-to-reach areas" },
      { icon: "Timer", title: "Long Lasting Effect", description: "Probiotics continue working for days after application" },
      { icon: "Building2", title: "Commercial Grade", description: "Built for professional use and large-scale applications" },
      { icon: "Droplets", title: "Efficient Coverage", description: "Treats up to 3,000 sq ft per tank" },
      { icon: "Leaf", title: "Chemical Free", description: "100% natural probiotics - no harsh residues" },
      { icon: "Shield", title: "MADE SAFE Certified", description: "Safe for use in occupied spaces after settling" },
    ],
    specs: [
      { label: "Coverage Area", value: "Up to 3,000 sq ft per tank" },
      { label: "Tank Capacity", value: "1.5 liters" },
      { label: "Power", value: "110V AC (corded)" },
      { label: "Particle Size", value: "10-50 microns (ULV)" },
      { label: "Flow Rate", value: "Adjustable 0-250 ml/min" },
      { label: "Dimensions", value: '14" x 8" x 12"' },
      { label: "Weight", value: "6.5 lbs (empty)" },
      { label: "Cord Length", value: "20 ft" },
      { label: "Warranty", value: "2 years commercial" },
    ],
    features: [
      "Ultra low volume (ULV) fogging technology",
      "Adjustable flow rate control",
      "Professional grade construction",
      "Large 1.5L solution tank",
      "Extended 20ft power cord",
      "Ergonomic design for extended use",
      "Compatible with all EnviroBiotics solutions",
      "Quick-fill tank design",
      "Easy to clean and maintain",
      "Safe for electronics after settling",
      "No chemical residues",
      "Ideal for pre event treatment",
    ],
    howItWorks: [
      { step: 1, title: "Fill Tank", description: "Add probiotic solution to the 1.5L tank using the quick-fill cap." },
      { step: 2, title: "Adjust Settings", description: "Set the flow rate based on your coverage needs and space size." },
      { step: 3, title: "Fog the Space", description: "Walk through the area, directing the fine mist toward all surfaces." },
      { step: 4, title: "Allow to Settle", description: "Give 30-60 minutes for the mist to settle, then probiotics work continuously." },
    ],
    faqs: [
      { question: "How often should I fog a space?", answer: "For optimal protection, we recommend fogging weekly for high traffic commercial spaces, or bi weekly for lower traffic areas. For one time deep cleaning, a single thorough application provides protection for 5 to 7 days." },
      { question: "Is it safe to use in occupied spaces?", answer: "We recommend vacating the space during fogging and allowing 30 to 60 minutes for the mist to settle before re entry. Once settled, the probiotics are completely safe for people, pets, and food surfaces." },
      { question: "What solution do I use with the EBPF-18?", answer: "The EBPF-18 is designed to work with our proprietary EBPF Probiotic Solution, sold separately. Each bottle treats approximately 9,000 sq ft of surface area." },
      { question: "Can I use it on electronics and sensitive equipment?", answer: "Yes! The ultra-fine mist uses minimal liquid and leaves no residue. Allow electronics to be off during application and for the fog to fully settle before powering on." },
      { question: "Is this suitable for residential use?", answer: "While designed for commercial applications, the EBPF-18 is excellent for homeowners who want periodic deep treatment or have large homes. It's especially popular for new home move-ins, post-renovation cleaning, and seasonal deep cleans." },
      { question: "How do I clean and maintain the fogger?", answer: "After each use, run clean water through the system for 30 seconds. Monthly, disassemble and clean the nozzle. The unit requires minimal maintenance and is built for years of professional use." },
    ],
    testimonials: [
      { quote: "We use the EBPF-18 in our gym every night after closing. Members have noticed the difference - the equipment stays fresher longer and there's no chemical smell.", author: "Marcus L.", location: "FitLife Gym, Denver", rating: 5 },
      { quote: "As a professional cleaning service, the EBPF-18 has become our secret weapon. Clients love the natural approach and the results speak for themselves.", author: "Clean Pro Services", location: "Houston, TX", rating: 5 },
      { quote: "We fog our daycare every weekend. Parents appreciate that we're using natural probiotics instead of harsh chemicals around their children.", author: "Sunshine Daycare", location: "Phoenix, AZ", rating: 5 },
    ],
    refillProduct: {
      name: "EBPF Probiotic Solution",
      price: 89,
      image: ebpf18,
      link: "/shop",
      frequency: "Based on usage",
    },
    comparisonPoints: ["Professional fogger", "3,000 sq ft coverage", "Deep surface treatment", "Commercial ready", "Long lasting effect"],
  },
];

export const getProductBySlug = (slug: string): ProductData | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getOtherProducts = (currentSlug: string): ProductData[] => {
  return products.filter((p) => p.slug !== currentSlug);
};
