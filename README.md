# Desira

Local React and Vite portfolio for Sejal's graphic design studio. The site uses Desira's navy and gold palette, local artwork, and labelled sample concepts.

## Run locally

```sh
npm install
npm run dev
```

Open the local address printed by Vite. If port 5173 is already in use, Vite selects another port. `npm run build` checks the app and prerenders its pages into `dist/`; `npm run preview` serves that build. Run `npm run lint` for code checks.

## Site structure

- `src/pages/` composes the home, work, studio, contact, service, project, note, and experience pages.
- `src/components/` holds reusable layout, form, motion, portfolio, and React Bits components.
- `src/data/*.json` holds editable copy, projects, services, navigation, and metadata. See [the content guide](docs/content-editing.md).
- `src/styles/` holds brand tokens, page layouts, responsive rules, and interactions.
- `public/work/` contains local artwork and clearly labelled sample assets.
- `scripts/prerender.mjs` generates route HTML, metadata, `sitemap.xml`, and `robots.txt`.

The homepage has four sections: hero, selected work, services, and studio. Extra stories, sketches, and notes live on their own pages. The opening preloader appears once per browser session and is skipped when reduced motion is preferred.

The enquiry form prepares a brief and opens Instagram. It does not send form data to a server. Sejal's business email and WhatsApp remain unset until provided.

Before public launch, replace sample concepts and draft notes with approved work, add confirmed contact details, and change `siteUrl` in `src/data/site.json` from `http://localhost:5173` to the final domain. Rebuild to refresh canonical URLs and the sitemap.
