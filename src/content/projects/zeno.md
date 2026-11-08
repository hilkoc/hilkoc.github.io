---
title: Zeno
tagline: A real-time fractal explorer where the zoom never bottoms out.
repo: https://github.com/hilkoc/zeno
liveUrl: https://hilkoc.github.io/zeno/
tech: [WebGL, GLSL, JavaScript, Vite]
status: live
order: 1
accent: '#a78bfa'
embed: iframe
---

Zeno is named for the paradox: the zoom never bottoms out, it only asks for more precision.
Every fractal, including the ones you type in yourself, is compiled to a GPU shader. It
renders with progressive supersampling, distance-estimated shading and emulated double
precision for deep zooms.

## What it does

- **Continuous zoom slider.** The centre is a hard stop. Left zooms out, right zooms in,
  and the rate rises quadratically to 2.6 e-folds per second at either end.
- **Nine built-in fractals:** Mandelbrot, Julia, Burning Ship, Tricorn, Multibrot, Celtic,
  Cosine Julia, Newton (z³ − 1) and the Collatz / 3n+1 map.
- **Custom formulas.** Type the right-hand side of z<sub>n+1</sub> = f(z, c). `z**2 + c`
  is the Mandelbrot iteration.
- **Deep zoom to about 10¹²** using double-single arithmetic. It switches on automatically
  when a pixel approaches the float32 step size.
- Four colouring modes, ten palettes, relief shading, bloom, screenshots, and shareable
  URLs that carry the full view state.

## Formula language

| | |
|---|---|
| Operators | `+ - * / ** ^`, unary `-`, implicit products (`2z`, `3(z + c)`) |
| Names | `z` `c` `n` (iteration index) `i` `pi` `tau` `e` `phi` |
| Functions | `abs conj re im len norm sqrt exp log sin cos tan sinh cosh tanh pow` |
