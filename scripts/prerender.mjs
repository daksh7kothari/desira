import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { projects, services, siteUrl } from "../src/data/index.js";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const { default: getPage } = await server.ssrLoadModule(
    "/src/lib/getPage.js",
  );
  const { default: metadata } = await import("../src/data/metadata.json", {
    with: { type: "json" },
  });
  const { default: notes } = await import("../src/data/notes.json", {
    with: { type: "json" },
  });
  const template = await readFile("dist/index.html", "utf8");
  const allPaths = [
    ...Object.keys(metadata).map((path) => (path === "/" ? "/" : `${path}/`)),
    ...projects.map((item) => `/work/${item.slug}/`),
    ...services.map((item) => `/services/${item.slug}/`),
    ...notes.map((item) => `/notes/${item.slug}/`),
  ];
  const paths = allPaths.filter((path) => !getPage(path).noindex);
  for (const path of [...allPaths, "/404/"]) {
    const page = getPage(path);
    const markup = renderToString(createElement(App, { pathname: path }));
    const metadata = `<link rel="canonical" href="${siteUrl}${path}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Desira" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${siteUrl}${path}" />
    <meta property="og:image" content="${siteUrl}${page.image || "/desira-logo.png"}" />
    <meta property="og:image:alt" content="${escape(page.project?.alt || "Graphic design from the Desira studio")}" />
    <meta name="twitter:card" content="summary_large_image" />${page.noindex ? '<meta name="robots" content="noindex" />' : ""}`;
    const html = template
      .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace(
        /<meta name="description"[^>]*>/,
        `<meta name="description" content="${escape(page.description)}" />`,
      )
      .replace("</head>", `    ${metadata}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    const target =
      path === "/404/"
        ? "dist/404.html"
        : resolve("dist", `.${path}`, "index.html");
    await mkdir(resolve(target, ".."), { recursive: true });
    await writeFile(target, html);
  }
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${siteUrl}${path}</loc></url>`).join("")}</urlset>\n`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
  console.log(
    `Prerendered ${allPaths.length} pages, a 404 page, sitemap.xml and robots.txt.`,
  );
} finally {
  await server.close();
}
