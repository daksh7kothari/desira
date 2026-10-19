# Creative web project instructions

## Project and design

Read the existing package scripts, project brief, brand assets, tokens and relevant components before changing the interface. Preserve the project's framework unless a migration is requested or justified and approved. For Desira, preserve the established brand direction and clearly label fictional projects, testimonials and placeholder contact information.

Choose a clear visual idea tied to the client and audience. Use deliberate typography, spacing, imagery and hierarchy. Avoid repetitive template sections, unnecessary glass, generic gradients and decorative motion. Respect the brief over a skill's aesthetic preferences. Keep meaningful content and navigation in semantic HTML, including alongside canvas scenes.

## Skill selection

- New UI or visual redesign: use frontend-design as the primary design voice. Use web-design-engineer when its browser implementation workflow materially helps; avoid loading overlapping design guidance without a reason.
- General component polish: emil-design-eng. Physical spring, gesture or Apple-style behavior: apple-design where relevant.
- GSAP implementation: gsap-core; add gsap-react for React lifecycle, gsap-timeline for sequences, gsap-scrolltrigger for scroll-linked work, and gsap-performance for measured rendering problems. Load only the applicable skills.
- Three.js/R3F/Drei/GLSL: fetch targeted official documentation with Context7. Validate package compatibility and actual shader/runtime behavior. Do not force a framework or generic 3D template.
- Motion proposals or audits: use find-animation-opportunities or improve-animations within their read-only scope; implement only when the task authorizes implementation. Use review-animations for motion code review.
- Observed bugs: systematic-debugging before changing code. Browser verification: webapp-testing with available Playwright tools.
- Substantial changes: requesting-code-review; incoming feedback: receiving-code-review. Follow applicable delegation rules.
- Use explicit-only skills only when named by the user. Do not activate multiple competing art-direction skills automatically.

## Motion and 3D engineering

Prefer CSS for simple feedback and existing libraries for established interactions. Use GSAP for choreography/ScrollTrigger, Motion for appropriate React state/layout interactions, and Lenis only when justified. Do not animate the same property with competing engines or run duplicate frame loops.

Scope selectors, clean up timelines, ScrollTriggers, listeners and frame callbacks on unmount, and respect client/server boundaries. Keep visible content usable before animations initialize. Respect prefers-reduced-motion, keyboard navigation and touch; avoid hover-only functionality and scroll traps.

Lazy-load heavy 3D scenes. Include loading/error states and a meaningful static fallback for unavailable WebGL or constrained devices. Cap/adapt pixel ratio, pause offscreen work, use on-demand rendering where appropriate, and dispose owned GPU resources. Use a single coordinated render loop and invalidate on-demand scenes after imperative updates. Measure before adding post-processing or particles.

## Documentation, access and verification

Use Context7 for current library APIs and official sources when documentation is missing. Do not send secrets or proprietary source in documentation queries. Prefer existing connections over duplicate MCP servers. Use least-privilege access and do not expose tokens in commands, logs or tracked files.

Run the project's actual build/lint/typecheck scripts as applicable. Check the changed UI in a real browser at representative phone, tablet and desktop widths; inspect keyboard focus, touch behavior, reduced motion and console errors. Use Lighthouse and performance traces when performance changes or observed jank warrant them. Report measured results and unverified limits without promising a particular score or frame rate.

Load only relevant skill references. Batch independent reads and browser checks, reuse unchanged findings and avoid repeated full-repository analysis. Do not install runtime packages globally or add unused libraries.

Before installing software, changing global configuration, enabling a new remote service or changing credentials, present the concrete change and obtain approval, unless the current session has already authorized that scope.

<!-- codebase-memory-mcp:start -->
# Codebase Knowledge Graph (codebase-memory-mcp)

This project uses codebase-memory-mcp to maintain a knowledge graph of the codebase.
ALWAYS prefer MCP graph tools over grep/glob/file-search for code discovery.

## Priority Order
1. `search_graph` — find functions, classes, routes, variables by pattern
2. `trace_path` — trace who calls a function or what it calls
3. `get_code_snippet` — read specific function/class source code
4. `query_graph` — run Cypher queries for complex patterns
5. `get_architecture` — high-level project summary

Index the repository first if it is not indexed. Re-index or use targeted source reads when results are stale or insufficient, and report the limitation.

## When to fall back to grep/glob
- Searching for string literals, error messages, config values
- Searching non-code files (Dockerfiles, shell scripts, configs)
- When MCP tools return insufficient results
<!-- codebase-memory-mcp:end -->
