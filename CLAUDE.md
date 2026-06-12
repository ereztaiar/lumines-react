# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn watch` — webpack-dev-server in dev mode, hot reload, history fallback (the primary "run the app" command).
- `yarn build` — webpack production build.
- `yarn test` — Jest. Run a single test file: `yarn jest src/util/swap.left.test.js`. Test files live alongside the code they cover (`src/util/*.test.js`).
- `yarn storybook` — Storybook on port 6006. Stories live in `src/stories/`.

There is no lint or typecheck step configured.

## Before you code

**Always use EnterPlanMode to design your approach before implementing non-trivial changes.** Planning helps catch architectural issues and prevents wasted effort. For simple fixes (typos, single-line changes), you can proceed directly. For anything involving multiple files, new features, refactors, or state changes, plan first and get alignment before writing code.

## Architecture

React 17 / Webpack 5 Lumines game, Yarn workspaces monorepo. App shell in `src/`; game logic in `packages/@lumines/`:

- `core` — input handling + hooks (`useKey`, `useClock`, `useTimer`, `useSkin`). Exports `Keys` provider and `KEYS`/`CODES`.
- `game-router` — screen state machine (splash → menu → game).
- `menu`, `splash`, `game-components` — respective screens.

**Imports**: Both root-level (`@lumines/core`) and deep paths (`@lumines/game-router/src/context/routerContext`) work intentionally. Lazy-loaded screens use deep imports to avoid blocking splash.

**Provider stack** (`App.jsx`):
```
<Keys> → <RouterProvider> → <Menu> → <Router />
```
Screens subscribe to `useKeys()` and react in `useEffect([key])` — no central dispatcher. Key bindings dispatch from the provider owning the relevant state, not leaf components.

**Game loop** (`GameView.jsx`): ~35ms tick-driven via `useTimer`. Grid cells are single-character strings — see block types below. Per tick at `tick % 10 === 0`: drop cube, run `prepareForDeletion()` (swiper sweeps left-to-right), `commitColumnAsSweeping(grid, col)`, `clearSweptColumn(grid, prevCol, cube)`. At `tick === 1`: `revertUncommittedMarks()` reverts any unswept DELETION/RECURSIVE marks. At `dropCount === MAX_TICK / 2`: spawn new cube. Cube ops in `src/util/swap.js` mutate grid and return `dest` descriptor; callers must update both `setGrid()` and `setCurrentCube()`. `moveDown` resolves `OUT_OF_BOUNDS` when landed.

**Block types** (`packages/@lumines/game-components/src/components/Board/block-types.js`):

| Value | Constant | Meaning |
|-------|----------|---------|
| `'\|'` | `EMPTY` | Empty cell |
| `'A'` | `TYPE_A` | Color A block |
| `'B'` | `TYPE_B` | Color B block |
| `'@'` | `TYPE_A_SPECIAL` | Special color A — flood-fills neighbors when in a 2×2 |
| `'%'` | `TYPE_B_SPECIAL` | Special color B |
| `'a'` | `DELETION_TYPE_A` | Color A corner of matched 2×2 — orange glow, tentative |
| `'b'` | `DELETION_TYPE_B` | Color B corner of matched 2×2 — tentative |
| `'*'` | `DELETION_TYPE_A_SPECIAL` | Special A corner of matched 2×2 — tentative |
| `'~'` | `DELETION_TYPE_B_SPECIAL` | Special B corner of matched 2×2 — tentative |
| `'X'` | `RECURSIVE_TYPE_A` | Color A reached by flood fill — 0.5 opacity, tentative |
| `'x'` | `RECURSIVE_TYPE_B` | Color B reached by flood fill — 0.5 opacity, tentative |
| `'+'` | `RECURSIVE_TYPE_A_SPECIAL` | Special A reached by flood fill — tentative |
| `'='` | `RECURSIVE_TYPE_B_SPECIAL` | Special B reached by flood fill — tentative |
| `'S'` | `SWEEPING_TYPE_A` | Color A committed by swiper — 0.45 opacity, NOT reverted |
| `'s'` | `SWEEPING_TYPE_B` | Color B committed by swiper |
| `'#'` | `SWEEPING_TYPE_A_SPECIAL` | Special A committed by swiper |
| `'$'` | `SWEEPING_TYPE_B_SPECIAL` | Special B committed by swiper |

`'A'` and `'@'` are the same color (A); `'B'` and `'%'` are the same color (B). DELETION and RECURSIVE marks are tentative — `revertUncommittedMarks` clears them each tick. SWEEPING marks are committed and persist until `clearSweptColumn` removes them. When a 2×2 contains a special block, `prepareForDeletion` BFS flood-fills connected same-color blocks into RECURSIVE state; DELETION/RECURSIVE are both promoted to SWEEPING by `commitColumnAsSweeping`.

**Skins**: registry at `src/skins/index.js` exports `SKINS` (`{id, label, module}`), `SKIN_IDS`, `SKINS_BY_ID` — the single source of truth; register new skins there. Skin folders export `BackgroundComponent` + `.less` styles + SVG paths. `useSkin` (`core/src/hooks/useSkin.js`) reads `skinSettings`/`skinUnlocks` from localStorage once per game mount (menu and game never coexist) and builds a playlist via the pure `skinRotation.js`: mode `sequence` (all skins in order — the unlock path; a skin unlocks permanently when it appears in play), `single` (fixed `selectedSkinId`), or `shuffle` (random among `enabledSkinIds`; stored `[]` = all unlocked). Advances on `s` key or every 100 score. The SKIN menu panel (`menu/.../content/SkinContent.jsx` + pure reducer `skinPanel.js`) edits these settings; utils in `src/util/skinSettings.js` / `skinUnlocks.js` take an injectable storage param for node-env tests.

**Webpack aliases** (`webpack.config.js`): `Assets`, `Components`, `Hooks`, `Skins`, `Styles`, `Util` all rooted at `src/`. **Jest ignores aliases** — tests use relative imports. CSS modules via `import { default as Classes } from 'Skins/common.less'`.

### Component conventions

Components should receive `props` as a single parameter and destructure it on the next line:

```jsx
const MyComponent = (props) => {
  const { prop1, prop2, prop3 } = props;
  // ... rest of component
};
```

This pattern keeps the function signature clean and makes it explicit which props a component uses. Pair destructuring with context hooks like `useGame()` for accessing shared state:

```jsx
const GameContent = (props) => {
  const { reflection, scoreStyle, gridStyle } = props;
  const { grid, currentCube, pause } = useGame();
  // ...
};
```
