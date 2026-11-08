---
title: Grappy
tagline: Graphical Python. Wire values into functions on a canvas, run them on a real kernel.
repo: https://github.com/hilkoc/grappy
tech: [Electron, React, React Flow, Python, IPython]
status: active
order: 3
accent: '#38bdf8'
---

Grappy is an Electron app. You wire input values into Python functions on a node canvas
and run the result against a real IPython kernel.

## How it works

- The canvas is React + React Flow, built with `electron-vite`.
- A calculation node calls a function. That is either Python you write in CodeMirror, or a
  fully qualified name you import, such as `collections.Counter`.
- Input ports come from the function's own signature, as the kernel reports it.
- One function can back several calculation nodes. Edit it once and every node that uses
  it follows.
- A local Python process, the **bridge**, owns the kernel. It talks to the canvas over a
  WebSocket.
- Graphs are saved as JSON, laid out for small diffs in version control.
