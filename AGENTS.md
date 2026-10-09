# Repository Guidelines

## Project Structure & Module Organization

This repository is currently a pre-development workspace. Its only project asset is `WhatsApp Video 2026-10-09 at 22.17.12.mp4`, a 91-second visual reference for the planned interior-design website. Treat the video as design inspiration for the warm neutral palette, editorial typography, spacious layouts, interior imagery, before/after interaction, enquiry form, and scroll-led presentation. Do not copy branding, text, contact details, or proprietary imagery from the reference.

When implementation begins, keep application code in `src/`, static assets in `public/`, and automated tests either beside their modules or in `tests/`, following the selected framework's conventions. Group components by feature rather than creating broad utility folders prematurely.

## Build, Test, and Development Commands

No package manifest, framework, or build scripts exist yet. Do not document or depend on commands until the project is initialized. After setup, expose standard scripts through `package.json`, such as:

- `npm run dev` - start the local development server.
- `npm run build` - create the production build.
- `npm run lint` - run configured static checks.
- `npm test` - execute automated tests.

Update this guide when actual tooling differs.

## Coding Style & Naming Conventions

Follow formatter and linter settings committed with the future application. Until then, use two-space indentation for JSON, CSS, JavaScript, and TypeScript. Use `PascalCase` for UI components, `camelCase` for functions and variables, and kebab-case for asset filenames and route segments. Keep components focused and prefer semantic HTML, accessible controls, responsive layouts, and reusable design tokens.

## Testing Guidelines

No test framework or coverage threshold exists. Add tests with the first application setup. Name tests after observable behavior, for example `EnquiryForm.test.tsx`. Before submitting changes, run all available lint, test, and build scripts and manually check desktop and mobile layouts.

## Commit & Pull Request Guidelines

No Git history is present in this directory. Use concise Conventional Commit subjects, such as `feat: add interior project gallery`, followed by a short body explaining what changed and why. Pull requests should include scope, verification steps, linked issues when applicable, and screenshots or recordings for visible changes. Call out any intentional departure from the reference video's visual direction.
