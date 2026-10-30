---
name: hybrid-react-vanilla-architecture
description: >-
  High-performance architecture pattern combining multi-page HTML with React 19 micro-frontends mounted via createRoot, Vite multi-page Rollup builds, and centralized data stores.
---

# Hybrid React + Vanilla Multi-Page Architecture Skill

A hybrid web architecture that delivers the ultra-fast load times, SEO perfection, and simplicity of static multi-page HTML while providing state-of-the-art interactive micro-frontends using React 19 and WebGL2.

---

## Architecture Principles

1. **Multi-Page Static Foundation**:
   - Each primary route has an independent HTML file (`index.html`, `approach.html`, `focus.html`, etc.).
   - Initial page loads are instant with zero layout shift (CLS = 0) and pristine SEO title/meta tags.
2. **React 19 Mount Islands Pattern**:
   - Complex interactive elements (like the WebGL Sliced Wave Matrix and 3D DepthText Cycler) are packaged as React components.
   - A lightweight `mount*.jsx` factory uses `createRoot` to render the component into designated DOM placeholders (`<div id="mountPoint"></div>`).
   - Exposes clean imperative controller APIs (`destroy()`, `setText()`, etc.) back to vanilla JavaScript.
3. **Vite Multi-Page Configuration (`vite.config.js`)**:
   - Automatically bundles all entry points using `@vitejs/plugin-react` and Rollup inputs:
   ```javascript
   import { resolve } from "path";
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";

   export default defineConfig({
     plugins: [react()],
     build: {
       rollupOptions: {
         input: {
           main: resolve(import.meta.dirname, "index.html"),
           approach: resolve(import.meta.dirname, "approach.html"),
           focus: resolve(import.meta.dirname, "focus.html"),
           // ...
         },
       },
     },
   });
   ```
4. **Centralized Data Store (`ventureData.js`)**:
   - All public copy, portfolio items, sector criteria, and brand tokens live in a single exportable JavaScript object, consumed identically across React components and vanilla DOM controllers.
