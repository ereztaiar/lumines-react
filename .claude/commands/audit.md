Audit the codebase for bugs, dead code, and lazy-loading opportunities; write findings to issues.md. Arguments (optional): `$ARGUMENTS` — e.g. `bundle` to focus only on bundle-size/lazy-loading, or `lint` to focus only on lint/dead-code.

## Your job

You are doing a code-quality and performance sweep of this repo and recording what you find in `issues.md` at the repo root. This is a research task, not an implementation task — do not fix anything unless the user explicitly asks afterward. Findings should be concrete and falsifiable (file:line, a reproduced lint warning, a measured chunk size) — not vague impressions.

If `$ARGUMENTS` names a focus area (`bundle`, `lint`, `dead-code`), only run that section. Otherwise run all of them.

---

## Step 1 — Lint and tests baseline

Run `yarn lint` and `yarn test`. Note:
- Every warning/error, grouped by category (`no-unused-vars`, `react-hooks/exhaustive-deps`, etc).
- Any failing tests.

For each `react-hooks/exhaustive-deps` warning, don't just list it — spend a moment judging real risk:
- Is the missing dependency a value that can actually change between when the effect last ran and when it's read (a real stale-closure bug), or is it a stable ref/setter/one-time-state-value (false positive)?
- This project has a history of real stale-closure bugs around `gridRef`/anchor-cube timing in the game loop (see `useGameLoop.js`, `useCubeState.js`) — give effects in that area extra scrutiny.
- Effects that re-run on every keypress already (most menu/game key handlers, keyed on `[key]`) get a fresh closure on the next relevant event anyway — note these as low-risk rather than omitting them.

## Step 2 — Dead code

Grep for unused imports/vars (the lint output from Step 1 already surfaces most of these — `no-unused-vars` with the `Allowed unused vars must match /^React$/u` message). For each one, open the file and confirm:
- It's genuinely unused in the component body (not used in a way ESLint can't see, e.g. via `eval` or dynamic property access).
- Note any case where a component imports something a sibling/parent file actually needs (e.g. a provider imported in the wrong file) — that's a sign of a misplaced responsibility, not just a stray import.

Also grep for `TODO`, `FIXME`, `HACK`, `XXX`, and stray `console.log`/`console.warn`/`console.error` calls not already gated behind `NODE_ENV !== 'production'`.

## Step 3 — Bundle size / lazy loading

Run `yarn build` and read the webpack output:
- Which chunks exceed the 244 KiB recommended size warning?
- `modules by path` breaks down where the bytes in each chunk come from — find the heaviest contributor(s).

For each oversized chunk, trace backwards to find what's pulling in the weight:
1. Find the module(s) responsible (e.g. a registry file with many static `import` statements where a dynamic `import()` per-item would do).
2. Grep for every place that registry/module is actually consumed (`grep -rn` for its exported names).
3. For each consumer, check what subset of the data it actually needs — full module, or just cheap metadata (id/label/string)? This is the key judgment call: splitting a "metadata vs. heavy payload" registry into an eager-metadata + lazy-payload pair is almost always safe when most consumers only read metadata.
4. Check whether the heavy payload is needed synchronously (rendered immediately, no loading state acceptable) or could tolerate an async load (behind a `React.lazy`/`Suspense`, or a state update once a dynamic `import()` resolves). Note any place that currently reads the payload synchronously off a plain object (e.g. `registry[id].module`) — that's exactly where introducing `import()` would require a refactor (state + effect, or a loading fallback), not a drop-in change.
5. Check whether any "asset" (image/audio/svg) is actually a real binary file bundled eagerly, vs. something generated at runtime (e.g. this project synthesizes sound via Web Audio oscillators — there are no `.wav`/`.mp3` files under `src/skins/`). Don't recommend lazy-loading something that isn't actually a static asset.

Write the chunk sizes and module breakdown you observed (not generic advice) — numbers from this run, not from memory of a previous run, since the codebase changes.

## Step 4 — Write issues.md

Structure the file as:
```
# Issues

Findings from a code audit on <today's date>. Not all of these need fixing — flagged for triage.

## Bugs / risk
...
## Dead code
...
## Bundle size / lazy loading
...
```

If `issues.md` already exists, read it first. Merge: keep entries that are still valid (re-verify file:line references still point at the same issue — code shifts), drop entries that have been fixed since, add new ones. Don't just append — a stale duplicate list is worse than no list. Note the audit date at the top either way.

Each finding should let a reader act without re-deriving your work: what/where, why it matters, and (for the bundle section especially) what a fix would concretely involve and what it would NOT solve (e.g. "saves first-load bytes, not total bytes over a long session").
