# Book integration

The book *From Pythagoras to Riemann–Roch* lives in its own repository,
`hilkoc/algebraic-geometry-book`, which is not public yet. This site presents it at
`/book/`. All book links and metadata are in `src/data/book.ts`.

## Current state (v1)

`BOOK.published` is `false`. The book page shows the pitch, the contents and the donation
ask. The download and read-online links are disabled, with a "Coming soon" note.

## Design

The book repository publishes its own artifacts. This site only links to them.

| Artifact | Published by the book repository to | Linked from this site as |
| --- | --- | --- |
| `book.pdf` | a GitHub Release asset | `https://github.com/hilkoc/algebraic-geometry-book/releases/latest/download/book.pdf` |
| `book.epub` | a GitHub Release asset | `.../releases/latest/download/book.epub` |
| HTML edition (`build/web/`) | the book repository's own GitHub Pages | `https://hilkoc.github.io/algebraic-geometry-book/` |

`releases/latest/download/<name>` always resolves to the newest release. A new edition
therefore appears on this site **without rebuilding it**. A rebuild only refreshes the
"Latest edition vX, date" line, which comes from the GitHub API at build time.

Chapter links on `/book/` use the page names that pandoc's `chunkedhtml` writer produces,
for example `the-circle-and-the-cubic.html`. They are listed in `PARTS` in
`src/data/book.ts`. If a chapter title changes, its slug changes, so update `PARTS` as well.

## Steps to go live (later update)

1. **Book repository: make it public and push it.** The Pages workflow in
   `book-pipeline/.github/workflows/pages.yml` assumes `book-pipeline/` is the repository
   root. Fix that path, or move the workflow to `.github/workflows/` at the repository
   root.
2. **Book repository: add a release job.** On a tag `v*`, run `make pdf epub` and attach
   both files to the release with exactly these names:

   ```yaml
   on:
     push:
       tags: ['v*']
   permissions:
     contents: write
   jobs:
     release:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v7
         # install pandoc >= 3, TeX Live with XeLaTeX and Latin Modern, fonts-cmu
         - run: make pdf epub
         - run: gh release create "$GITHUB_REF_NAME" build/book.pdf build/book.epub --generate-notes
           env:
             GH_TOKEN: ${{ github.token }}
   ```

3. **Book repository, optional: notify this site.** After the release step, send a
   `repository_dispatch` event so the version line refreshes. It needs a fine-grained
   token with *Contents: read and write* on `hilkoc/hilkoc.github.io`, stored as the secret
   `SITE_DISPATCH_TOKEN`:

   ```yaml
         - run: >
             gh api repos/hilkoc/hilkoc.github.io/dispatches
             -f event_type=book-updated
           env:
             GH_TOKEN: ${{ secrets.SITE_DISPATCH_TOKEN }}
   ```

   `.github/workflows/deploy.yml` here already listens for `book-updated`.
4. **Book repository, optional: link back.** Add a small banner to the HTML template, for
   example "← hilkoc.github.io · Support the book". Readers who land on the online
   edition can then find the donation page.
5. **This site:** set `published: true` in `src/data/book.ts`. Check the links and push.
