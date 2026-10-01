import type { APIRoute } from "astro";
import patents from "../../data/patents.json";
import { markdownResponse, patentMd } from "../../lib/markdown";

export const getStaticPaths = () =>
  patents.map(patent => ({ params: { slug: patent.slug }, props: { patent } }));

export const GET: APIRoute = ({ props }) =>
  markdownResponse(patentMd(props.patent as (typeof patents)[number]));
