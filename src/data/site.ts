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
