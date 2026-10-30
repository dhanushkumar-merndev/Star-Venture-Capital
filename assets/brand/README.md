# Star Venture Capital brand assets

The original artwork was downloaded from the official Star Groups website on 30 October 2026.

- Company page: https://www.stargroups.info/companies/star-capital-venture
- Full wordmark: https://www.stargroups.info/company-logo/star-venture-capital-logo.png
- Shared star symbol used by the official website: https://www.stargroups.info/android-chrome-512x512.png

`star-venture-capital-original.png` retains the complete wordmark and transparent background. `star-symbol-original.png` is the site's official square icon, using the same black star and red swoosh on white so it stays visible on light and dark browser chrome.

Run `npm run brand:generate` to regenerate the files in `public/brand/` and the PNG/ICO icons in `public/`. This only resizes the supplied artwork and removes export metadata; it does not redraw, recolor, or crop the logo. The ICO includes 16, 32 and 48px images. Apple and Android icons are 180, 192 and 512px.

The website uses responsive optimized PNG logos at 280, 560 and 840px, with intrinsic dimensions, eager header loading and lazy footer loading. PNG was smaller than lossless WebP at each of these sizes (approximately 5, 11 and 16 KB). The originals are outside `public/` and are not shipped in the production build.

The header places the original black-and-red wordmark on a small white backing so it remains readable against both dark and light header states.
