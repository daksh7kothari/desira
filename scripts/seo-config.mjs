import { loadEnv } from "vite";

const localEnv = loadEnv("production", process.cwd(), "");
const rawSiteUrl = process.env.VERCEL_ENV === "production"
  ? "https://desiraft.com"
  : process.env.SITE_URL || process.env.VITE_SITE_URL || localEnv.SITE_URL || localEnv.VITE_SITE_URL || "";

export function normalizePublicOrigin(value = rawSiteUrl) {
  if (!value) return "";
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    if (url.protocol !== "https:") return "";
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0" || hostname === "::1" || hostname.endsWith(".local")) return "";
    return hostname === "www.desiraft.com" ? "https://desiraft.com" : url.origin;
  } catch {
    return "";
  }
}

export const publicSiteUrl = normalizePublicOrigin();
export const isPublicSite = Boolean(publicSiteUrl) && process.env.VERCEL_ENV !== "preview";

export function joinUrl(origin, pathname = "/") {
  if (!origin) return "";
  return `${origin}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
