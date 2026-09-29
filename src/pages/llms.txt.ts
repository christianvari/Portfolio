import type { APIRoute } from "astro";
import { llmsTxt, markdownResponse } from "../lib/markdown";

export const GET: APIRoute = () => markdownResponse(llmsTxt(), "text/plain");
