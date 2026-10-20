# Desira Brand Details

## Brand essence

Desira is a destination for your desired designs. The identity combines an expressive artistic touch with a bold, versatile visual system that can adapt across platforms.

## Logo system

The logo family includes:

- **Primary logo:** the main expression of the Desira identity.
- **Secondary logo:** a versatile alternate for layouts where the primary logo does not fit.
- **Submark:** a compact identity for small or constrained placements.
- **Logo mark:** the artistic symbol that carries the brand's expressive character.

Provided assets:

- [Primary logo](./public/desira-logo.png)
- [Navigation logo](./public/desira-nav.avif)
- [Gold-on-navy studio logo](./public/desira-studio-logo.png), sourced from Desira’s existing Wix site.

Always preserve the logo's proportions and maintain clear space around it. Do not recolor, stretch, rotate, or recreate the logo with CSS.

## Official color palette

| Token | Hex | Usage |
| --- | --- | --- |
| Vibrant Gold | `#FFBD3D` | Accent, highlights, hover states, and calls to action |
| Deep Navy | `#061C49` | Primary brand color, navigation surfaces, and strong backgrounds |
| Crisp White | `#FFFFFF` | Contrast text, light surfaces, and reversed logo applications |
| Classic Black | `#000000` | Primary dark text and high-contrast applications |

Use the official colors as the source of truth. Tints and opacity variations may be used for supporting UI states, but new hues should not be introduced without approval.

## Voice and expression

The brand should feel artistic, confident, expressive, and purposeful. Typography and layouts should support the logo rather than compete with it.

## Typography

Rainesta is the primary brand typeface. Use its Regular, Medium, SemiBold, and Bold weights to create an expressive editorial hierarchy. Keep supporting copy concise and use generous spacing around display typography.

Font source: [Rainesta font archive](./public/font/rainesta.zip)

## Current website direction

The user requested the brand palette for the website: navy #061C49, gold #FFBD3D and white. Navy leads the hero and studio sections, white supports the portfolio and services, and gold is used for actions and the footer. Bold DM Sans typography is retained from the approved layout. The favicon uses the original standalone Desira mark sourced from its supplied Instagram page; the mark is preserved without redrawing.

## Scroll storytelling

Extension of the existing studio site. Audience: people commissioning identities,
invitations, and print design. The narrative follows a first thought into a
complete design, then introduces the studio and invites the visitor's own story.

- Identity: existing `/desira-logo.png`, `/desira-studio-logo.png`, and `/favicon.svg`.
- Site colours: navy `#061c49`, gold `#ffbd3d`, white `#ffffff`; retain existing paper surfaces.
- Typography: locally hosted DM Sans, using existing large, tightly tracked headings.
- Artwork: `/work/mora-draft.svg`, `/work/mora-coffee.svg`, and
  `/work/mora-applications.svg`; these are existing fictional concept assets.
  Their green palette belongs to the showcased artwork, not a new site theme.
- Composition: one large sticky artwork beside three readable process chapters.
  Mobile, short viewports, reduced motion, and no-JavaScript views show artwork
  inline with each chapter.
- Motion: direct, reversible scroll progress for the explanatory artwork.
  Existing entrances retain `cubic-bezier(0.16, 1, 0.3, 1)`. Functional controls
  remain available without waiting for motion.
- Dials: variance 5, motion 8, density 4, asset dependence 8, brand fidelity 10.
  Motion is concentrated in the process story; the existing visual system,
  supplied assets, routes, forms, and portfolio labels remain the foundation.

The current pass covers the homepage. Existing project-specific experiences
remain available on their respective routes.
