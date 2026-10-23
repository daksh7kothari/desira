import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { isPublicSite, publicSiteUrl } from "./seo-config.mjs";

const errors = [];
const root = "dist";
const htmlFiles = [];
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (entry.name.endsWith(".html")) htmlFiles.push(path);
  }
}
await collect(root);
if (!htmlFiles.length) errors.push("dist contains no prerendered HTML files");
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1] || "";
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || "";
  const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] || "";
  if (!title.trim()) errors.push(`${file}: missing title`);
  if (!description.trim()) errors.push(`${file}: missing meta description`);
  if ((html.match(/rel="canonical"/g) || []).length > 1) errors.push(`${file}: duplicate canonical`);
  if (html.includes("localhost:5173") || html.includes("127.0.0.1:5173")) errors.push(`${file}: local URL leaked into SEO markup`);
  if (!isPublicSite && !robots.includes("noindex")) errors.push(`${file}: preview build must be noindex`);
  if (isPublicSite && file.endsWith(`${join("404.html")}`) && !robots.includes("noindex")) errors.push(`${file}: 404 must be noindex`);
  if (isPublicSite && html.includes("content=\"noindex,follow\"") && !file.includes("404")) {
    // Samples are intentionally noindex; no action needed.
  }
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const robots = await readFile("dist/robots.txt", "utf8");
const home = await readFile("dist/index.html", "utf8");
for (const asset of ["favicon.png", "desira-social.png"]) {
  if (!(await stat(join(root, asset)).catch(() => null))?.size) errors.push(`missing ${asset}`);
}
if (isPublicSite) {
  if (!sitemap.includes(publicSiteUrl)) errors.push("sitemap has no public origin");
  if (!robots.includes(`Sitemap: ${publicSiteUrl}/sitemap.xml`)) errors.push("robots.txt has no sitemap directive");
  if (!home.includes(`rel="canonical" href="${publicSiteUrl}/"`)) errors.push("homepage canonical is not the public origin");
  if (!home.includes(`property="og:image" content="${publicSiteUrl}/desira-social.png"`)) errors.push("homepage share image is not the Desira card");
  if (!home.includes('rel="icon" type="image/png" href="/favicon.png"')) errors.push("homepage PNG favicon is missing");
  for (const path of ["/work/", "/contact/"]) {
    if (!sitemap.includes(`${publicSiteUrl}${path}`)) errors.push(`sitemap is missing ${path}`);
  }
} else if (!robots.includes("Disallow: /")) errors.push("preview robots.txt must disallow crawling");
if (errors.length) {
  console.error(errors.map((error) => `SEO check: ${error}`).join("\n"));
  process.exit(1);
}
console.log(`SEO check passed for ${htmlFiles.length} prerendered pages (${isPublicSite ? publicSiteUrl : "preview/noindex mode"}).`);
