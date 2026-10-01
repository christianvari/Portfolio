// Research items (patents today; publications or talks later) from src/data/research.json.
import research from "../data/research.json";

export type ResearchItem = (typeof research)[number];

export const researchItems = research;

export const researchPath = (r: { slug: string }) => `/research/${r.slug}/`;

/** Short line shown above titles, e.g. "Patent · IT202400016273A1". */
export const researchKicker = (r: ResearchItem) => `${r.type} · ${r.number}`;

/** e.g. "Granted patent · 2026 (filed 2024)". */
export const researchStatus = (r: ResearchItem) =>
  `${r.status} · ${r.granted} (filed ${r.filed})`;

/** Intro used on the home section and the /research/ hub. */
export const researchIntro =
  "Patents, papers and applied research on blockchain security, smart contract auditing and AI-assisted security tooling.";
