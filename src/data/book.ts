/* Single source of truth for the book. When the book repository is public, set
   `published: true`. The download links use GitHub's `releases/latest/download/` URLs,
   so every new release shows up here without rebuilding this site. */

const REPO = 'hilkoc/markdown-math-book';

export const BOOK = {
  published: false,
  title: 'From Pythagoras to Riemann–Roch',
  subtitle: 'Algebraic Curves Through Problems',
  author: 'Hilko',
  rights: '© 2026 Hilko. All rights reserved.',
  repo: `https://github.com/${REPO}`,
  releasesApi: `https://api.github.com/repos/${REPO}/releases/latest`,
  pdf: `https://github.com/${REPO}/releases/latest/download/book.pdf`,
  epub: `https://github.com/${REPO}/releases/latest/download/book.epub`,
  html: 'https://hilkoc.github.io/markdown-math-book/',
  /* Suggested donation: €1 per chapter. Set below from CHAPTER_COUNT. */
  suggestedEuro: 0,
  url: 'https://hilkoc.github.io/book/',
};

export interface Chapter {
  n?: number;
  title: string;
  slug: string;
  problem?: string;
}

export interface Part {
  name: string;
  title: string;
  summary: string;
  chapters: Chapter[];
}

/* Slugs are the page names pandoc's chunkedhtml writer produces in build/web/. */
export const FRONT: Chapter = { title: 'Preface', slug: 'preface' };
export const BACK: Chapter = { title: 'Afterword: Roads Onward', slug: 'afterword' };

export const PARTS: Part[] = [
  {
    name: 'Part I',
    title: 'Curves as Equations',
    summary: 'Zero sets of polynomials: coordinate rings, points at infinity, Bézout, tangent spaces and singular points.',
    chapters: [
      { n: 1, title: 'The Circle and the Cubic', slug: 'the-circle-and-the-cubic', problem: 'Find every Pythagorean triple, then watch the same method fail on a cubic.' },
      { n: 2, title: "A Bijection That Isn't an Isomorphism", slug: 'a-bijection-that-isnt-an-isomorphism' },
      { n: 3, title: 'Where the Other Two Points Went', slug: 'where-the-other-two-points-went', problem: 'Two circles should meet in four points. Where are the missing two?' },
      { n: 4, title: 'Corners and Crossings: Tangent Spaces', slug: 'corners-and-crossings-tangent-spaces' },
    ],
  },
  {
    name: 'Part II',
    title: 'Curves as Fields',
    summary: 'A curve through its field of rational functions. Points come back as valuations.',
    chapters: [
      { n: 5, title: 'Four Curves, One Field', slug: 'four-curves-one-field', problem: 'Four curves look different, yet share something no equation shows.' },
      { n: 6, title: 'Counting Branches: Points as Valuations', slug: 'counting-branches-points-as-valuations' },
      { n: 7, title: 'Curves Are Fields', slug: 'curves-are-fields' },
      { n: 8, title: 'Zeros and Poles', slug: 'zeros-and-poles' },
    ],
  },
  {
    name: 'Part III',
    title: 'Differentials and the Genus',
    summary: 'The invariant that separates the circle from the cubic, and several ways to compute it.',
    chapters: [
      { n: 9, title: 'An Integral That Refuses', slug: 'an-integral-that-refuses' },
      { n: 10, title: 'Counting Holes: The Genus', slug: 'counting-holes-the-genus' },
      { n: 11, title: 'Covering the Line: Riemann–Hurwitz', slug: 'covering-the-line-riemannhurwitz' },
      { n: 12, title: 'Where Did the Genus Go?', slug: 'where-did-the-genus-go' },
    ],
  },
  {
    name: 'Part IV',
    title: 'Schemes and Sheaves',
    summary: 'The foundations, once earlier chapters have created the need for them.',
    chapters: [
      { n: 13, title: 'One Equation, Every Ring: Schemes', slug: 'one-equation-every-ring-schemes' },
      { n: 14, title: 'Partial Fractions on a Curve: Sheaves and Cohomology', slug: 'partial-fractions-on-a-curve-sheaves-and-cohomology', problem: 'Partial fractions fail on a cubic curve, and the failure has a size.' },
    ],
  },
  {
    name: 'Part V',
    title: 'Riemann–Roch and What It Buys',
    summary: 'The theorem that counts functions on a curve, used to finish what Chapter 1 started.',
    chapters: [
      { n: 15, title: 'Counting Functions: The Riemann–Roch Theorem', slug: 'counting-functions-the-riemannroch-theorem' },
      { n: 16, title: 'The Circle and the Cubic, Revisited', slug: 'the-circle-and-the-cubic-revisited' },
      { n: 17, title: 'Telling Curves Apart', slug: 'telling-curves-apart' },
      { n: 18, title: 'Codes from Curves', slug: 'codes-from-curves' },
    ],
  },
];

/* The afterword counts as a chapter; the preface does not. */
export const CHAPTER_COUNT = PARTS.reduce((sum, p) => sum + p.chapters.length, 0) + 1;
BOOK.suggestedEuro = CHAPTER_COUNT;

export const chapterUrl = (slug: string) => `${BOOK.html}${slug}.html`;

/* Version line from the latest GitHub release. Decoration only: any failure gives null. */
export async function latestRelease(): Promise<{ tag: string; date: string } | null> {
  if (!BOOK.published) return null;
  try {
    const res = await fetch(BOOK.releasesApi, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) return null;
    const data = (await res.json()) as { tag_name?: string; published_at?: string };
    if (!data.tag_name || !data.published_at) return null;
    return { tag: data.tag_name, date: data.published_at };
  } catch {
    return null;
  }
}
