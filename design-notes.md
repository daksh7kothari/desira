# Desira website direction

Overhaul of the starter website, retaining Desira’s real logo, colour palette, font assets, React/Vite setup and section anchors. The old generic product features, unverified testimonials and pricing placeholders are replaced with the studio’s actual work and services.

## Design read

An editorial portfolio for people commissioning brand graphics and personal celebrations. Oversized, expressive typography; a gallery canvas; a physical arrangement of printed work. Visual variance 7, motion 3, density 3, asset dependence 9, brand fidelity 10. The reference supplies the spacious hierarchy and focused navigation; Desira’s work supplies the personality.

## System

- Navy #061C49, gold #FFBD3D, white #FFFFFF, black #000000. Supporting surfaces use opacity variations of the brand palette.
- Rainesta for display and Helvetica Neue for clear supporting text. Locally hosted display fonts.
- White canvas, navy navigation and footer; gold reserved for contact actions.
- Spacing based on 8px with 22px mobile and 40px tablet gutters; desktop content capped at 1240px.
- Small 4–10px corner radii; shadows reserved for the physical artwork and the enquiry dialog.
- One staggered entrance for the artwork shelf; direct hover feedback. Reduced motion respected.

## Artwork provenance

Local WebP files in `public/work/` were downloaded from Desira’s supplied Instagram account and Wix website. No stock portfolio work or invented client results are used. Instagram captions informed the project descriptions; descriptions are editorial drafts for Sejal’s review.

- Coastal wedding identity: Ananya & Chirag, @desira.ft.
- Illustrated save-the-date: Yash & Sakshi, Instagram post DRSMny6k6QS.
- Carnival event graphics: Instagram reel DUQRsSWDGQ_.
- Traditional invitation: Instagram post DRCjh4vE_VE.
- Brochure: artwork from the existing Wix homepage.

## Contact and launch

Business email/WhatsApp details are pending from the user. The current enquiry dialog copies a project brief locally and links to Instagram; it does not submit or send messages. Confirm service scope and editorial copy with Sejal before a public launch. Set the final domain in `src/content.js` and rebuild to update canonical URLs and sitemap entries.
