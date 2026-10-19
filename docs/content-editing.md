# Editing Desira content

The migrated project, service, experience and site data lives in `src/data/*.json`. Import it through `src/data/index.js`. Page-specific copy is maintained separately; these files do not contain every sentence on the website.

## Files and routes

| File | What to edit | Route relationship |
| --- | --- | --- |
| `projects.json` | Portfolio titles, artwork, stories, sample labels and optional case studies | Each unique `slug` creates `/work/{slug}/` |
| `services.json` | Service titles, descriptions, deliverables and preview artwork | Each unique `slug` creates `/services/{slug}/` |
| `experiences.json` | Explore navigation and gallery cards | `href` points to an existing page or section anchor |
| `site.json` | Studio identity, contact links, logo assets and local URL | `siteUrl` supplies the base URL for metadata |

Keep JSON valid: double-quote keys and strings, avoid comments and trailing commas, and save as UTF-8. Preserve unique lowercase, hyphenated slugs. Update links whenever a slug changes. A project `service` matches a service's `title`; category values also connect related work and filters. Keep those values synchronized.

## Artwork

Place images in `public/work/` and refer to them with `/work/filename.webp` or `/work/filename.svg`. Never include `public` in the URL. Project `width` and `height` describe the original image dimensions. Write an `alt` that describes the actual artwork. Service `image` and `alt` supply preview artwork for service menus; changing a preview does not alter the underlying project. The brand-identity preview currently uses the explicitly fictional Mora concept artwork.

Experience cards have their own `image`, `alt` and `description`. Their `href` may include an anchor such as `#invitation-experience`; the destination component must provide that ID. Case-study `before`, `after` and `application` are separate artwork URLs; `applicationAlt` describes the application image.

## Real work and sample concepts

Keep `sample: true` on fictional projects. The existing application uses this flag for disclosure, exclusion from the real-work hero, `noindex` metadata, and exclusion from the generated sitemap. Omitting or setting the flag to `false` treats a project as real work. Existing real artwork is intentionally preserved without sample flags. Do not remove a sample label merely to make an example appear to be a client commission.

The optional `caseStudy` object holds the concept client, brief, challenge, direction, palette, decisions, deliverables and comparison images. Keep its descriptions consistent with the sample disclosure.

## Site configuration

`siteUrl` defaults to `http://localhost:5173` for local development. It is a configurable base URL, not a hosted deployment destination. `contact.instagram.url` and `contact.instagram.handle` hold the existing contact channel. `email` and `whatsapp` remain `null` until confirmed; do not invent contact details.

`assets.navigationLogo`, `assets.studioLogo` and `assets.logo` contain `src`, `alt`, `width` and `height`; `assets.favicon` contains `src` and `alt`. `brand.colors` records navy, gold and white, and `brand.fontFamily` records the current font. Components and CSS must consume these fields for an edit to affect their appearance; JSON values alone do not rewrite styles or the static HTML head.

After editing, run `npm run build` to validate JSON imports and regenerate page HTML, metadata and the sitemap. Review the affected page locally, including image loading, mobile layout and sample disclosures.
