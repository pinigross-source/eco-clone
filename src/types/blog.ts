export interface FAQ {
  q: string;
  a: string;
}

export interface RelatedLink {
  title: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  image: string;
  imageAlt?: string;
  category: string;
  content: string[];
  author?: string;
  publishDate?: string;
  readTime?: string;
  quickAnswer?: string;
  keyTakeaways?: string[];
  faqs?: FAQ[];
  relatedSlugs?: string[];
  relatedLinks?: RelatedLink[];
  tags?: string[];
  externalUrl?: string;
  /** Slugs of related blog posts for internal linking */
  // relatedSlugs is already above
}
