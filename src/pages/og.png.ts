import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { site } from "../data/site";

const require = createRequire(import.meta.url);
const font = (weight: number) =>
  readFile(
    require.resolve(
      `@fontsource/geist/files/geist-latin-${weight}-normal.woff`,
    ),
  );

// Plain object tree instead of JSX (satori accepts React-element-shaped nodes).
const h = (
  type: string,
  style: Record<string, unknown>,
  children?: unknown,
) => ({
  type,
  props: { style, children },
});

export const GET: APIRoute = async () => {
  const svg = await satori(
    h(
      "div",
      {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#f5f3ee",
        color: "#1b1a17",
        fontFamily: "Geist",
      },
      [
        h(
          "div",
          {
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#6b675f",
          },
          [
            h("div", {
              width: 16,
              height: 16,
              borderRadius: 99,
              background: "#2f5bd3",
            }),
            "christianvari.dev",
          ],
        ),
        h("div", { display: "flex", flexDirection: "column", gap: 24 }, [
          h(
            "div",
            {
              display: "flex",
              fontSize: 132,
              fontWeight: 500,
              letterSpacing: "-0.06em",
              lineHeight: 0.9,
            },
            [site.name, h("span", { color: "#2f5bd3" }, ".")],
          ),
          h(
            "div",
            { fontSize: 40, color: "#3d3a35", letterSpacing: "-0.03em" },
            "Blockchain Security Researcher · Founder & CEO, Codezen",
          ),
        ]),
      ],
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
