import type { APIRoute } from "astro";
import { markdownResponse, researchHubMd } from "../lib/markdown";

export const GET: APIRoute = () => markdownResponse(researchHubMd());
