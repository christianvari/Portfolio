import type { APIRoute } from "astro";
import { auditsJson } from "../lib/markdown";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(auditsJson(), null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
