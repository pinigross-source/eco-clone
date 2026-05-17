export interface Author {
  slug: string;
  name: string;
  /** Schema.org @type */
  type: "Person" | "Organization";
  jobTitle: string;
  bio: string;
  longBio: string[];
  credentials: string[];
  /** Optional profile image URL */
  image?: string;
  /** External profile/social links for sameAs */
  sameAs?: string[];
}

export const authors: Author[] = [
  {
    slug: "envirobiotics-editorial-team",
    name: "EnviroBiotics Editorial Team",
    type: "Organization",
    jobTitle: "Editorial & Research Team",
    bio: "The EnviroBiotics editorial team writes about indoor air quality, environmental probiotics, and the science of healthier homes. Every article is reviewed by our scientific advisors before publication.",
    longBio: [
      "The EnviroBiotics editorial team is a group of writers, researchers, and indoor-environment specialists who translate peer-reviewed microbiology into practical guidance for homeowners, parents, and facility managers.",
      "Every article on this site is fact-checked against primary sources — EPA registrations, FDA GRAS notices, and published microbiome research — and reviewed by our scientific advisors before publication.",
      "We cover probiotic air purification, the indoor microbiome, allergen reduction, mold prevention, and the practical day-to-day choices that shape the air you breathe at home.",
    ],
    credentials: [
      "Backed by FDA GRAS-certified Bacillus probiotic research",
      "EPA-registered active ingredients",
      "MADE SAFE certified formulations",
      "Reviewed by EnviroBiotics scientific advisors",
    ],
    sameAs: [
      "https://envirobiotics.com",
    ],
  },
];

export const getAuthorBySlug = (slug: string): Author | undefined =>
  authors.find((a) => a.slug === slug);

export const DEFAULT_AUTHOR_SLUG = "envirobiotics-editorial-team";
