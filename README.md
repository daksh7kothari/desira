# Desira

A portfolio for Sejal’s graphic design studio, built with React 19 and Vite. Uses the Desira navy, gold and white brand palette, locally hosted DM Sans, original Desira logos, and real portfolio artwork sourced from the supplied Instagram/Wix pages.

## Development

Run `npm install` and `npm run dev`.

## Production

Run `npm run build` and `npm run preview`.

The build prerenders the homepage, four service pages, five project pages, two experience pages and a 404 page. It also creates a sitemap and robots.txt. Every page includes a unique title, description, canonical URL and social sharing metadata. No backend is required.

## Edit content

- `src/content.js`: projects, service descriptions, image references and final website URL.
- `src/App.jsx`: page structure, navigation, portfolio filters and enquiry dialog.
- `src/index.css`: brand tokens and base styles.
- `src/App.css`: layouts, interactions and responsive styles.
- `public/work/`: local portfolio images.
- `scripts/prerender.mjs`: HTML generation and search metadata.

The enquiry dialog prepares and copies a brief, then links to Instagram. It does not send messages, store submissions or collect personal data on a server. Business email/WhatsApp details are pending. Set the final domain in `src/content.js` and rebuild before the final public launch.

See `design-notes.md` for design decisions, asset provenance and content review notes. Agent-Reach is a separate research tool cloned into the ignored `tools/Agent-Reach` directory; it is not a website dependency.

## Design experiences

The Explore navbar disclosure links to all experiences:

- Home: pointer-driven artwork tilt, disabled for touch-only and reduced-motion environments.
- Wedding invitations: an interactive opening-cover presentation of the existing coastal artwork.
- Coastal celebration project: a scroll-linked story about the final artwork, with a static mobile/reduced-motion layout.
- `/experiences/design-desk/`: original artwork arranged in a CSS 3D desk, with labelled angle controls and project links.
- `/experiences/`: overview gallery linking to the above pages and anchors.

The invitation cover and desk are interactive presentations, not claims about physical deliverables. No original sketches or process assets have been fabricated. Portfolio filtering announces its result count through a persistent status region.
