# hilkoc.github.io

Personal site of Hilko: a blog, project pages and the book *From Pythagoras to
Riemann–Roch*. Built with [Astro](https://astro.build) and deployed to GitHub Pages at
<https://hilkoc.github.io/>.

## Running it

Requires Node 22.23 or newer (see `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321, with the dev-only design preset switcher
npm run build     # astro check + static build into dist/
npm run preview   # serve dist/
```

## Deploying

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. One-time setup:

1. Create the repository `hilkoc/hilkoc.github.io`. The name must match exactly for a
   user site at the root URL.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.

Project sites such as `/zeno/` and `/change-the-world/` are served from their own
repositories on the same domain. Never create pages at those paths here: project
detail pages live under `/projects/<slug>/`.

## Writing

| What | Where |
| --- | --- |
| Blog post | `src/content/blog/<slug>.md` or `.mdx`. Frontmatter: `title`, `description`, `date`, `tags`, optional `updated`, `draft` |
| Project | `src/content/projects/<slug>.md`. Frontmatter schema in `src/content.config.ts` |
| Book metadata, chapters, links | `src/data/book.ts` |
| Navigation, social links, service keys | `src/data/site.ts` |

Posts support KaTeX math: `$inline$` and `$$display$$`. Drafts (`draft: true`) show in
`npm run dev` only.

Project detail pages can embed a live site. Set `embed` in the frontmatter:

- `iframe`: a click-to-load 16:9 preview, for heavy demos (Zeno).
- `phone`: a phone mockup on wide screens, for mobile-first sites (change-the-world).
- `none`: generated illustration only.

## Look and feel

All colours, fonts, radii and spacing are CSS custom properties.

- `src/styles/tokens.css` holds the default preset, **Paper & Night**: serif type, cream paper in light
  mode, near-black in dark mode.
- `src/styles/presets/indigo.css` (**Indigo Night**), `mono.css` (**Minimal Mono**) and
  `paper.css` (**Paper & Ink**: the default with a deep indigo dark mode) override
  it when `<html data-preset="...">` is set.
- In `npm run dev`, a floating panel at the bottom right switches presets. It is not
  rendered in production builds.

To adopt another preset permanently, copy its values into `tokens.css`. Then delete the
preset files and their imports in `src/styles/global.css`.

Light and dark mode follow the operating system by default. The header button cycles
System → Light → Dark and remembers the choice in `localStorage`.

## Third-party services

| Service | Used for | Configured in |
| --- | --- | --- |
| [GoatCounter](https://www.goatcounter.com) (`hilkoc`) | Page views and the per-page view count. No cookies | `GOAT_CODE` in `src/data/site.ts` |
| [Web3Forms](https://web3forms.com) | Contact form delivery | `WEB3FORMS_KEY` in `src/data/site.ts` |
| [Buy Me a Coffee](https://buymeacoffee.com/hilko) | Donations | `SITE.donate` in `src/data/site.ts` |

Both keys are public by design. They are the same keys the change-the-world site uses.
GoatCounter counts per path, so the numbers for this site and the project sites stay
separate.

## The book

See [docs/book-integration.md](docs/book-integration.md).
