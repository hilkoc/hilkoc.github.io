---
title: Taganizer
tagline: A tag-based organiser for files, URLs and notes. Also a memory for agents.
repo: https://github.com/hilkoc/taganizer
tech: [Python, SQLite, CLI, Standard library only]
status: active
order: 4
accent: '#f59e0b'
install: pipx install taganizer
---

Taganizer stores items in SQLite and arranges them into a parent/child tag hierarchy. You
find things by combining tags. It also works as a memory tool for AI agents.

## Overview

- Items are anything worth tracking: files, directories, URLs, snippets of text, or other
  tags.
- Items link into a **tag hierarchy**, a directed acyclic graph. A database trigger
  prevents cycles.
- **Search** intersects tags, supports a union of intersections, and excludes with `-`.
  `A B + C - D` means *((A and B) or C) and not D*.
- Pure standard library, no dependencies. Python 3.8+.

## Quick start

```bash
tzr init
tzr create tag python
tzr create url https://example.com
tzr tag https://example.com python
tzr search python web + news - old
tzr ls --tree
```
