# Engineering decisions

## 2026-10-14: Keep local Astro development independent from Netlify runtime

- Changed Astro configuration to load the Netlify adapter only for production builds.
- Kept the production `site` URL explicit, and made layout URL generation fall back to the current request URL when `Astro.site` is unavailable.
- Disabled the Astro development toolbar because its audit bundle fails to import `AXObjectRoles` from `axobject-query` in this dependency set and creates a browser error unrelated to the site.
- Chose command-aware configuration instead of replacing the production adapter. This preserves Netlify output while preventing the failing local Edge Functions runtime from breaking `localhost:4321`.
