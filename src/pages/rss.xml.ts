import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../data/posts';
import { SITE } from '../data/site';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.title} — blog`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-gb</language>`,
  });
}
