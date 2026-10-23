import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { projects, services, site, instagram } from "../src/data/index.js";
import { isPublicSite, joinUrl, publicSiteUrl } from "./seo-config.mjs";

const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
const escape = (value = "") => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const jsonLd = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
const imagePath = (page) => {
  const candidate = page.image || page.project?.image || page.service?.image || page.note?.image;
  return /\.(png|jpe?g|webp|avif)$/i.test(candidate || "") ? candidate : "/desira-social.png";
};
const structuredData = (page, path) => {
  if (!isPublicSite) return "";
  const pageUrl = joinUrl(publicSiteUrl, path);
  const graph = [
    { "@type": "Organization", "@id": `${publicSiteUrl}/#organization`, name: site.name, url: publicSiteUrl, logo: joinUrl(publicSiteUrl, site.assets.logo.src), description: site.description, sameAs: [instagram] },
    { "@type": "WebSite", "@id": `${publicSiteUrl}/#website`, url: publicSiteUrl, name: site.name, description: site.description, publisher: { "@id": `${publicSiteUrl}/#organization` } },
    { "@type": page.service ? "Service" : "WebPage", "@id": `${pageUrl}#page`, url: pageUrl, name: page.title, description: page.description, isPartOf: { "@id": `${publicSiteUrl}/#website` }, about: { "@id": `${publicSiteUrl}/#organization` }, ...(page.service ? { serviceType: page.service.title, provider: { "@id": `${publicSiteUrl}/#organization` } } : {}), ...(page.image ? { image: joinUrl(publicSiteUrl, imagePath(page)) } : {}) },
  ];
  return `<script type="application/ld+json">${jsonLd({ "@context": "https://schema.org", "@graph": graph })}</script>`;
};

try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const { default: getPage } = await server.ssrLoadModule("/src/lib/getPage.js");
  const { default: routeMetadata } = await import("../src/data/metadata.json", { with: { type: "json" } });
  const { default: notes } = await import("../src/data/notes.json", { with: { type: "json" } });
  const template = await readFile("dist/index.html", "utf8");
  const allPaths = [
    ...Object.keys(routeMetadata).map((path) => (path === "/" ? "/" : `${path}/`)),
    ...projects.map((item) => `/work/${item.slug}/`),
    ...services.map((item) => `/services/${item.slug}/`),
    ...notes.map((item) => `/notes/${item.slug}/`),
  ];
  const indexablePaths = isPublicSite ? allPaths.filter((path) => !getPage(path).noindex && !getPage(path).notFound) : [];
  for (const path of [...allPaths, "/404/"]) {
    const page = getPage(path);
    const isNotFound = Boolean(page.notFound || path === "/404/");
    const noindex = !isPublicSite || page.noindex || isNotFound;
    const pageUrl = joinUrl(publicSiteUrl, path);
    const imageUrl = isPublicSite ? joinUrl(publicSiteUrl, imagePath(page)) : "";
    const metadata = [
      isPublicSite && !noindex ? `<link rel="canonical" href="${escape(pageUrl)}" />` : "",
      `<meta name="robots" content="${noindex ? "noindex,follow" : "index,follow"}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="Desira" />`,
      `<meta property="og:title" content="${escape(page.title)}" />`,
      `<meta property="og:description" content="${escape(page.description)}" />`,
      isPublicSite ? `<meta property="og:url" content="${escape(pageUrl)}" />` : "",
      isPublicSite ? `<meta property="og:image" content="${escape(imageUrl)}" />` : "",
      isPublicSite ? `<meta property="og:image:alt" content="${escape(page.project?.alt || page.service?.alt || (imagePath(page) === "/desira-social.png" ? "Desira logo on a navy background" : "Graphic design from the Desira studio"))}" />` : "",
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escape(page.title)}" />`,
      `<meta name="twitter:description" content="${escape(page.description)}" />`,
      isPublicSite ? `<meta name="twitter:image" content="${escape(imageUrl)}" />` : "",
      structuredData(page, path),
    ].filter(Boolean).join("\n    ");
    const markup = renderToString(createElement(App, { pathname: path }));
    const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`).replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(page.description)}" />`).replace("</head>", `    ${metadata}\n  </head>`).replace("<div id=\"root\"></div>", `<div id="root">${markup}</div>`);
    const target = isNotFound ? "dist/404.html" : resolve("dist", `.${path}`, "index.html");
    await mkdir(resolve(target, ".."), { recursive: true });
    await writeFile(target, html);
  }
  const sitemap = isPublicSite ? indexablePaths.map((path) => `<url><loc>${escape(joinUrl(publicSiteUrl, path))}</loc></url>`).join("") : "";
  await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>\n`);
  await writeFile("dist/robots.txt", isPublicSite ? `User-agent: *\nAllow: /\nSitemap: ${publicSiteUrl}/sitemap.xml\n` : "User-agent: *\nDisallow: /\n");
  console.log(`Prerendered ${allPaths.length} pages, a 404 page, sitemap.xml and robots.txt (${isPublicSite ? publicSiteUrl : "preview/noindex mode"}).`);
} finally {
  await server.close();
}
