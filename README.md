# Illam Website

Premium interior-design marketing website for Redrox Industries. The project uses Astro and TypeScript, deploys to Netlify, and follows a staged implementation plan so each approved chunk remains reviewable.

## Current status

Chunks 1, 2, and 3 are complete locally. The live preview still needs the later chunks deployed and verified.

- Live preview: <https://redrox-interior-preview.netlify.app>
- Indexing: disabled with `noindex` while business facts and content remain placeholders
- Implemented routes: Home, About Us, Projects, Services, Contact Us, custom 404, robots, and sitemap
- Current content: explicit placeholders only; no invented company facts or project claims

## What chunk 1 includes

- Responsive page shell with mobile-first navigation and footer
- Warm-neutral design tokens, editorial typography, accessible focus states, and reduced-motion handling
- Central typed site-data placeholders
- Reusable Astro layout and navigation components
- Canonical and social metadata foundation
- Favicon, sitemap, restrictive robots policy, and custom 404 page
- Netlify adapter, deployment configuration, and security headers
- ESLint, Prettier, Astro checks, Vitest, and Playwright tooling
- Internal design-reference notes derived from selected frames of the supplied video

The reference video and client screenshot remain local. They are intentionally excluded from Git and must not be published without confirmed rights.

## What chunk 2 includes

- Five primary pages with navigation in the agreed order
- Home introduction, service and fictional project previews, process, and contact CTA
- About Us story, values, approach, and capabilities, all marked as draft content
- One fictional project gallery and six potential service placeholders
- Contact placeholders and a disabled enquiry form with a clear privacy notice

No form submission, project detail routes, or real project images are included in this chunk.

## What chunk 3 includes

- Original generated concept imagery for Home and the fictional Projects gallery
- Keyboard-accessible before/after slider using two images of the same fictional room
- Restrained scroll reveals with no-motion and no-JavaScript fallbacks
- Refined editorial footer with contact placeholders clearly marked
- Image source and usage notes in [`docs/imagery-rights.md`](./docs/imagery-rights.md)

## Technology

- Astro 5 with strict TypeScript
- `@astrojs/netlify` for Netlify deployment and future server endpoints
- `@astrojs/sitemap` for generated sitemap output
- CSS design system without a UI framework or heavy animation library
- ESLint and Prettier for code quality
- Vitest and Playwright prepared for later unit and browser tests

## Project structure

```text
src/
  components/       Shared header and footer
  data/             Typed business and navigation placeholders
  layouts/          Shared HTML, SEO, and page shell
  pages/            Astro routes, custom 404, and robots response
  styles/           Global tokens, responsive layouts, and accessibility rules
public/              Static public assets
docs/                Internal design-reference documentation
astro.config.mjs     Astro, Netlify, sitemap, and canonical-site configuration
netlify.toml         Build, publish, and security-header settings
```

## Local development

Requirements:

- Node.js 24
- npm

Install and run:

```bash
npm install
npm run dev
```

Available checks:

```bash
npm run format:check
npm run lint
npm run check
npm run build
npm test
npm run test:e2e
```

Production output is generated in `dist/`.

## Environment variables

Copy `.env.example` to a local `.env` when integration work begins. Never commit secrets.

| Variable                    | Purpose                            | Required now            |
| --------------------------- | ---------------------------------- | ----------------------- |
| `PUBLIC_SITE_URL`           | Canonical public site URL          | No; configured in Astro |
| `PUBLIC_TURNSTILE_SITE_KEY` | Browser Turnstile widget           | Chunk 4                 |
| `TURNSTILE_SECRET_KEY`      | Server-side Turnstile verification | Chunk 4                 |
| `RESEND_API_KEY`            | Resend API authentication          | Chunk 4                 |
| `RESEND_FROM`               | Verified sender address            | Chunk 4                 |
| `ENQUIRY_TO`                | Owner enquiry destination          | Chunk 4                 |

## Content and design rules

- Keep all unavailable brand, contact, service-area, and business facts visibly marked as placeholders.
- Mark all sample projects as fictional until approved project content arrives.
- Do not copy branding, text, contact details, or proprietary imagery from the reference video.
- Do not publish the source video or extracted frames.
- Record source and rights information for every final image.
- Preserve keyboard navigation, visible focus states, semantic headings, reduced-motion support, and WCAG AA contrast.

## Delivery roadmap

### Chunk 2: Required pages

- Build Home, About Us, Projects, Services, and Contact Us.
- Keep process content inside Home.
- Keep Projects as one gallery page without project-detail routes.
- Keep enquiry delivery disabled and clearly labelled until backend setup.

### Chunk 3: Original visuals and interaction

- Add original, rights-recorded interior imagery.
- Add accessible before/after comparison.
- Add restrained scroll reveals with reduced-motion fallback.

### Chunk 4: Enquiry delivery

- Add browser and server validation.
- Add honeypot, Cloudflare Turnstile, and pending-submit protection.
- Add `POST /api/enquiries` and Resend owner notifications.
- Add Privacy page before enabling submissions.

### Chunk 5: Production verification

- Test navigation, form states, 404 handling, accessibility, and responsive widths.
- Require clean formatting, lint, type checks, tests, and production build.
- Verify live Netlify routes and enquiry delivery.
- Remove `noindex` only after every release gate passes.

Detailed acceptance criteria live in [`interior-design-website-plan.md`](./interior-design-website-plan.md).

## Release gates

Public launch requires:

- Approved brand identity and business facts
- Real contact and service-area details
- Verified Resend sending domain and destination email
- Approved privacy and legal copy
- Approved project content and confirmed image rights
- Successful live enquiry-delivery test
- Final accessibility, responsive, and production checks

## Deployment

Netlify uses these repository settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 24

Current placeholder deployment must remain `noindex` until all release gates pass.
