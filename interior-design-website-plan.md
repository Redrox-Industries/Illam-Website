# Interior Design Website Implementation Plan

## Summary

Build a premium Astro + TypeScript marketing website inspired by the supplied reference video without copying its branding, text, contact details, or proprietary imagery.

- Primary pages: Home, About Us, Projects, Services, and Contact Us.
- Utility routes: custom 404, Privacy, robots, and sitemap.
- Hosting: Netlify.
- Content: explicit brand placeholders and clearly fictional sample projects until approved facts arrive.
- Search indexing: disabled until release gates are complete.

## Chunk 1: Foundation — Complete

- Initialize Astro, TypeScript, ESLint, Prettier, Vitest, and Playwright.
- Define warm-neutral design tokens and editorial typography.
- Create responsive header, mobile navigation, footer, page shell, SEO metadata, favicon, sitemap, robots handling, and custom 404.
- Review selected video frames and record internal visual guidance.
- Deploy the placeholder foundation to Netlify with `noindex` protection.
- Verify type checks, lint, production build, live homepage, robots, and custom 404.

## Chunk 2: Required Pages — Complete

- Use primary navigation order: Home, About Us, Projects, Services, Contact Us.
- Home: hero, studio introduction, services preview, selected projects, compact process section, and contact CTA.
- About Us: placeholder studio story, values, approach, and capabilities without invented history or claims.
- Projects: one gallery page with residential, commercial, and hospitality samples visibly marked fictional.
- Services: residential, commercial, spatial planning, renovation, styling, and project coordination placeholders.
- Contact Us: contact placeholders, enquiry form interface, privacy notice, and disabled-delivery message until backend setup.
- Keep process content inside Home. Do not add standalone Process or Project Detail pages in v1.
- Implemented with visibly marked placeholder content, fictional project studies, and a disabled enquiry form. Real facts, imagery, and delivery remain later work.

## Chunk 3: Visual Assets and Interaction

- Create original interior imagery and record source and rights notes.
- Add an accessible before/after comparison on Home or Projects.
- Add restrained scroll reveals with a reduced-motion fallback.
- Keep Projects as a simple gallery without filters or detail routes.

## Chunk 4: Enquiry Delivery

- Add name, email, phone, project location, space type, area, budget, message, and consent fields.
- Validate in browser and server. Normalize values and reject unexpected fields.
- Add a honeypot, Cloudflare Turnstile, and duplicate-submit prevention.
- Send owner notifications through Resend using server-only environment variables.
- Add a footer-only Privacy page before enabling live submissions.
- Preserve entered values after recoverable errors.

## Chunk 5: Verification and Release

- Test every primary route, unknown-route 404 handling, mobile navigation, keyboard use, focus states, contrast, reduced motion, and horizontal overflow.
- Check widths at 320, 390, 768, 1024, and 1440 pixels.
- Require clean formatting, lint, type checks, tests, and production build.
- Redeploy each approved chunk to the existing Netlify site.
- Remove `noindex` only after real branding, contacts, legal copy, projects, and image rights are approved.

## Data and Interface Decisions

- Keep brand and contact placeholders in typed site data.
- Store service and fictional project summaries in typed data files.
- Keep the enquiry endpoint at `POST /api/enquiries`.
- Keep CMS, authentication, blog, multilingual support, analytics, admin dashboard, and project-detail routes outside v1.

## Release Gates

- Real brand identity and contact details supplied.
- Destination email and sending domain verified.
- Privacy and legal copy approved.
- Project content and all image rights confirmed.
- Live enquiry delivery verified before launch.
