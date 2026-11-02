# Star Venture Capital brand assets

The original artwork was downloaded from the official Star Groups website on 30 October 2026.

- Company page: https://www.stargroups.info/companies/star-capital-venture
- Full wordmark: https://www.stargroups.info/company-logo/star-venture-capital-logo.png
- Shared star symbol used by the official website: https://www.stargroups.info/android-chrome-512x512.png

`star-venture-capital-original.png` retains the complete wordmark and transparent background for light surfaces such as the footer. `star-venture-capital-dark-transparent.png` is the dark-theme wordmark (white & red typography with the stylized star) optimized with an alpha-transparent background for the dark header and hero navigations. `star-symbol-original.png` is the site's official square icon, using the same black star and red swoosh on white so it stays visible on light and dark browser chrome.

Run `npm run brand:generate` to regenerate the files in `public/brand/` and the PNG/ICO icons in `public/`. This generates both responsive light assets and responsive dark assets (280px, 560px, 840px). The ICO includes 16, 32 and 48px images. Apple and Android icons are 180, 192 and 512px.

The website uses responsive optimized PNG logos at 280, 560 and 840px, with intrinsic dimensions, eager header loading and lazy footer loading. The originals are outside `public/` and are not shipped in the production build.

The dark header displays the transparent dark wordmark directly over the sticky dark navigation bar, while the footer displays the original logo on the light card surface.
