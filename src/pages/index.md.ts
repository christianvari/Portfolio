import type { APIRoute } from "astro";
import { homeMd, markdownResponse } from "../lib/markdown";

export const GET: APIRoute = () => markdownResponse(homeMd());
