# Book integration

The book *From Pythagoras to Riemann–Roch* lives in its own public repository,
`hilkoc/markdown-math-book`, on the branch `publish`. The branch `main` of that repository
holds the same build pipeline with two sample chapters and no book; it is a template for
other people's books. This site presents the book at `/book/`. All book links and metadata
are in `src/data/book.ts`.

## Current state (v1)

`BOOK.published` is `false`. The book page shows the pitch, the contents and the donation
ask. The download and read-online links are disabled, with a "Coming soon" note.

## Design

The book repository publishes its own artifacts. This site only links to them.

| Artifact | Published by the book repository to | Linked from this site as |
| --- | --- | --- |
| `book.pdf` | a GitHub Release asset | `https://github.com/hilkoc/markdown-math-book/releases/latest/download/book.pdf` |
| `book.epub` | a GitHub Release asset | `.../releases/latest/download/book.epub` |
| HTML edition (`build/web/`) | the book repository's own GitHub Pages | `https://hilkoc.github.io/markdown-math-book/` |

The workflow `.github/workflows/publish.yml` in the book repository runs on every push to
the branch `publish`. It builds the book, creates a GitHub Release tagged
`vYYYY.MM.DD.N` (UTC date and workflow run number) with `book.pdf` and `book.epub`, and
deploys the website to GitHub Pages.

`releases/latest/download/<name>` always resolves to the newest release. A new edition
therefore appears on this site **without rebuilding it**. A rebuild only refreshes the
"Latest edition vX, date" line, which comes from the GitHub API at build time.

Chapter links on `/book/` use the page names that pandoc's `chunkedhtml` writer produces,
for example `the-circle-and-the-cubic.html`. Most chapter headings on `publish` have no
explicit ID, so the page name comes from the heading text. The names are listed in `PARTS`
in `src/data/book.ts`. If a chapter title changes, its page name changes, so update `PARTS`
as well.

## Steps to go live

1. **Book repository: public, with the workflow at the repository root.** Done:
   `hilkoc/markdown-math-book`, workflow `.github/workflows/publish.yml`.
2. **Book repository: release job.** Done: `publish.yml` creates a release on every push
   to `publish`, with exactly the asset names `book.pdf` and `book.epub`.

   One-time repository settings: Pages > Source is "GitHub Actions", and the environment
   `github-pages` allows the branch `publish` to deploy (by default only the default
   branch `main` may deploy).
3. **Book repository, optional: notify this site.** `publish.yml` already has the step.
   It sends a `repository_dispatch` event `book-updated` to `hilkoc/hilkoc.github.io`, so
   the version line refreshes. It runs only if the secret `SITE_DISPATCH_TOKEN` exists in
   the book repository: a fine-grained token with *Contents: read and write* on
   `hilkoc/hilkoc.github.io`.

   `.github/workflows/deploy.yml` here already listens for `book-updated`.
4. **Book repository, optional: link back.** Add a small banner to the HTML template, for
   example "← hilkoc.github.io · Support the book". Readers who land on the online
   edition can then find the donation page.
5. **This site:** set `published: true` in `src/data/book.ts`. Check the links and push.
