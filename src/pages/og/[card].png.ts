import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { site } from "../../data/site";
import { totalAudits, totalIssues } from "../../lib/audits";

// Social share cards (1200×630), rendered at build time: /og/home.png, /og/audits.png.

const require = createRequire(import.meta.url);
const font = (weight: number) =>
  readFile(
    require.resolve(
      `@fontsource/geist/files/geist-latin-${weight}-normal.woff`,
    ),
  );

const C = {
  bg: "#f5f3ee",
  ink: "#1b1a17",
  ink2: "#3d3a35",
  muted: "#6b675f",
  accent: "#2f5bd3",
};

// Same "cv." mark as src/components/LogoMark.astro (cropped viewBox).
const mark = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="2.9 7.9 22.6 10.6"><path d="M11.2 10 A4.4 4.4 0 1 0 11.2 16.4 M13.6 9.2 L17 17.6 L20.4 9.2" fill="none" stroke="${C.ink}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="23.6" cy="16.2" r="1.9" fill="${C.accent}"/></svg>`,
)}`;

type Node = { type: string; props: Record<string, unknown> };
// Plain object tree instead of JSX (satori accepts React-element-shaped nodes).
const h = (
  type: string,
  style: Record<string, unknown>,
  children?: unknown,
  extra: Record<string, unknown> = {},
): Node => ({ type, props: { style, children, ...extra } });

const header = () =>
  h(
    "div",
    { display: "flex", alignItems: "center", justifyContent: "space-between" },
    [
      h("div", { display: "flex", alignItems: "center", gap: 18 }, [
        h("img", { width: 68, height: 32 }, undefined, {
          src: mark,
          width: 68,
          height: 32,
        }),
        h(
          "div",
          {
            fontSize: 30,
            fontWeight: 500,
            color: C.ink,
            letterSpacing: "-0.01em",
          },
          site.name,
        ),
      ]),
      h("div", { fontSize: 24, color: C.muted }, "christianvari.dev"),
    ],
  );

const stat = (label: string, value: number, accent = false) =>
  h("div", { display: "flex", flexDirection: "column", gap: 4 }, [
    h("div", { fontSize: 22, color: C.muted }, label),
    h(
      "div",
      {
        fontSize: 76,
        fontWeight: 500,
        letterSpacing: "-0.04em",
        color: accent ? C.accent : C.ink,
      },
      String(value),
    ),
  ]);

const cards = {
  home: () =>
    h("div", { display: "flex", flexDirection: "column", gap: 26 }, [
      h(
        "div",
        {
          display: "flex",
          fontSize: 128,
          fontWeight: 500,
          letterSpacing: "-0.06em",
          lineHeight: 0.9,
          color: C.ink,
        },
        [site.name, h("span", { color: C.accent }, ".")],
      ),
      h(
        "div",
        {
          display: "flex",
          fontSize: 44,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          color: C.ink2,
        },
        [
          "Securing",
          h(
            "span",
            { color: C.accent, marginLeft: 12 },
            "blockchain protocols.",
          ),
        ],
      ),
    ]),
  audits: () =>
    h(
      "div",
      {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      },
      [
        h(
          "div",
          {
            display: "flex",
            fontSize: 150,
            fontWeight: 500,
            letterSpacing: "-0.055em",
            lineHeight: 0.9,
            color: C.ink,
          },
          ["Audits", h("span", { color: C.accent }, ".")],
        ),
        h("div", { display: "flex", gap: 56, paddingBottom: 8 }, [
          stat("Completed", totalAudits),
          stat("Issues found", totalIssues, true),
        ]),
      ],
    ),
};

type Card = keyof typeof cards;

export const getStaticPaths = (() =>
  Object.keys(cards).map(card => ({
    params: { card },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const body = cards[params.card as Card]();
  const svg = await satori(
    h(
      "div",
      {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px 72px",
        background: C.bg,
        fontFamily: "Geist",
        borderBottom: `14px solid ${C.accent}`,
      },
      [header(), body],
    ) as never,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: await font(400), weight: 400, style: "normal" },
        { name: "Geist", data: await font(500), weight: 500, style: "normal" },
      ],
    },
  );
  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
