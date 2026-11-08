import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/* Drafts show in `npm run dev` only. Newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const readingMinutes = (post: Post) =>
  Math.max(1, Math.round((post.body ?? '').split(/\s+/).filter(Boolean).length / 220));

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const tagSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');
