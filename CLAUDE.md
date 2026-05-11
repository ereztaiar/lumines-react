# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn watch` — webpack-dev-server in dev mode, hot reload, history fallback (the primary "run the app" command).
- `yarn build` — webpack production build.
- `yarn test` — Jest. Run a single test file: `yarn jest src/util/swap.left.test.js`. Test files live alongside the code they cover (`src/util/*.test.js`).
- `yarn storybook` — Storybook on port 6006. Stories live in `src/stories/`.

There is no lint or typecheck step configured.

## Architecture

This is a React 17 / Webpack 5 reimplementation of the puzzle game Lumines, organized as a Yarn workspaces monorepo.

### Workspace layout

The app shell lives in `src/` (entry `src/index.js` → `src/App.jsx`). Game logic is split across packages under `packages/@lumines/`:

- `core` — input handling (keyboard + gamepad via `react-gamepad`) and shared hooks (`useKey`, `useClock`, `useTimer`, `useSkin`). Exports the `Keys` provider and `KEYS`/`CODES` constants.
- `game-router` — top-level screen state machine (splash → menu → game).
- `menu` — menu screen + `useMenu` context.
- `splash` — splash screen.
- `game-components` — the actual game (Board, Dispenser, Game, Grid, Reflection, Score, Swiper, Character).

Cross-package imports use **two coexisting styles**: the package root (`import Keys from "@lumines/core"`) and deep paths (`import { useRouter } from "@lumines/game-router/src/context/routerContext"`). Both are intentional — every package's `package.json` exports map includes `"./": "./"` to allow the deep form. Lazy-loaded screens (`Menu`, `Game` in `Router.jsx`) use deep imports so that splash isn't blocked by their bundles.

Note: `package.json` workspaces lists `packages/@lumines/geme-components` (typo) but the actual folder is `game-components`. The `dependencies` block uses the correct `link:packages/@lumines/game-components`, so resolution works — don't "fix" the typo without checking that nothing depends on the broken glob silently excluding the package from workspace hoisting.

### Provider stack

`App.jsx` wires the context tree top-down:

```
<Keys>                     // window keydown/up + gamepad → {key, which} via useReducer
  <RouterProvider>         // screen state {isSplash, isMenu, isGame}
    <Menu>                 // menu state (item order, selected, locked)
      <Router />           // renders Splash | Menu | Game based on RouterProvider state
```

State machines downstream subscribe to `useKeys()` and react in `useEffect([key])` — there is no central dispatcher. For example, `RouterProvider` advances splash→menu when `key === KEYS.SPACE`; `Menu` translates arrow keys into `menu_up`/`menu_down`. When adding new key bindings, dispatch from the provider that owns the relevant state, not from a leaf component.

### Game loop (`game-components/src/components/Game/GameView.jsx`)

The game is tick-driven via `useTimer` at ~35ms cadence. Per tick:

- `tick % 10 === 0` → drop the active cube one row, then `prepareForDeletion(grid)` and `clearColumn(grid, tick/10)`. This is the **swiper** — it sweeps left-to-right one column per tick interval.
- `dropCount === MAX_TICK / 2` → start dropping a new cube.

Grid cells are integers, not objects: `0` empty, `1`/`2` are the two block colors (skins map these to visuals), `3`/`4` are special blocks, `5`/`6` mark cells "ready for deletion" (preserve the color via `5↔1`, `6↔2` mapping in `clearFromDeletion`). The Lumines core mechanic — 2×2 squares of one color get cleared by the swiper — is implemented in `src/util/clear-blocks.js::prepareForDeletion`.

Cube manipulation (`src/util/swap.js`) is Promise-based and operates on four named corners (`topLeft`, `topRight`, `bottomLeft`, `bottomRight`). Each operation mutates the grid array in place AND resolves with a fresh `dest` cube descriptor — callers must update both via `setGrid([...updatedGrid])` and `setCurrentCube({ ...dest })`. `moveDown` can resolve with a third `OUT_OF_BOUNDS` value indicating the cube has landed; this is the signal to dispense a new one.

### Skins

`useSkin` (in `core/src/hooks/useSkin.js`) cycles through `Skins/default`, `Skins/purple`, `Skins/yellow` (resolved via the `Skins` webpack alias to `src/skins/`). Each skin is a folder exporting `BackgroundComponent` plus per-component `.less` style modules and SVG `paths`. The skin auto-rotates on score changes and on the `s` key.

### Webpack aliases

Defined in `webpack.config.js` and used throughout source: `Assets`, `Components`, `Hooks`, `Skins`, `Styles`, `Util` (all rooted at `src/`). **Jest does not know about these aliases** — tests must use relative imports. Existing tests in `src/util/` only import sibling files, so this hasn't surfaced yet; if you add a test that needs a skin or asset, configure `moduleNameMapper` in the Jest config first.

### CSS modules

`css-loader` is configured with `modules: { localIdentName: '[name]_[local]_[hash:base64:5]' }` for both `.css` and `.less`. Import as `import { default as Classes } from 'Skins/common.less'` and use `Classes.someName`.

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

### Filename quirks

- `packages/@lumines/splash/src/components/Splash/Spalsh.jsx` — the file is misspelled. `index.js` imports from `./Splash.jsx` but the package root re-exports from `./Spalsh` (case/spelling matters on Linux). If you rename, update both `Splash/index.js` and `splash/index.js`.
- Folder name `Charecter/` (not Character) under `game-components`.
