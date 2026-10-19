# Creative web Codex setup — proposal

Reviewed 19 October 2026. Status: awaiting approval; no installations, global configuration edits, new account connections, or credential changes have been made for this audit. Website work is paused. These documents are review artifacts, not active agent configuration.

## Recommended decision

Keep the existing design, debugging, review, and browser tools. Add five focused, instruction-only GSAP skills. Fix the invalid Codex CLI configuration entry. Activate the accompanying project AGENTS draft after approval. Keep GitHub, Figma, Spline, and Chrome DevTools additions optional until their workflows are needed.

For Three.js/R3F/GLSL, use targeted official documentation through the existing Context7 connection. The requested community 3D skill is too prescriptive to activate globally in its current form. A dedicated 3D skill is not a prerequisite for writing good 3D code.

## Existing environment

| Item | Observed state |
| --- | --- |
| Workspace | `C:\Users\daksh\Desktop\desira` |
| Node / npm | 24.13.1 / 11.8.0 |
| Python | 3.11; Python Playwright module is present |
| Browsers | Chrome and Edge executables are present |
| Codex CLI | 0.117.0 |
| VS Code extension | `openai.chatgpt@26.1007.21434` is installed |
| User MCP configuration | `C:\Users\daksh\.codex\config.toml` |
| Configured local servers | codebase-memory-mcp, Playwright, Context7; enabled |
| Project configuration | No project AGENTS.md, `.codex/config.toml`, or `.vscode/mcp.json` found during the inventory |
| Current chat integrations | GitHub and Figma tools are exposed here; this does not establish their availability or authentication in a separate VS Code session |

Existing user skills in `.codex/skills`: frontend-design, systematic-debugging, webapp-testing, requesting-code-review, receiving-code-review, plus bundled system skills.

Existing skills in `.agents/skills`: animation-vocabulary, apple-design, emil-design-eng, find-animation-opportunities, improve-animations, review-animations, web-design-engineer, pick-ui-library, prototype, watch.

Figma and other plugin skills are also exposed in this session. Do not copy those packages into another skill directory merely because they appear in the selector.

**Confirmed configuration conflict:** an ordinary `codex mcp list` fails before startup because line 3 sets `service_tier = "default"`. This installed CLI accepts `fast` or `flex`, not `default`. Proposed fix: back up the file and remove only that unsupported assignment, leaving the service tier unspecified. Do not silently select a different billing/performance preference. A one-off command override allowed the previous inventory; it did not repair the file.

## Ranked skill selection

Ranks describe value for this workflow; existing skills need no installation.

