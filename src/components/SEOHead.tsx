import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
  keywords?: string;
  jsonLd?: object;
}

const DOMAIN = "https://envirobiotics.com";

export const SEOHead = ({ title, description, path, type = "website", image, keywords, jsonLd }: SEOHeadProps) => {
  // Ensure trailing slash for canonical consistency (matches server behavior)
  const normalizedPath = path === "/" ? "/" : (path.endsWith("/") ? path : `${path}/`);
  const canonicalUrl = `${DOMAIN}${normalizedPath}`;
  const ogImage = image || `${DOMAIN}/og-image.png`;
  const fullTitle = title.includes("EnviroBiotics") ? title : `${title} | EnviroBiotics`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", ogImage);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    // JSON-LD
    const existingScript = document.querySelector('script[data-seo-jsonld]');
    if (existingScript) existingScript.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.querySelector('script[data-seo-jsonld]');
      if (s) s.remove();
    };
  }, [fullTitle, description, canonicalUrl, type, ogImage, jsonLd]);

  return null;
};

// Organization schema used across the site (no @context — used inside @graph)
export const organizationJsonLd = {
  "@type": "Organization",
  "@id": "https://envirobiotics.com/#organization",
  name: "EnviroBiotics",
  legalName: "Ecological Balancing Technologies Corporation",
  alternateName: ["BetterAir", "Better Air", "Enviro Biotics", "EBT Corp."],
  url: "https://envirobiotics.com",
  logo: {
    "@type": "ImageObject",
    url: "https://envirobiotics.com/favicon.png",
    width: 512,
    height: 512,
  },
  description: "EnviroBiotics (formerly BetterAir) is the leader in probiotic air and surface purification. Our devices continuously release beneficial probiotics that treat surfaces, fabrics, cracks, and air, keeping indoor environments naturally cleaner 24/7. Featuring the Biotica 800 and BioLogic Mini.",
  telephone: "+18336923883",
  email: "contact@envirobiotics.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5 Lenape Road, Unit 2C",
    addressLocality: "Andover",
    addressRegion: "NJ",
    postalCode: "07821",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+18336923883",
    contactType: "customer service",
    email: "contact@envirobiotics.com",
    availableLanguage: "English",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "16:00",
    },
  },
  sameAs: [
    "https://www.facebook.com/Envirobiotics",
    "https://www.instagram.com/envirobiotics/",
    "https://twitter.com/EnviroBiotics",
    "https://www.linkedin.com/company/envirobiotics",
    "https://www.youtube.com/@EnviroBiotics",
  ],
  foundingDate: "2009",
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "Israel" },
  ],
  knowsAbout: [
    "Probiotic air purification",
    "Probiotic air purification systems",
    "Air probiotics",
    "Environmental probiotics",
    "Indoor air quality",
    "Biological air filtration",
    "Surface contamination prevention",
    "Bacillus probiotics",
    "HVAC probiotic treatment",
    "Mold and allergen reduction",
    "Microbiome-based cleaning",
    "Chemical-free indoor air treatment",
    "Probiotic cleaners",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "EnviroBiotics Probiotic Air & Surface Purifiers",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Room Devices",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "BioLogic Mini", description: "Portable probiotic purifier, up to 300 sq ft" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Biotica 800", description: "Whole-room probiotic purifier, up to 800 sq ft" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "BA 2080", description: "Hybrid probiotic + HEPA purifier, up to 2,600 sq ft" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "HVAC Solutions",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "E-Biotic Pro", description: "Commercial HVAC probiotic treatment, up to 25,000 sq ft" } },
        ],
      },
    ],
  },
};

export const websiteJsonLd = {
  "@type": "WebSite",
  name: "EnviroBiotics",
  url: "https://envirobiotics.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://envirobiotics.com/shop?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// Breadcrumb helper — pass ordered items: [{ name, url }] (no @context — used inside @graph)
export const makeBreadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `https://envirobiotics.com${item.url}`,
  })),
});

// Product schema helper
export const makeProductJsonLd = (opts: {
  name: string;
  description: string;
  image: string;
  price?: number;
  sku?: string;
  ratingValue?: number;
  reviewCount?: number;
  faqs?: { question: string; answer: string }[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: opts.name,
  description: opts.description,
  image: opts.image,
  brand: {
    "@type": "Brand",
    name: "EnviroBiotics",
    url: "https://envirobiotics.com",
  },
  manufacturer: {
    "@type": "Organization",
    name: "EnviroBiotics",
  },
  category: "Air Purifiers > Probiotic Air Purifiers",
  ...(opts.sku ? { sku: opts.sku } : {}),
  ...(opts.price !== undefined ? {
    offers: {
      "@type": "Offer",
      price: opts.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://envirobiotics.com/product/${opts.sku || ""}`,
      seller: { "@type": "Organization", name: "EnviroBiotics" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
    },
  } : {}),
  ...(opts.ratingValue !== undefined ? {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: opts.ratingValue,
      reviewCount: opts.reviewCount ?? 47,
      bestRating: 5,
      worstRating: 1,
    },
  } : {}),
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "FDA GRAS Certified",
      value: "Yes — all probiotic strains are FDA Generally Recognized As Safe",
    },
    {
      "@type": "PropertyValue",
      name: "EPA Registered",
      value: "Yes — EPA registered probiotic strains",
    },
    {
      "@type": "PropertyValue",
      name: "MADE SAFE Certified",
      value: "Yes — certified safe for humans, animals, and environment",
    },
    {
      "@type": "PropertyValue",
      name: "AllergyUK Approved",
      value: "Yes — endorsed by AllergyUK",
    },
    {
      "@type": "PropertyValue",
      name: "Ozone Emissions",
      value: "Zero — produces no ozone, no VOCs, no chemical residues",
    },
    {
      "@type": "PropertyValue",
      name: "Manufacturing Standard",
      value: "ISO 9001 certified laboratory",
    },
  ],
});

