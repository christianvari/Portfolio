export const site = {
  name: "Christian Vari",
  title: "Christian Vari · Blockchain Security Researcher",
  description:
    "Christian Vari is a blockchain security researcher and Founder & CEO of Codezen, auditing Solana, Cosmos SDK, Polkadot SDK, Ethereum and EVM protocols.",
  jobTitle: "Security Researcher",
  email: "info@codezen.tech",
  locale: "en_US",
  twitter: "@christianvari_",
  social: {
    x: "https://x.com/christianvari_",
    linkedin: "https://www.linkedin.com/in/christianvari/",
    github: "https://github.com/christianvari",
    codezen: "https://www.codezen.tech",
  },
};

/**
 * Identity links for structured data (src/lib/jsonld.ts).
 * `personIds` are the JSON-LD @ids other sites use for the same person; listing them in
 * sameAs lets search engines merge those descriptions into one entity.
 */
export const identity = {
  // ORCID iD URL, e.g. "https://orcid.org/0000-0002-1825-0097". Left out of sameAs while empty.
  orcid: "",
  personIds: [
    "https://www.codezen.tech/#christian-vari",
    "https://www.altairith.capital/#christian-vari",
  ],
  // Company name (as in work.json) → that company's Organization @id.
  orgIds: {
    Codezen: "https://www.codezen.tech/#organization",
    "Altairith Capital Holding": "https://www.altairith.capital/#organization",
  } as Record<string, string>,
  founded: ["Codezen", "Altairith Capital Holding"],
};

/** About section copy (also used by the markdown/llms.txt versions). */
export const bio = {
  lead: "I’m Christian Vari, Founder & CEO of Codezen, a blockchain security firm focused on auditing financial and Web3 systems.",
  paragraphs: [
    "I’ve worked on 250+ audits, identifying over 900 vulnerabilities and helping securing assets across Solana, Cosmos SDK, Polkadot SDK, Ethereum and EVM ecosystems.",
    "I currently serve as Head of Audit Operations at Oak Security and collaborate with leading security teams in the industry, including Zenith Security and Trust Security.",
    "I’m also Chairman of Altairith Capital, a holding company focused on technology and security-driven ventures.",
    "My work focuses on reviewing smart contracts, protocol logic, and distributed systems, with particular attention to assumptions, invariants, and real-world failure modes.",
    "I’m particularly interested in how AI can assist security research and auditing workflows without reducing depth of reasoning or introducing new risks.",
  ],
};

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Patents", href: "/#patents" },
  { label: "Expertise", href: "/#skills" },
  { label: "Audits", href: "/#audits" },
  { label: "Contact", href: "/#contact" },
];

/** Shorter nav used on inner pages (audits, 404, privacy); Audits links to the full list. */
export const compactNav = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Audits", href: "/audits/" },
  { label: "Contact", href: "/#contact" },
];

export const ecosystems = [
  "Solana",
  "Cosmos SDK",
  "Polkadot SDK",
  "Ethereum",
  "EVM",
  "CosmWasm",
  "Anchor",
  "Substrate",
  "Filecoin FEVM",
  "Stellar",
];

export const expertise = [
  "Solana",
  "Anchor",
  "Polkadot SDK",
  "TypeScript",
  "C++",
  "Risk Management",
];

/** Technologies shown as bars in the Expertise section, counted from audit tags. */
export const reviewTechnologies = [
  "Rust",
  "Golang",
  "CosmWasm",
  "Cosmos SDK",
  "Solidity",
  "Substrate",
];

/** Audits shown on the home page, by title, in display order. */
export const homeFeatured = [
  "Stellar Core",
  "Story Protocol L1",
  "Snowfork Snowbridge",
  "Cosmos SDK v0.47",
  "Filecoin FEVM",
  "Cosmos Interchain Security",
];

export const auditFilters = [
  "All",
  "Rust",
  "Golang",
  "Cosmos SDK",
  "CosmWasm",
  "Polkadot SDK",
  "Solidity",
  "C++",
];

/** Filter label -> audit tags it matches (the JSON uses several names for Polkadot). */
export const filterAliases: Record<string, string[]> = {
  "Polkadot SDK": ["Polkadot SDK", "Polkadot", "Substrate"],
};
