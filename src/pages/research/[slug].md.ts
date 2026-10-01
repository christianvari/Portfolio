import type { APIRoute } from "astro";
import { markdownResponse, researchItemMd } from "../../lib/markdown";
import { researchItems, type ResearchItem } from "../../lib/research";

export const getStaticPaths = () =>
  researchItems.map(item => ({ params: { slug: item.slug }, props: { item } }));

export const GET: APIRoute = ({ props }) =>
  markdownResponse(researchItemMd(props.item as ResearchItem));
