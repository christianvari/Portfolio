import data from "../sharedData/data/audit-history.json";
import { filterAliases, homeFeatured } from "../data/site";

export interface Audit {
  /** Permanent URL slug, also used on codezen.tech/audits/<slug>/. */
  slug: string;
  title: string;
  description: string;
  /** Logo path relative to the audit-history repo root, e.g. "images/stellar.png" (not displayed here). */
  image?: string;
  /** Report publication date (YYYY-MM-DD), when known. */
  date?: string;
  tags: string[];
  partner?: string;
  website?: string;
  github?: string;
  featured?: boolean;
  issues?: {
    critical: number;
    major: number;
    minor: number;
    informational: number;
  };
  /** Software Christian developed (not an audit): listed as development work, never on codezen.tech. */
  dev?: boolean;
  extendedDescription?: string;
}

const entries = data as Audit[];

/** Security audits only; development projects are kept apart and never counted as audits. */
export const audits = entries.filter(a => !a.dev);

/** Software Christian developed ("dev": true in audit-history.json). */
export const devProjects = entries.filter(a => a.dev);

const GENERIC_TAGS = new Set(["Audit", "Blockchain", "Smart Contract"]);

export const auditUrl = (a: Audit) =>
  `https://www.codezen.tech/audits/${a.slug}/`;

/** Tags worth displaying: drops generic ones. */
export const displayTags = (a: Audit, max = 2) =>
  a.tags.filter(t => !GENERIC_TAGS.has(t)).slice(0, max);

export const byline = (a: Audit) =>
  a.partner ? `${a.description} · with ${a.partner}` : a.description;

/** Filter keys an audit matches, with aliases resolved (e.g. Substrate -> Polkadot SDK). */
export const filterKeys = (a: Audit) => {
  const keys = new Set(a.tags);
  for (const [label, tags] of Object.entries(filterAliases))
    if (tags.some(t => keys.has(t))) keys.add(label);
  return [...keys];
};

export const totalAudits = audits.length;

export const totalIssues = audits.reduce(
  (sum, { issues: i }) =>
    i ? sum + i.critical + i.major + i.minor + i.informational : sum,
  0,
);

/** Audits per technology, largest first (the first bar is drawn in the accent color). */
export const techCounts = (techs: string[]) => {
  const counts = techs
    .map(name => ({
      name,
      count: audits.filter(a => a.tags.includes(name)).length,
    }))
    .sort((a, b) => b.count - a.count);
  const max = Math.max(...counts.map(c => c.count), 1);
  return counts.map(c => ({
    ...c,
    percent: Math.round((c.count / max) * 1000) / 10,
  }));
};

export const featuredAudits = (() => {
  const picked = homeFeatured
    .map(slug => audits.find(a => a.slug === slug))
    .filter((a): a is Audit => Boolean(a));
  return picked.length === homeFeatured.length
    ? picked
    : audits.filter(a => a.featured).slice(0, 6);
})();
