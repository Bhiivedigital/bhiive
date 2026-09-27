// A service pillar: the long-form service page at /:slug that every related
// article hangs off (/:slug/:article). The light summary lives in
// data/pillars/index.json (menus, routes, cards); the body lives in
// data/pillars/<slug>.json and is only loaded on the pillar page itself.

export interface Faq {
  q: string;
  a: string;
}

export interface PillarSummary {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  menuText: string;
  summary: string;
  h1: string;
  eyebrow: string;
  serviceType?: string;
  /** CMS article categories that belong to this pillar. */
  categories: string[];
  /** Slug keywords used to place articles that have no category yet. */
  keywords: string[];
  /** Lower matches first when placing uncategorised articles. */
  matchOrder?: number;
  fallback?: boolean;
  seo: { title: string; description: string; keywords?: string };
  image?: string;
}

export interface TextSection {
  type: 'text';
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
  closing?: string;
}

export interface CardItem {
  title: string;
  text: string;
  points?: string[];
  paragraphs?: string[];
}

export interface CardsSection {
  type: 'cards';
  id: string;
  heading: string;
  intro?: string;
  items: CardItem[];
}

export interface ChecklistSection {
  type: 'checklist';
  id: string;
  heading: string;
  intro?: string;
  items: string[];
}

export interface StepsSection {
  type: 'steps';
  id: string;
  heading: string;
  intro?: string;
  items: { title: string; text: string }[];
}

export interface StatementsSection {
  type: 'statements';
  id: string;
  heading: string;
  items: { lead: string; text: string }[];
}

export interface TagsSection {
  type: 'tags';
  id: string;
  heading: string;
  paragraphs: string[];
  items: string[];
}

export type PillarSection =
  | TextSection
  | CardsSection
  | ChecklistSection
  | StepsSection
  | StatementsSection
  | TagsSection;

export interface PillarContent {
  lead: string;
  intro: string[];
  highlights: string[];
  sections: PillarSection[];
  faqs: Faq[];
  related: string[];
  cta: { heading: string; text: string };
}

export type Pillar = PillarSummary & PillarContent;
