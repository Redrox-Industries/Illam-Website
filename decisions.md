# Engineering decisions

## 2026-10-15: Align the checkout with the Sirpi repository identity

- Changed the Git origin from `Redrox-Industries/Illam-Website` to the user-supplied `Redrox-Industries/Sirpi-Website` repository after confirming the remote exists.
- Renamed the local project folder from `interiorwebsite` to `sirpiwebsite` so the checkout name matches the product and remote repository.
- Preserved all uncommitted branding changes during the rename so they could be verified and published together as one branding release.

## 2026-10-15: Derive the site identity and palette from the supplied Sirpi logo

- Replaced the temporary Illam wordmark with the supplied Sirpi Interiors logo in the header and footer. The logo image carries the Tamil and English identity without duplicating either name as styled website text.
- Kept the original supplied JPEG unchanged as a source reference while using the later transparent logo supplied for the website.
- Switched the site to the separately supplied transparent `Logo2.png` asset. CSS crops only Logo2's unused vertical space so its combined crest and wordmark remain visible without adding duplicate text.
- Applied the updated transparent `Logo2.png` asset to both header and footer, set the company name to Sirpi Interiors throughout the site, and removed public-facing contact-pending and concept-preview wording at the user's request.
- Replaced the earlier square `Logo2.png` copy with the later wide, high-resolution file supplied under the same name. Removed square-specific vertical cropping so the complete crest, Tamil wordmark, and `INTERIORS` line remain visible in both placements.
- Replaced the shared footer question “Have a space in mind?” with the clearer call to action “Let’s shape your space.” across every route.
- Replaced the previous terracotta and olive accents with deep burgundy, antique gold, soft gold, and warm ivory tokens sampled from the logo. A darker gold token is used for small text on light backgrounds to preserve readable contrast.
- Changed primary and secondary text from neutral near-black and gray to deep burgundy and muted wine. Dark sections keep warm ivory and gold text, giving every text role a logo-derived color while retaining strong contrast.
- Kept all existing placeholder warnings, `noindex`, disabled enquiry behavior, content structure, and the Redrox Industries relationship unchanged. This limits the change to approved branding and avoids treating missing business information as confirmed.
- Chose shared CSS tokens over page-specific color overrides because the brand palette is a site-wide invariant and one token layer keeps every route consistent.

## 2026-10-14: Keep local Astro development independent from Netlify runtime

- Changed Astro configuration to load the Netlify adapter only for production builds.
- Kept the production `site` URL explicit, and made layout URL generation fall back to the current request URL when `Astro.site` is unavailable.
- Disabled the Astro development toolbar because its audit bundle fails to import `AXObjectRoles` from `axobject-query` in this dependency set and creates a browser error unrelated to the site.
- Chose command-aware configuration instead of replacing the production adapter. This preserves Netlify output while preventing the failing local Edge Functions runtime from breaking `localhost:4321`.
