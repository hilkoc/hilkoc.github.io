# CLAUDE.md

Personal site for `https://hilkoc.github.io/`: Astro 7, static output, deployed by
`.github/workflows/deploy.yml`. See README.md for layout and services.

## Commands

- `npm run dev`: dev server. Includes the design preset switcher.
- `npm run build`: `astro check` and then `astro build`. A clean build with 0 errors is
  the test.

## Conventions

- Styling: plain CSS. Components use only the custom properties from
  `src/styles/tokens.css`. Never hard-code colours, except in `BookCover.astro`, which
  uses fixed colours on purpose.
- Content lives in `src/content/` (blog, projects). Schemas are in `src/content.config.ts`.
  Data shared by several pages lives in `src/data/`.
- Markdown runs on the `unified()` processor from `@astrojs/markdown-remark`, not the
  Astro 7 default Sätteri, because KaTeX needs `remark-math` and `rehype-katex`.
- Inline `<script is:inline>` children are raw text. Use `set:html` to inject a string.
- Never create routes at `/zeno/`, `/change-the-world/` or `/algebraic-geometry-book/`.
  Those paths belong to other repositories on the same domain.
- Book links: `src/data/book.ts`. See `docs/book-integration.md`.
