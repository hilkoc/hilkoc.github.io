import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    repo: z.url(),
    liveUrl: z.url().optional(),
    tech: z.array(z.string()),
    status: z.enum(['live', 'active', 'experimental', 'archived']),
    order: z.number(),
    accent: z.string().default('var(--accent)'),
    embed: z.enum(['none', 'iframe', 'phone']).default('none'),
    install: z.string().optional(),
  }),
});

export const collections = { blog, projects };
