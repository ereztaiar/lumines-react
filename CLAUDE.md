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

**Game loop** (`GameView.jsx`): ~35ms tick-driven via `useTimer`. Grid cells are integers (`0` empty, `1`/`2` colors, `3`/`4` special, `5`/`6` pending deletion). Per tick at `tick % 10 === 0`: drop cube, run `prepareForDeletion()` (swiper sweeps left-to-right). At `dropCount === MAX_TICK / 2`: spawn new cube. Cube ops in `src/util/swap.js` mutate grid and return `dest` descriptor; callers must update both `setGrid()` and `setCurrentCube()`. `moveDown` resolves `OUT_OF_BOUNDS` when landed.

**Skins** (`core/src/hooks/useSkin.js`): Cycles `default`, `purple`, `yellow` (via `Skins` alias). Folders export `BackgroundComponent` + `.less` styles + SVG paths. Auto-rotates on score changes or `s` key.

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
