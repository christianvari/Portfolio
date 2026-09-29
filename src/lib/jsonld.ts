import achievements from "../data/achievements.json";
import certifications from "../data/certifications.json";
import education from "../data/education.json";
import patents from "../data/patents.json";
import work from "../data/work.json";
import { ecosystems, expertise, site } from "../data/site";
import { audits, auditUrl } from "./audits";

const person = (origin: URL, image: string) => ({
  "@type": "Person",
  "@id": new URL("/#person", origin).href,
  name: site.name,
  url: new URL("/", origin).href,
  image: new URL(image, origin).href,
  email: `mailto:${site.email}`,
  jobTitle: site.jobTitle,
  description: site.description,
  nationality: { "@type": "Country", name: "Italy" },
  sameAs: Object.values(site.social),
  worksFor: work
    .filter(w => w.current)
    .map(w => ({
      "@type": "Organization",
      name: w.company,
      ...(w.url ? { url: w.url } : {}),
    })),
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
  subjectOf: patents.map(p => ({
    "@type": "CreativeWork",
    additionalType: "https://schema.org/Patent",
    name: p.title,
    alternateName: p.originalTitle,
    inLanguage: p.originalLang,
    identifier: p.number,
    description: `${p.status} (${p.granted}, filed ${p.filed}). ${p.description}`,
    url: p.url,
    dateCreated: p.filed,
  })),
});

export const homeJsonLd = (origin: URL, image: string) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: new URL("/", origin).href,
  name: site.title,
  mainEntity: person(origin, image),
});

export const auditsJsonLd = (origin: URL) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: new URL("/audits/", origin).href,
  name: `Audits · ${site.name}`,
  author: { "@id": new URL("/#person", origin).href },
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
