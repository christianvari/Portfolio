import achievements from "../data/achievements.json";
import certifications from "../data/certifications.json";
import education from "../data/education.json";
import work from "../data/work.json";
import { ecosystems, expertise, identity, site } from "../data/site";
import { audits, auditUrl } from "./audits";
import {
  researchIntro,
  researchItems,
  researchPath,
  type ResearchItem,
} from "./research";

// schema.org JSON-LD. The home page publishes a connected @graph (Person, the
// organizations he founded, his research) whose @ids match the entities on
// codezen.tech and altairith.capital, so search engines can merge them.

const id = (origin: URL, fragment: string) =>
  new URL(`/#${fragment}`, origin).href;
const personId = (origin: URL) => id(origin, "person");
// Research items keep a stable @id (the patent's was published as #patent-<number>).
const researchId = (origin: URL, r: ResearchItem) =>
  id(origin, `${r.type.toLowerCase()}-${r.number.toLowerCase()}`);

/** Profiles that identify the person (not company homepages or documents). */
const sameAs = () =>
  [
    site.social.linkedin,
    site.social.x,
    site.social.github,
    identity.orcid,
    ...identity.personIds,
  ].filter(Boolean);

const orgRef = (company: string, url?: string) => ({
  "@type": "Organization",
  ...(identity.orgIds[company] ? { "@id": identity.orgIds[company] } : {}),
  name: company,
  ...(url ? { url } : {}),
});

const person = (origin: URL, image: string) => ({
  "@type": "Person",
  "@id": personId(origin),
  name: site.name,
  url: new URL("/", origin).href,
  mainEntityOfPage: new URL("/", origin).href,
  image: new URL(image, origin).href,
  email: `mailto:${site.email}`,
  jobTitle: site.jobTitle,
  description: site.description,
  nationality: { "@type": "Country", name: "Italy" },
  sameAs: sameAs(),
  worksFor: work.filter(w => w.current).map(w => orgRef(w.company, w.url)),
  alumniOf: education.map(e => ({
    "@type": "CollegeOrUniversity",
    name: e.title,
    url: e.url,
  })),
  award: achievements.map(a => `${a.title} (${a.year})`),
  hasCredential: certifications.map(c => ({
    "@type": "EducationalOccupationalCredential",
    name: c.title,
    url: c.url,
    recognizedBy: { "@type": "Organization", name: c.issuer },
  })),
  knowsAbout: [
    ...new Set([
      ...ecosystems,
      ...expertise,
      "Smart contract auditing",
      "Blockchain security",
      ...researchItems.flatMap(r => r.keywords),
    ]),
  ],
  subjectOf: researchItems.map(r => ({ "@id": researchId(origin, r) })),
});

/** Organizations he founded, pointing back at the person as founder. */
const foundedOrgs = (origin: URL) =>
  identity.founded.map(company => {
    const job = work.find(w => w.company === company);
    return {
      ...orgRef(company, job?.url),
      founder: { "@id": personId(origin) },
    };
  });

/** A research item as its own entity, with the person as creator. */
const researchNode = (origin: URL, r: ResearchItem) => ({
  "@type": "CreativeWork",
  ...(r.type === "Patent"
    ? { additionalType: "https://schema.org/Patent" }
    : {}),
  "@id": researchId(origin, r),
  name: r.title,
  alternateName: r.originalTitle,
  inLanguage: r.originalLang,
  identifier: r.number,
  description: `${r.status} (${r.granted}, filed ${r.filed}). ${r.description}`,
  abstract: r.summary.join(" "),
  keywords: r.keywords.join(", "),
  about: r.field,
  url: new URL(researchPath(r), origin).href,
  sameAs: r.url,
  dateCreated: r.filed,
  creator: { "@id": personId(origin) },
  isPartOf: { "@id": new URL("/research/", origin).href },
});

const breadcrumbs = (origin: URL, page: string, trail: [string, string][]) => ({
  "@type": "BreadcrumbList",
  "@id": `${page}#breadcrumb`,
  itemListElement: trail.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: new URL(path, origin).href,
  })),
});

const personRef = (origin: URL) => ({
  "@type": "Person",
  "@id": personId(origin),
  name: site.name,
  url: new URL("/", origin).href,
});

export const homeJsonLd = (origin: URL, image: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": new URL("/", origin).href,
      url: new URL("/", origin).href,
      name: site.title,
      mainEntity: { "@id": personId(origin) },
    },
    {
      "@type": "WebSite",
      "@id": id(origin, "website"),
      url: new URL("/", origin).href,
      name: site.name,
      publisher: { "@id": personId(origin) },
    },
    person(origin, image),
    ...foundedOrgs(origin),
    ...researchItems.map(r => researchNode(origin, r)),
  ],
});

export const auditsJsonLd = (origin: URL) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: new URL("/audits/", origin).href,
  name: `Audits · ${site.name}`,
  isPartOf: { "@id": id(origin, "website") },
  author: { "@id": personId(origin) },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: audits.length,
    itemListElement: audits.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.title,
      url: auditUrl(a),
    })),
  },
});

/** /research/ hub: a collection of all research items. */
export const researchHubJsonLd = (origin: URL) => {
  const page = new URL("/research/", origin).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": new URL("/research/", origin).href,
        url: page,
        name: `Research · ${site.name}`,
        description: researchIntro,
        isPartOf: { "@id": id(origin, "website") },
        author: { "@id": personId(origin) },
        breadcrumb: { "@id": `${page}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: researchItems.length,
          itemListElement: researchItems.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@id": researchId(origin, r) },
          })),
        },
      },
      breadcrumbs(origin, page, [
        [site.name, "/"],
        ["Research", "/research/"],
      ]),
      ...researchItems.map(r => researchNode(origin, r)),
      personRef(origin),
    ],
  };
};

/** A single research item page. */
export const researchItemJsonLd = (origin: URL, r: ResearchItem) => {
  const page = new URL(researchPath(r), origin).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": page,
        url: page,
        name: `${r.title} · ${site.name}`,
        isPartOf: { "@id": id(origin, "website") },
        mainEntity: { "@id": researchId(origin, r) },
        breadcrumb: { "@id": `${page}#breadcrumb` },
      },
      breadcrumbs(origin, page, [
        [site.name, "/"],
        ["Research", "/research/"],
        [r.title, researchPath(r)],
      ]),
      researchNode(origin, r),
      personRef(origin),
    ],
  };
};
