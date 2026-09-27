import pillarIndex from '../../data/pillars/index.json';
import pages from '../../data/pages.json';
import type { Pillar, PillarContent, PillarSummary } from '../models/pillar.model';
import type { StaticPage } from '../seo/seo-shared.mjs';

export const PILLARS: PillarSummary[] = pillarIndex as PillarSummary[];

export const PAGES = pages as Record<string, StaticPage>;

// Pillar bodies are code-split so the menu and routes stay light: each one is
// only downloaded when its page is opened.
const CONTENT: Record<string, () => Promise<{ default: unknown }>> = {
  'web-development': () => import('../../data/pillars/web-development.json'),
  'digital-marketing': () => import('../../data/pillars/digital-marketing.json'),
  'paid-marketing': () => import('../../data/pillars/paid-marketing.json'),
  'brand-building': () => import('../../data/pillars/brand-building.json'),
  'workflow-automation': () => import('../../data/pillars/workflow-automation.json'),
  'marketing-automation': () => import('../../data/pillars/marketing-automation.json'),
};

export async function loadPillar(slug: string): Promise<Pillar | undefined> {
  const summary = PILLARS.find(p => p.slug === slug);
  const loader = CONTENT[slug];
  if (!summary || !loader) return undefined;
  const content = (await loader()).default as PillarContent;
  return { ...summary, ...content };
}
