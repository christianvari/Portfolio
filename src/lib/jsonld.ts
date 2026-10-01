import achievements from "../data/achievements.json";
import certifications from "../data/certifications.json";
import education from "../data/education.json";
import patents from "../data/patents.json";
import work from "../data/work.json";
import { ecosystems, expertise, identity, site } from "../data/site";
import { audits, auditUrl } from "./audits";

// schema.org JSON-LD. The home page publishes a connected @graph (Person, the
// organizations he founded, the patent) whose @ids match the entities on
// codezen.tech and altairith.capital, so search engines can merge them.

const id = (origin: URL, fragment: string) =>
  new URL(`/#${fragment}`, origin).href;
const personId = (origin: URL) => id(origin, "person");
const patentId = (origin: URL, number: string) =>
  id(origin, `patent-${number.toLowerCase()}`);

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
    ]),
  ],
  subjectOf: patents.map(p => ({ "@id": patentId(origin, p.number) })),
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

export const patentPath = (p: { slug: string }) => `/patents/${p.slug}/`;

type PatentData = (typeof patents)[number];

/** The patent as its own entity, with the person as inventor. */
const patentNode = (origin: URL, p: PatentData) => ({
  "@type": "CreativeWork",
  additionalType: "https://schema.org/Patent",
  "@id": patentId(origin, p.number),
  name: p.title,
  alternateName: p.originalTitle,
  inLanguage: p.originalLang,
  identifier: p.number,
  description: `${p.status} (${p.granted}, filed ${p.filed}). ${p.description}`,
  url: new URL(patentPath(p), origin).href,
  sameAs: p.url,
  dateCreated: p.filed,
  about: p.field,
  creator: { "@id": personId(origin) },
});

const patentNodes = (origin: URL) => patents.map(p => patentNode(origin, p));

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
    ...patentNodes(origin),
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

export const patentJsonLd = (origin: URL, p: PatentData) => {
  const page = new URL(patentPath(p), origin).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": page,
        url: page,
        name: `${p.title} · ${site.name}`,
        isPartOf: { "@id": id(origin, "website") },
        mainEntity: { "@id": patentId(origin, p.number) },
        breadcrumb: { "@id": `${page}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${page}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: site.name,
            item: new URL("/", origin).href,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Patents",
            item: new URL("/#patents", origin).href,
          },
          { "@type": "ListItem", position: 3, name: p.title, item: page },
        ],
      },
      patentNode(origin, p),
      {
        "@type": "Person",
        "@id": personId(origin),
        name: site.name,
        url: new URL("/", origin).href,
      },
    ],
  };
};
