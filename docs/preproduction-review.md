# Desira preproduction review

The private review site uses Desira's navy, gold and white palette. Explore is available directly in the desktop and mobile navbar, and all four experiences are linked from the full-screen navigation.

## Implemented

- React Bits carousel in the home hero, Chroma Grid in selected work, and Flowing Menu in the hamburger navigation. Adaptations and upstream license are recorded in THIRD_PARTY_NOTICES.md.
- Subtle scroll perspective on the home showcase, experience gallery and invitation; layered 3D paper in the project story; a scroll entrance and manual viewing controls on the design desk.
- Reduced-motion alternatives, keyboard access, clear focus states and natural mobile scrolling.
- Footer hover contrast, selectable enquiry brief when clipboard permission is denied, corrected page titles, and page-specific social image descriptions.
- Removed fictional testimonials, draft editorial instructions and pending-contact notices from visitor pages. Two sample projects remain explicitly labelled and excluded from indexing and the sitemap.

## Verification

- Production build and prerendering passed.
- All 17 routes, including sample projects and the 404 page, checked in Chromium at desktop and mobile widths: one main heading, no horizontal overflow, broken images or JavaScript errors.
- Navigation checked at 320, 375, 768, 1024 and 1440 pixels, including Escape, focus restoration, outside click and direct destinations.
- Checked carousel keyboard controls and touch-emulated swipe, portfolio filtering, invitation open/close, desk controls, scroll transforms, live reduced-motion changes and clipboard-denied fallback.
- Local route and anchor links, canonical metadata, descriptions and sample-project noindex checked.
- Physical iOS/Android devices and Safari/Firefox have not been tested.

## Before public launch

- Sejal to review and approve copy, project names and artwork.
- Replace the two labelled sample projects with approved Desira projects, or remove them.
- Add the confirmed business email and/or WhatsApp number. Current enquiries prepare a brief to send manually through Instagram; there is no form submission backend.
- Confirm the final domain and audience. The review site remains owner-private. Update canonical URLs and sitemap if the domain changes.
- Review on an actual phone before sharing publicly.
