# Interior Design Website Implementation Plan

## Summary

Build a premium, responsive marketing website inspired by `WhatsApp Video 2026-10-09 at 22.17.12.mp4`.

- Stack: Astro + TypeScript.
- Audience: residential and commercial clients.
- Pages: Home, About, Services, Projects, Project Detail, Process, and Contact.
- Style: warm neutrals, editorial typography, large imagery, generous spacing, and refined motion.
- Hosting: Vercel.
- Enquiries: Resend through a server endpoint protected by Cloudflare Turnstile.
- Content: explicit brand placeholders, licensed placeholder photography, and clearly fictional sample projects.
- Do not copy reference branding, text, contact details, or proprietary imagery.

## Experience and Architecture

- Create shared header, mobile navigation, footer, page shell, section heading, CTA, image, and form components.
- Centralize business placeholders in typed site data. Store sample projects in an Astro content collection.
- Use mostly prerendered pages. Enable `@astrojs/vercel` only for on-demand enquiry handling.
- Implement motion with CSS, Intersection Observer, and a small Astro island for the before/after slider. Avoid a heavy animation library.
- Respect `prefers-reduced-motion`, keyboard navigation, visible focus states, semantic headings, descriptive alt text, and WCAG AA contrast.
- Keep the source video as an internal design reference. Do not publish or embed it unless usage rights are confirmed.

## Phase 1: Foundation and Visual System

- Initialize Astro, TypeScript, ESLint, Prettier, Vitest, and Playwright.
- Define color, typography, spacing, radius, shadow, container, and motion tokens.
- Create responsive shell, navigation, footer, SEO metadata, sitemap, robots handling, and custom 404.
- Produce a reference board from selected video frames covering typography, palette, spacing, interactions, and motion.
- Demo: shared shell at mobile, tablet, and desktop sizes.

## Phase 2: Core Marketing Pages

- Build Home with editorial hero, residential/commercial positioning, featured projects, before/after module, process preview, services, testimonial placeholder, and enquiry CTA.
- Build About, Services, and Process as separate routes with original placeholder copy.
- Use local optimized images with recorded source and license information.
- Demo: complete navigation and responsive page flow without broken links.

## Phase 3: Project System

- Define typed project fields: slug, title, category, location placeholder, summary, services, year, hero, gallery, challenge, approach, outcome, and featured status.
- Build a filterable Projects index and dynamic Project Detail routes.
- Add three clearly labeled fictional samples: residential renovation, office interior, and hospitality concept.
- Build an accessible before/after comparison with keyboard controls and a static fallback.
- Demo: filtering, project navigation, galleries, and transformation interaction.

## Phase 4: Contact and Enquiry Delivery

- Build fields for name, email, phone, project location, space type, approximate area, budget range, message, and consent.
- Validate required fields in the browser and again on the server. Normalize values and reject unexpected fields.
- Verify the Turnstile token server-side before sending.
- Add `POST /api/enquiries` with structured success, validation, spam, and delivery-error responses.
- Send owner notifications through Resend. Keep the API key, sender, and recipient addresses server-only.
- Prevent duplicate submissions while pending. Preserve entered values after recoverable errors.
- Demo: valid email delivery plus visible handling for invalid, spam, and provider-failure cases.

## Phase 5: Production Hardening and Release

- Add Open Graph metadata, canonical URLs, favicon, and social preview.
- Add structured organization and service data only after real facts arrive.
- Optimize responsive images, font loading, JavaScript, and layout stability.
- Keep placeholder deployments `noindex`. Remove `noindex` only after brand, contact, service-area, project, legal, and image-rights review.
- Connect the repository to Vercel, configure preview and production environment variables, and verify preview before promotion.
- Update `AGENTS.md` with real commands and structure after setup.

## Test and Acceptance Plan

- Unit-test project filtering, form validation, payload normalization, and email-template rendering.
- Integration-test enquiry success, invalid fields, failed Turnstile, missing environment variables, and Resend errors.
- Playwright-test navigation, mobile menu, project filtering, before/after keyboard behavior, form states, and 404 handling.
- Check widths at 320, 390, 768, 1024, and 1440 pixels with no horizontal overflow.
- Run keyboard-only, reduced-motion, contrast, and automated accessibility checks.
- Require clean lint, type check, tests, and production build.
- Target mobile Lighthouse scores of at least 90 for Performance and 95 for Accessibility, Best Practices, and SEO.
- Verify live Vercel routes, assets, enquiry delivery, metadata, and placeholder `noindex` behavior.

## Assumptions and Release Gates

- Astro is preferred over Next.js because this is primarily a content-led static site with one server feature.
- Placeholder brand facts must remain visibly marked and must never become invented production claims.
- Licensed images are stored locally and tracked with source and license notes.
- Custom domain, analytics, CMS, authentication, blog, multilingual support, and admin dashboard are outside v1.
- Production launch requires real brand identity, destination email, verified sending domain, legal/privacy copy, approved project content, and confirmed image rights.
