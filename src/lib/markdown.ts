// Plain-markdown versions of the site for AI agents and scrapers
// (/index.md, /audits.md, /llms.txt, /llms-full.txt). Built from the same data as the HTML pages.
import achievements from "../data/achievements.json";
import certifications from "../data/certifications.json";
import education from "../data/education.json";
import patents from "../data/patents.json";
import work from "../data/work.json";
import { typedWords } from "../data/heroCode";
import {
  bio,
  ecosystems,
  expertise,
  identity,
  reviewTechnologies,
  site,
} from "../data/site";
import {
  auditUrl,
  audits,
  featuredAudits,
  techCounts,
  totalAudits,
  totalIssues,
  type Audit,
} from "./audits";

export const SITE_URL = "https://www.christianvari.dev";
const abs = (path: string) => new URL(path, SITE_URL).href;

const tagline = `Securing ${typedWords.map(w => w.replace(/\.$/, "")).join(", ")}.`;

const links = () =>
  [
    `- Website: ${abs("/")}`,
    `- Email: ${site.email}`,
    `- X: ${site.social.x}`,
    `- LinkedIn: ${site.social.linkedin}`,
    `- GitHub: ${site.social.github}`,
    `- ORCID: ${identity.orcid}`,
    `- Codezen: ${site.social.codezen}`,
  ].join("\n");

const issueSummary = (a: Audit) => {
  const i = a.issues;
  if (!i) return "";
  const total = i.critical + i.major + i.minor + i.informational;
  return `${total} issues (${i.critical} critical, ${i.major} major, ${i.minor} minor, ${i.informational} informational)`;
};

const auditLine = (a: Audit) => {
  const parts = [
    `[${a.title}](${auditUrl(a)})`,
    a.description,
    a.partner && `with ${a.partner}`,
    issueSummary(a),
    a.tags.length && `tags: ${a.tags.join(", ")}`,
    a.github && `[report](${a.github})`,
  ].filter(Boolean);
  return `- ${parts.join(" — ")}`;
};

export const aboutMd = () => `# ${site.name}

> ${site.jobTitle}. Founder & CEO of Codezen, Head of Audit Operations at Oak Security. ${tagline}

${bio.lead}

${bio.paragraphs.join("\n\n")}

## Links

${links()}`;

const experienceMd = () =>
  work
    .map(job => {
      const head = `### ${job.company}${job.url ? ` (${job.url})` : ""} · ${job.dates}`;
      const roles = job.roles
        .map(
          r => `- ${r.title}${"dates" in r && r.dates ? ` (${r.dates})` : ""}`,
        )
        .join("\n");
      return `${head}\n\n${roles}\n\nSkills: ${job.tags.join(", ")}`;
    })
    .join("\n\n");

const patentsMd = () =>
  patents
    .map(
      p =>
        `- **[${p.title}](${abs(`/patents/${p.slug}.md`)})** (${p.originalLang}: "${p.originalTitle}") — ${p.number}. ${p.status}, ${p.granted} (filed ${p.filed}). ${p.description} Official record: ${p.url}`,
    )
    .join("\n");

type Patent = (typeof patents)[number];

export const patentMd = (p: Patent) => `# ${p.title}

> ${p.status} ${p.number} — filed ${p.filed}, granted ${p.granted}. ${p.description}

- Original title (${p.originalLang}): ${p.originalTitle}
- Publication number: ${p.number}
- Status: ${p.status}
- Filed: ${p.filed}
- Granted: ${p.granted}
- Office: ${p.office}
- Field: ${p.field}
- Holder: ${site.name} (${abs("/")})
- Official record: ${p.url}
- Web page: ${abs(`/patents/${p.slug}/`)}

## Summary

${p.summary.join("\n\n")}

## The problem

${p.problem.join("\n\n")}

## How it works

${p.pipeline.map((s, i) => `${i + 1}. **${s.name}** (${s.role}): ${s.text}`).join("\n")}

## Architecture

${p.architecture.map(a => `- **${a.name}**: ${a.text}`).join("\n")}

## Why it matters

${p.benefits.map(b => `- ${b}`).join("\n")}
`;

export const homeMd = () => `${aboutMd()}

## Experience

${experienceMd()}

## Education

${education.map(e => `- ${e.title}: ${e.subtitle}`).join("\n")}

## Patents

${patentsMd()}

## Expertise

Ecosystems: ${ecosystems.join(", ")}.
Skills: ${expertise.join(", ")}.

Security reviews by technology (number of audits):
${techCounts(reviewTechnologies)
  .map(t => `- ${t.name}: ${t.count}`)
  .join("\n")}

## Security reviews

${totalAudits} completed audits, ${totalIssues} issues found. Full list: ${abs("/audits.md")} (JSON: ${abs("/audits.json")}).

Selected work:
${featuredAudits.map(auditLine).join("\n")}

## Achievements

${achievements.map(a => `- ${a.title} (${a.year}): ${a.url}`).join("\n")}

## Certifications

${certifications.map(c => `- ${c.title} — ${c.issuer}: ${c.url}`).join("\n")}

## Contact

${links()}
`;

export const auditsMd = () => `# Audits · ${site.name}

> ${totalAudits} completed security audits, ${totalIssues} issues found. Performed by ${site.name}; each entry names the partner firm where applicable, and links to its page on codezen.tech and, when public, to the audit report.

${audits.map(auditLine).join("\n")}
`;

export const auditsJson = () => ({
  author: site.name,
  url: abs("/audits/"),
  totalAudits,
  totalIssues,
  audits: audits.map(a => ({
    slug: a.slug,
    title: a.title,
    date: a.date ?? null,
    type: a.description,
    partner: a.partner ?? null,
    tags: a.tags,
    issues: a.issues ?? null,
    url: auditUrl(a),
    report: a.github ?? null,
    website: a.website ?? null,
  })),
});

export const llmsTxt = () => `# ${site.name}

> ${site.jobTitle} — Founder & CEO of Codezen, Head of Audit Operations at Oak Security. ${tagline} ${totalAudits} completed audits and ${totalIssues} issues found across Solana, Cosmos SDK, Polkadot SDK, Ethereum and EVM.

Markdown versions of every page are available; prefer them over the HTML.

## Pages

- [Profile](${abs("/index.md")}): bio, experience, education, patent, expertise, selected audits, achievements, certifications and contact
- [Audits](${abs("/audits.md")}): every audit with type, partner, issue counts and report links
- [Full context](${abs("/llms-full.txt")}): profile and all audits in a single file
${patents.map(p => `- [Patent: ${p.title}](${abs(`/patents/${p.slug}.md`)}): ${p.status} ${p.number}, how the invention works`).join("\n")}

## Data

- [audits.json](${abs("/audits.json")}): the audit list as JSON, with totals

## Optional

- [Privacy & cookies](${abs("/privacy/")})
`;

export const llmsFullTxt = () => `${homeMd()}
---

${patents.map(patentMd).join("\n---\n\n")}
---

${auditsMd()}`;

export const markdownResponse = (body: string, type = "text/markdown") =>
  new Response(body, { headers: { "Content-Type": `${type}; charset=utf-8` } });
