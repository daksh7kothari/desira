# Editing Desira content

The website reads content from `src/data/*.json`. Edit these files when real project details arrive; page components mostly control layout and interaction.

| File | Content |
| --- | --- |
| `site.json` | Studio name, contact links, logos, brand values, and site URL |
| `home.json` | Opening preloader, hero, selected work, services, studio, process, FAQ, and footer copy |
| `home-additions.json` | Featured story, sketchbook, and design-note collection copy |
| `projects.json` | Portfolio artwork, categories, stories, case studies, and sample disclosures |
| `services.json` | Service pages, deliverables, and Flowing Menu preview images |
| `navigation.json` | Full-screen menu labels and artwork |
| `experiences.json` | Explore cards and destinations |
| `experience-content.json` | Scroll story chapters and design desk project selections |
| `studio.json` | Studio page copy |
| `contact.json` | Contact page and enquiry form copy |
| `notes.json` | Draft design-note articles |
| `metadata.json` | Base route titles, descriptions, and indexing choices |

Keep JSON valid: use double quotes and avoid comments or trailing commas. Save files as UTF-8. Project, service, and note `slug` values must be unique, lowercase, and hyphenated. Changing a slug changes its URL; update any matching links and references.

Place artwork in `public/work/` and refer to it as `/work/filename.webp` or `/work/filename.svg`. Do not put `/public` in a URL. Give each image an `alt` description of the artwork. The service `image` field supplies its Flowing Menu preview. The hero and selected-work lists in `home.json` use project slugs to choose visible projects.

Keep `sample: true` on fictional projects and notes. The site labels sample projects and excludes them from the generated sitemap. Some samples appear in the homepage carousel and work gallery so the layout can be reviewed; replace them with approved projects before launch. Draft notes and the sketchbook remain `noindex` until their content is approved.

The enquiry form currently links to Desira's Instagram account. Leave `site.json` contact `email` and `whatsapp` as `null` until Sejal provides confirmed details. Set `siteUrl` to the final domain before publishing; it currently uses `http://localhost:5173` for local review.

After any content edit, run `npm run build`. Review the affected route for image loading, mobile layout, sample labels, and page title.
