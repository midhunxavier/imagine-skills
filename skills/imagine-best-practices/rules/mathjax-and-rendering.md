# MathJax + rendering notes

## Rendering pipeline expectations

Imagine’s renderer waits for the Studio render route to signal readiness (`window.__IMAGINE_READY__`) and also waits for pending math tasks to complete.

If your equation is missing in exports:
- ensure MathJax is reachable (CDN by default)
- ensure your component uses `MathSvg` (tex2svg) rather than HTML math

## MathJax URL override

If you need to pin or self-host MathJax, set `VITE_MATHJAX_URL` in the Imagine environment.
