import data from "../sharedData/data/audit-history.json";
import { filterAliases, homeFeatured } from "../data/site";

export interface Audit {
  title: string;
  description: string;
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
}

export const audits = data as Audit[];

const GENERIC_TAGS = new Set(["Audit", "Blockchain", "Smart Contract"]);

export const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const auditUrl = (a: Audit) =>
  `https://www.codezen.tech/audits/${slug(a.title)}/`;

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

export const techCounts = (techs: string[]) => {
  const counts = techs.map(name => ({
    name,
    count: audits.filter(a => a.tags.includes(name)).length,
  }));
  const max = Math.max(...counts.map(c => c.count), 1);
  return counts.map(c => ({
    ...c,
    percent: Math.round((c.count / max) * 1000) / 10,
  }));
};

export const featuredAudits = (() => {
  const picked = homeFeatured
    .map(title => audits.find(a => a.title === title))
    .filter((a): a is Audit => Boolean(a));
  return picked.length === homeFeatured.length
    ? picked
    : audits.filter(a => a.featured).slice(0, 6);
})();
