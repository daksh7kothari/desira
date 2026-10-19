# Desira

A portfolio for Sejal’s graphic design studio, built with React 19 and Vite. Uses the Desira navy, gold and white brand palette, locally hosted DM Sans, original Desira logos, and real portfolio artwork sourced from the supplied Instagram/Wix pages.

## Development

Run `npm install` and `npm run dev`.

## Production

Run `npm run build` and `npm run preview`.

The build prerenders the homepage, four service pages, five project pages and a 404 page. It also creates a sitemap and robots.txt. Every page includes a unique title, description, canonical URL and social sharing metadata. No backend is required.

## Edit content

- `src/content.js`: projects, service descriptions, image references and final website URL.
- `src/App.jsx`: page structure, navigation, portfolio filters and enquiry dialog.
- `src/index.css`: brand tokens and base styles.
- `src/App.css`: layouts, interactions and responsive styles.
- `public/work/`: local portfolio images.
- `scripts/prerender.mjs`: HTML generation and search metadata.

The enquiry dialog prepares and copies a brief, then links to Instagram. It does not send messages, store submissions or collect personal data on a server. Business email/WhatsApp details are pending. Set the final domain in `src/content.js` and rebuild before the final public launch.

See `design-notes.md` for design decisions, asset provenance and content review notes. Agent-Reach is a separate research tool cloned into the ignored `tools/Agent-Reach` directory; it is not a website dependency.