// HowTo schema for the How It Works page (no @context — used inside @graph)
export const howToJsonLd = {
  "@type": "HowTo",
  name: "How EnviroBiotics Probiotic Air & Surface Treatment Works",
  description: "EnviroBiotics environmental probiotics work in 3 automatic steps to continuously protect your indoor air and surfaces 24/7, without effort.",
  totalTime: "PT5M",
  tool: [{ "@type": "HowToTool", name: "EnviroBiotics Device (BioLogic Mini, Biotica 800, or BA 2080)" }],
  supply: [{ "@type": "HowToSupply", name: "EnviroBiotics Probiotic Cartridge" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Disperse",
      text: "The device automatically releases beneficial Bacillus probiotics into your space as a fine, invisible mist. No manual effort required: operation is silent and continuous.",
      url: "https://envirobiotics.com/how-it-works#disperse",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Settle",
      text: "The probiotics land on surfaces, fabrics, furniture, and hard-to-reach cracks where dust, allergens, and mold spores typically accumulate: areas no filter can treat.",
      url: "https://envirobiotics.com/how-it-works#settle",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Support",
      text: "The established probiotic layer competitively excludes harmful bacteria, mold, and allergens by consuming the nutrients they need to survive. Protection runs 24/7 between your regular cleanings.",
      url: "https://envirobiotics.com/how-it-works#support",
    },
  ],
};

// Expanded homepage FAQ for AEO (no @context — used inside @graph)
export const homepageFaqJsonLd = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a probiotic air purifier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A probiotic air purifier is a device that disperses beneficial bacteria (primarily Bacillus-genus probiotics) into a room to competitively suppress harmful microorganisms on surfaces and in the air. Unlike HEPA filters that only capture particles passing through them, probiotic purifiers treat the surfaces, fabrics, and cracks where contamination actually lives.",
      },
    },
    {
      "@type": "Question",
      name: "What is EnviroBiotics and how is it different from an air purifier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EnviroBiotics (formerly BetterAir) makes probiotic air and surface purifiers that continuously release beneficial probiotics into indoor spaces. Unlike standard air purifiers that only filter airborne particles, EnviroBiotics devices treat surfaces, fabrics, and HVAC systems: the places where allergens, mold spores, and bacteria actually accumulate and re-contaminate the air.",
      },
    },
    {
      "@type": "Question",
      name: "Are EnviroBiotics products safe for children and pets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All EnviroBiotics probiotic strains are FDA GRAS (Generally Recognized As Safe) certified. Products are MADE SAFE certified, EPA registered, and AllergyUK approved. They produce no ozone, no VOCs, and no chemical residues: safe for daily use around infants, children, pregnant women, and pets.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take for EnviroBiotics to work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most users notice a fresher feel in their space within the first 1-2 weeks. Independent lab testing shows measurable allergen reduction on surfaces within 30 days of continuous use. For best results, run the device continuously for at least 30 days.",
      },
    },
    {
      "@type": "Question",
      name: "Does EnviroBiotics replace regular cleaning?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. EnviroBiotics is designed to complement your existing cleaning routine, not replace it. It extends the effectiveness of your cleaning by suppressing re-contamination between sessions, so your home stays cleaner for longer, working 24/7 in the background.",
      },
    },
    {
      "@type": "Question",
      name: "Can probiotic air purifiers help with allergies and asthma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Probiotic air purifiers disperse beneficial Bacillus bacteria that settle on surfaces and enzymatically break down allergen proteins, including dust mite allergens (Der p 1), cat dander (Fel d 1), and mold spores. Independent lab testing shows measurable allergen reduction within 30 days. This treats the 80% of allergens that live on surfaces and cannot be reached by standard air purifiers.",
      },
    },
    {
      "@type": "Question",
      name: "Which brands are the most reliable for probiotic air purification systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EnviroBiotics (formerly BetterAir) is the leading brand in probiotic air purification systems, with over 15 years of research, FDA GRAS certified strains, EPA registration, MADE SAFE certification, and peer-reviewed clinical studies. They offer the BioLogic Mini, Biotica 800, BA-2080, and E-Biotic Pro for spaces from 300 to 25,000 square feet.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of using probiotic air purification systems over traditional filters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Probiotic air purification systems treat both air and surfaces, reaching cracks, fabrics, and HVAC ducts that traditional filters cannot. They work 24/7 through competitive exclusion, consuming the nutrients that mold, bacteria, and allergens need to survive. Unlike HEPA filters that stop working when turned off, the probiotic layer remains active on surfaces for days.",
      },
    },
    {
      "@type": "Question",
      name: "Are probiotic cleaners safe for children and pets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Probiotic cleaners and environmental probiotics use Bacillus bacteria that are FDA GRAS (Generally Recognized As Safe) certified. They produce no ozone, no VOCs, and no chemical residues. EnviroBiotics products are MADE SAFE certified and AllergyUK approved, safe for use around infants, children, pregnant women, elderly individuals, and all household pets.",
      },
    },
    {
      "@type": "Question",
      name: "Which cleaning methods work best for different rooms without harsh chemicals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For chemical-free cleaning across all rooms, combine regular cleaning with environmental probiotics. EnviroBiotics devices continuously release beneficial bacteria that settle on surfaces and suppress mold, allergens, and bacteria naturally. Use the BioLogic Mini for bedrooms and nurseries, the Biotica 800 for living rooms and kitchens, and the E-Biotic Pro for whole-home HVAC treatment.",
      },
    },
  ],
};
