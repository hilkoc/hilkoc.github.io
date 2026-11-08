// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  site: 'https://hilkoc.github.io',
  trailingSlash: 'always',
  integrations: [
    // Expressive Code must come before mdx.
    expressiveCode({
      themes: ['github-dark-default', 'github-light'],
      // Follow the site theme attribute, not only the OS setting.
      themeCssSelector: (theme) =>
        theme.type === 'dark' ? ':root[data-theme="dark"]' : ':root[data-theme="light"]',
      useDarkModeMediaQuery: false,
      styleOverrides: {
        borderRadius: '0.6rem',
        codeFontFamily: 'var(--font-mono)',
      },
    }),
    mdx(),
    sitemap({ filter: (page) => !page.includes('/contact/thanks/') }),
  ],
  markdown: {
    // Unified (remark/rehype) pipeline, for KaTeX math in posts. MDX inherits it.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