| Rank | Skill | Contribution and decision |
| --- | --- | --- |
| 1 | Existing frontend-design | Primary creative direction, typography, layout and brand discipline. Retain as the default design voice. [Upstream](https://github.com/anthropics/skills/tree/main/skills/frontend-design). |
| 2 | Existing webapp-testing | Real browser inspection, interaction checks and screenshots. Retain; Python module is present, but a fresh browser launch remains a verification step. [Upstream](https://github.com/anthropics/skills/tree/main/skills/webapp-testing). |
| 3 | gsap-core + gsap-react | Add: correct tween APIs, scoped React setup, cleanup and client lifecycle. [Core source](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-core/SKILL.md), [React source](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-react/SKILL.md). |
| 4 | gsap-timeline + gsap-scrolltrigger | Add: choreography, labels, pinning, scrub, refresh and cleanup. [Timeline source](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-timeline/SKILL.md), [ScrollTrigger source](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-scrolltrigger/SKILL.md). |
| 5 | gsap-performance | Add: rendering cost, batching, frequently updated properties and cleanup. [Source](https://github.com/greensock/gsap-skills/blob/aed9cfd3277740755f6bfc1155c7aa645403b760/skills/gsap-performance/SKILL.md). |
| 6 | Existing emil-design-eng / apple-design | Use the one that fits the interaction: general polish or physical/spring/gesture behavior. Avoid loading both for every change. |
| 7 | Existing systematic-debugging and review skills | Diagnose observed failures; review substantial work and respond critically to feedback. Retain. [Debugging source](https://github.com/obra/superpowers/tree/main/skills/systematic-debugging). |
| 8 | Existing motion audit skills | `find-animation-opportunities` proposes opportunities; `improve-animations` plans an audit; `review-animations` reviews motion code. Respect their read-only boundaries. |

The GSAP repository explicitly supports Codex and uses the Agent Skills format. Its selected directories contain SKILL.md instructions rather than executable helpers. The reviewed commit is MIT licensed; the GSAP runtime has its own terms. Installing these skills does not install GSAP into a website. [Repository and installation documentation](https://github.com/greensock/gsap-skills).

Even official skills need judgment: the reviewed ScrollTrigger horizontal example contains `Max.max` and mixes a pixel calculation with `xPercent`. Treat examples as guidance, check current docs, and verify actual code. Do not copy that example unchanged. The guidance favoring GSAP also must not override a project's existing choice of Motion or an appropriate CSS transition.

## Other requested sources: evaluated, not selected for the default setup

Repository metadata, actual candidate SKILL.md files, installation documentation, and selected supporting references/scripts were inspected. This is a compatibility and instruction review, not an exhaustive security audit of every file or a runtime certification. No third-party candidate scripts were executed.

| Source | Assessment | Decision |
| --- | --- | --- |
| [skills.sh](https://www.skills.sh/) | Useful discovery directory; popularity and listings do not establish correctness or safety. Verify the upstream repository and exact skill folder. | Discovery only; do not bulk-install collections. |
| [OpenAI skills](https://github.com/openai/skills) — [Playwright](https://github.com/openai/skills/tree/main/skills/.curated/playwright) | Official Codex CLI browser workflow. Its wrapper uses Bash and npx; Windows may require Git Bash. Overlaps existing Playwright MCP + webapp-testing. | Keep existing tools; no duplicate browser skill. |
| [Anthropic skills](https://github.com/anthropics/skills) — frontend-design, webapp-testing | Portable SKILL.md instructions; the latter uses Python Playwright and helper scripts. Both already installed. | Retain; do not reinstall. |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Codex-aware installer, useful searchable palettes/type/UX/stack guidance. Python 3, local CSV/search scripts; installer uses Node. Considerable overlap with existing design guidance; broad automatic trigger. Raw Claude-oriented SKILL commands use `CLAUDE_PLUGIN_ROOT`, so copying that file alone is inappropriate. | Optional for systematic design exploration; use its Codex generation path, not a bare Claude folder copy. Prefer manual invocation if adopted. |
| [Impeccable](https://github.com/pbakaus/impeccable) | Good critique, polish and accessibility workflows; Codex-aware. Current v4.7.0 setup runs a native engine, may download a release binary, and installer can add project hooks. Windows launcher uses SHA-256 sidecars but its comments say testing is dry parsing/string-level, not a real Windows machine. Overlaps design and motion audits; some absolute aesthetic rules are too broad. | Defer. Requires a separate executable/hook review and Windows smoke test. Do not treat it as Markdown-only. |
| [3D Website Architect](https://github.com/deveshpunjabi/3d-website-skill) | Portable instructions and substantial R3F, shader, loading and performance references. However, its broad trigger imposes full Next.js/TypeScript output, style recipes and mandatory framework-specific commands even for other stacks. `next lint` and other version-dependent commands need current verification. No runtime required merely to read the skill. | Do not enable globally. Reconsider for an explicitly chosen 3D project; use official R3F/Three docs now. |
| [Taste skill](https://github.com/Leonxlnx/taste-skill) | Strong art-direction ideas and browser iteration; portable Agent Skills format. Current `skills/taste-skill` is named `design-taste-frontend`. Node 22+ and installed Chrome/Edge/Chromium; asset helper makes network requests and writes fetched assets/credits. Rigid house rules and broad triggers overlap the default design voice. | Optional alternate art director, explicitly invoked. Do not stack it automatically with frontend-design and Impeccable. Verify rights for each downloaded asset. |

Reviewed revision ledger:

| Repository | Commit |
| --- | --- |
| openai/skills | `49f948faa9258a0c61caceaf225e179651397431` |
| anthropics/skills | `dbd4588f9e1033efb41dad4bef2f7947c8993d44` |
| greensock/gsap-skills | `aed9cfd3277740755f6bfc1155c7aa645403b760` |
| nextlevelbuilder/ui-ux-pro-max-skill | `56ea9cf174ed86786187daa9de0e6247cb0747e4` |
| pbakaus/impeccable | `aeeb3d8c30b5f95aeeb3e893b0f1a308af8fdb8f` |
| deveshpunjabi/3d-website-skill | `98f4cd4bfdf4cbb87c0f40d59d681158c490e9a5` |
| Leonxlnx/taste-skill | `b9ca2fd8047f4c72d7da90ebc1c1203e57c72cd2` |

The community repositories above were not archived at the time checked. Recent commits establish activity, not quality or a maintenance guarantee. Their supporting material is cached outside the website in `C:\Users\daksh\.agent-reach\codex-setup-audit`.

## Ranked MCP selection

| Rank | Server | Compatibility, permissions and contribution | Proposal |
| --- | --- | --- | --- |
| 1 | [Microsoft Playwright](https://github.com/microsoft/playwright-mcp) | Official local stdio server; Node >=18. Automates browsers for inspection and interaction. No service API key required. Browser actions can access pages and sessions, so use an isolated testing profile. | Keep existing. Fresh browser smoke test after approval. |
| 2 | [Upstash Context7](https://github.com/upstash/context7) | Maintained local stdio client for current documentation; installed Node satisfies current package requirement >=20.18.1. Queries go to the documentation service. API key may improve quota; do not add one without need. | Keep. Resolve and query calls succeeded during this audit. |
| 3 | [GitHub official](https://github.com/github/github-mcp-server) | Streamable HTTP; official Codex guide supplies PAT environment-variable setup. Use selected repositories and read permissions first; read-only endpoint further limits tool exposure. No Docker needed for hosted server. | Use current connector here. Optional separate VS Code setup; no assumed credential transfer. |
| 4 | [Figma official](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) | Official Codex setup, remote HTTP and browser account authorization. Permissions/rate limits depend on account and file access. Can support design context and write workflows; authorize only the intended files/actions. | Current plugin is exposed here. Add another direct connection only if VS Code lacks it. |
| 5 | [Chrome DevTools official](https://github.com/ChromeDevTools/chrome-devtools-mcp) | Adds performance tracing beyond routine Playwright checks. Requires supported Node and Chrome; both are present. Disable its default usage statistics; inspect traces for private content before sharing. | Optional when profiling a measured rendering problem; avoid two default browser servers. |
| 6 | [Spline official](https://docs.spline.design/generate/spline-mcp-server) | Legitimate MCP bundled in Spline Desktop for Windows/macOS. Desktop must run; no separate npm MCP package. Local bridge, no MCP token to manage; AI generation can use cloud services/account credits. App can register connections in multiple clients automatically. | Optional for visual 3D authoring. Review per-client settings and generated paths first; verify this Codex VS Code host separately. |

Retain codebase-memory-mcp for code discovery. No additional Three.js/GSAP-specific MCP is selected: the reviewed stack already supplies source editing, current docs, browser execution and optional profiling. This is a selection decision, not a claim that no other servers exist. Supabase is unnecessary until a project needs a database/backend.

Codex CLI and the IDE extension share Codex MCP configuration on the same host. VS Code's own `.vscode/mcp.json` is a separate host configuration; adding a server there alone does not establish a Codex connection. [OpenAI MCP documentation](https://developers.openai.com/codex/mcp).

## Exact proposed changes and commands — not executed

### A. Recommended default

1. Back up `C:\Users\daksh\.codex\config.toml` with a timestamped sibling copy, remove only the unsupported top-level `service_tier = "default"`, and validate with `codex mcp list`. Preserve every existing server and tool permission.
2. Install the five selected skills into the current documented user skill location, `C:\Users\daksh\.agents\skills`. The existing installer refuses destination collisions; check both user skill roots for duplicate names before proceeding.

```powershell
$skillInstaller = 'C:\Users\daksh\.codex\skills\.system\skill-installer\scripts\install-skill-from-github.py'
python $skillInstaller --repo greensock/gsap-skills --ref aed9cfd3277740755f6bfc1155c7aa645403b760 --path skills/gsap-core skills/gsap-react skills/gsap-timeline skills/gsap-scrolltrigger skills/gsap-performance --dest 'C:\Users\daksh\.agents\skills'
```

3. Activate the reviewed project instructions. If an AGENTS.md has appeared in the meantime, merge rather than overwrite.

```powershell
Copy-Item -LiteralPath '.\docs\AGENTS.creative-web.proposed.md' -Destination '.\AGENTS.md'
codex mcp list
```

This does not install runtime libraries or change the website's framework. Codex currently documents automatic local skill discovery; restart the extension if new skills do not appear. [Discovery locations and explicit-only invocation](https://developers.openai.com/codex/skills).

### B. Optional reproducible versions for existing MCP launchers

Existing launchers use `@latest`. For reproducibility, a separately approved config edit can pin the package arguments below, preserving all other fields:

```toml
[mcp_servers.playwright]
command = "npx.cmd"
args = ["-y", "@playwright/mcp@0.0.83"]
startup_timeout_sec = 60

[mcp_servers.context7]
command = "npx.cmd"
args = ["-y", "@upstash/context7-mcp@4.4.4"]
startup_timeout_sec = 60
```

These versions and their Node engine constraints were checked against npm metadata during the audit; they have not been launch-tested here. Pinning is optional and is not part of the default approval request. Reassess versions on a later installation date.

### C. Optional remote/design/performance integrations

Run only if that integration is explicitly selected and absent in the target host.

```powershell
# GitHub: token must already be provided securely to the VS Code/Codex process.
# Do not paste a token into this command, a tracked file, or chat.
codex mcp add github --url https://api.githubcopilot.com/mcp/readonly --bearer-token-env-var GITHUB_PAT_TOKEN

# Figma: complete the provider's browser authorization yourself when prompted.
codex mcp add figma --url https://mcp.figma.com/mcp
codex mcp login figma

# Performance profiling: optional local process, usage statistics disabled.
codex mcp add chrome-devtools -- npx.cmd -y chrome-devtools-mcp@1.11.0 --no-usage-statistics
```

For GitHub, prefer a fine-grained expiring PAT restricted to selected repositories and the read permissions needed for the chosen tools. Do not adopt broad classic `repo`/`workflow` scopes simply because a sample lists them. Enabling write tools later is a deliberate scope expansion. [Official Codex installation guide](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-codex.md), [read-only hosted endpoints](https://github.com/github/github-mcp-server/blob/main/docs/remote-server.md).

Spline has no honest machine-independent install command for this workflow. Install the official desktop application only after separate approval, inspect Settings → MCP, and use its generated entry with the actual local executable/script paths. Do not invent an npm package or hardcode another platform's path. Its automatic client registration can modify more than one application's configuration, which is another reason to keep it optional.

### D. Optional alternate design skills

Taste can be installed to a separate directory with explicit-only invocation metadata after its scripts and asset access are accepted:

```powershell
python $skillInstaller --repo Leonxlnx/taste-skill --ref b9ca2fd8047f4c72d7da90ebc1c1203e57c72cd2 --path skills/taste-skill --dest 'C:\Users\daksh\.agents\skills'
```

Then add an `agents/openai.yaml` inside that installed skill with `policy.allow_implicit_invocation: false`; this is a proposed local metadata addition, not part of the upstream snapshot. Avoid name collisions using its declared name `design-taste-frontend`.

UI UX Pro Max documents `uipro init --ai codex`. If selected, use a pinned one-off CLI from the intended project, inspect the generated files and set manual invocation rather than adding a global CLI:

```powershell
npx.cmd --yes --package ui-ux-pro-max-cli@2.15.0 uipro init --ai codex
```

This generator has not been executed or certified by the audit; it is not in the recommended installation batch. Impeccable and 3D Website Architect are deferred, so no install command for them is authorized or proposed now.

## Per-project technology decisions

| Need | Choice |
| --- | --- |
| Existing Desira site | Preserve React/Vite and existing brand tokens. Do not migrate just to match a skill. |
| New app requiring server rendering/routing/data features | Evaluate Next.js + TypeScript; Tailwind/shadcn where useful. |
| Small hover/focus/state feedback | CSS first; Motion for React for appropriate state/layout/gesture work. |
| Sequenced or pinned scroll storytelling | GSAP + ScrollTrigger; use `@gsap/react` in React. |
| Smooth scroll | Native scroll by default; Lenis only when it adds value and preserves keyboard, anchors and reduced motion. |
| Product scene or interactive 3D | Three.js + R3F + selected Drei helpers; load only where needed. |
| Custom visual effect | GLSL only when materials/CSS/SVG do not suffice; compile and test real shaders. |
| Visual 3D scene editing | Spline when authoring/export/runtime tradeoffs fit the project. |
| Verification | Existing project checks + Playwright; Lighthouse and traces for measured performance questions. |

Project dependency examples, not setup commands to run globally: `npm install gsap @gsap/react`, `npm install motion`, `npm install lenis`, or `npm install three @react-three/fiber @react-three/drei`. Install only the chosen set after checking the project's React version, peer dependencies and current official docs. Do not add all engines to every page.

R3F's official performance guidance supports on-demand rendering for scenes that come to rest, explicit invalidation for imperative changes, and adaptive resolution. Those choices are more useful than a generic always-running high-detail canvas. [Official R3F guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

## Verification after approval

- [ ] `codex mcp list` loads without the service-tier parse failure.
- [ ] All five skill folders contain SKILL.md; names are unique across both user roots and repository skills.
- [ ] A fresh VS Code Codex session discovers the skills; test a GSAP request and a non-animation request to check routing.
- [ ] Existing Playwright initializes and opens a disposable local page served on loopback; click a button, assert its changed state, capture a screenshot, and inspect console errors.
- [ ] Context7 resolves and queries a specific official library document. **Already passed in this audit** for R3F performance docs; recheck if configuration changes.
- [ ] Codebase graph tools connect; re-index if the graph does not reflect current source.
- [ ] Optional GitHub/Figma servers authenticate in the target host and complete one read-only query against an intended repo/file; report account limits without broadening access silently.
- [ ] Optional Spline connects to a disposable scene in Spline Desktop; confirm only intended clients are enabled.
- [ ] Optional Chrome DevTools records a local trace with usage statistics disabled.
- [ ] Confirm keyboard access, visible focus, touch behavior and reduced-motion rendering on the browser fixture or actual changed UI.
- [ ] Report installed, connected, account-blocked, and untested states separately. Extension installation alone is not end-to-end VS Code verification.

## Maintenance and usage efficiency

Keep one default design voice and load specialist references only for the current task. Use graph discovery before repeated file scans. Retrieve documentation for a specific API/version rather than entire libraries. Batch browser checks at representative phone/tablet/desktop widths. Re-run checks after material changes, not after every cosmetic tweak.

Review pinned skill/MCP updates periodically and before adopting major runtime versions; inspect diffs and repeat the smoke test. Remove unused integrations instead of accumulating servers. Skills improve process and API correctness; the final quality still depends on project-specific art direction, assets, content and iteration. No skill can guarantee an award or a fixed subscription usage reduction.

Approval scope requested: **A only** — five GSAP skills, one configuration fix, project AGENTS activation, and verification. B–D remain optional and require selection before execution.
