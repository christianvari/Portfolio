import type { APIRoute } from "astro";
import { auditsMd, markdownResponse } from "../lib/markdown";

export const GET: APIRoute = () => markdownResponse(auditsMd());
