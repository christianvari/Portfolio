import type { APIRoute } from "astro";
import { llmsFullTxt, markdownResponse } from "../lib/markdown";

export const GET: APIRoute = () =>
  markdownResponse(llmsFullTxt(), "text/plain");
