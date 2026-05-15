Create a new Lumines skin. Arguments (optional): `$ARGUMENTS` — e.g. `sunset` or `sunset --colors "orange, red, yellow"`.

## Your job

You are creating a new visual skin for this React Lumines game. A skin controls the background, block colors, grid, score panel, swiper line, dispenser animation, and character emoji. Follow the steps below exactly.

---

## Step 1 — Gather requirements

If the skin name and color palette were not supplied in the arguments, ask the user for:
1. **Skin name** (slug, e.g. `sunset`, `forest`, `deep-sea`) — this becomes the folder name and import key.
2. **Color palette** — two main block colors (A and B), background mood, accent/highlight colors.

If a reference image URL was provided, fetch it with WebFetch, read the saved image file with Read, and use the visual as a template for the SVG background.

---

## Step 2 — Plan the palette

Define these roles before writing any file:

| Role | Description |
|------|-------------|
| `colorA` | Block type A (normal + special). Bright, saturated. |
| `colorB` | Block type B (normal + special). Contrasting hue. |
| `darkA` | Placed block A. Darker/desaturated version of A. |
| `darkB` | Placed block B. Darker/desaturated version of B. |
| `bgBase` | Background base color (dark). |
| `bgGradient` | Secondary gradient stop. |
| `gridLine` | Grid cell border color. |
| `gridCell` | Grid cell background (translucent). |
| `characterColor` | Character emoji color. |
| `swiperColor` | Swiper line color (usually matches colorA or colorB). |
| `accent1..N` | Additional neon/highlight colors for windows, signs, aurora. |

---

## Step 3 — Create all files

### Folder structure

```
src/skins/<name>/
├── index.js
├── Background.jsx
├── background.less
├── grid.less
├── character.less
├── dispenser.less
├── score.less
├── swiper.less
└── paths/
    ├── index.js
    ├── a-block.svg
    ├── a-special-block.svg
    ├── b-block.svg
    ├── b-special-block.svg
    ├── dark-a.svg
    └── dark-b.svg
```

---

### `src/skins/<name>/index.js`

```js
import {default as background}        from 'Skins/<name>/background.less';
import {default as character}          from 'Skins/<name>/character.less';
import {default as dispenser}          from 'Skins/<name>/dispenser.less';
import {default as grid}               from 'Skins/<name>/grid.less';
import {default as score}              from 'Skins/<name>/score.less';
import {default as swiper}             from 'Skins/<name>/swiper.less';
import {default as BackgroundComponent} from 'Skins/<name>/Background.jsx';
import * as paths                      from 'Skins/<name>/paths';
import {default as reflection}         from 'Skins/reflection.less';

export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent }
```

---

### `src/skins/<name>/paths/index.js`

```js
import aBlock        from './a-block.svg';
import aBlockSpecial from './a-special-block.svg';
import bBlock        from './b-block.svg';
import bBlockSpecial from './b-special-block.svg';
import darkA         from './dark-a.svg';
import darkB         from './dark-b.svg';

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
```

---

### SVG blocks — `paths/*.svg`

All blocks use a 30×30 viewBox with a 6-path isometric structure (same geometry as `src/skins/default/paths/grey-block.svg`). Adapt fills to the skin palette:

- **a-block.svg** / **b-block.svg** — bright, saturated face colors.
- **a-special-block.svg** / **b-special-block.svg** — same as normal but add a centered `<rect x="8" y="11" width="14" height="8" rx="2" fill="<glow color>" opacity="0.55"/>` inner marker.
- **dark-a.svg** / **dark-b.svg** — use `rx="0"` (no rounded corners) and dim, flat face colors. These represent placed/settled blocks.

Copy the path geometry from `src/skins/default/paths/grey-block.svg` and swap fills only.

---

### `src/skins/<name>/grid.less`

```less
@import "Skins/common.less";

.board {
  grid-column-start: 2; grid-row-start: 2; grid-row-end: 2;
  align-self: start;
  width: @center-width;
  max-width: @grid-item-width-max * @grid-columns;
  position: relative; margin: 0 auto; grid-area: grid;
}

.grid {
  position: relative;

  .row0, .row1 {
    .gridItem { border: 0; background: none; &:first-child { border-left: 0; } }
  }
  .row1 { border-bottom: 1px solid <gridLine>; }

  each(range(0, @grid-rows, 1), { .row@{value} { height: @grid-item-height; } });

  .gridItem {
    width: @grid-item-width; height: @grid-item-height;
    max-width: @grid-item-width-max; max-height: @grid-item-height-max;
    float: left; line-height: @grid-item-height; text-align: center;
    border-bottom: 1px solid <gridLine>; border-right: 1px solid <gridLine>;
    position: relative; background: <gridCell>;
    &:first-child { border-left: 1px solid <gridLine>; }

    &:after  { width: 75%; height: 75%; display: block; position: absolute; top: 8%; left: 8%; }
    &:before { width: 90%; height: 90%; display: block; content: ' '; position: absolute;
               top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); border-radius: 3px; }

    &.ready {
      &:before { border-radius: 0; width: 100%; height: 100%; }
      &.large:after {
        width: @grid-item-width*2; height: @grid-item-height*2;
        position: absolute; top: ~"calc(-100% - 2px)"; left: -2px;
        border: 2px solid <colorA>;
      }
    }

    /* colorA blocks (class name "grey" in game logic) */
    &.grey {
      &:after  { content: ''; border-top: 1px solid <colorA-light>; border-left: 1px solid <colorA-light>; }
      &:before { background: <colorA>; }
    }

    /* colorB blocks (class name "orange" in game logic) */
    &.orange {
      &:after  { content: ''; border-top: 1px solid <colorB-light>; border-left: 1px solid <colorB-light>; }
      &:before { background: <colorB>; }
    }

    /* placed colorA */
    &.darkGrey {
      border-bottom: 1px solid <darkA>; border-right: 1px solid <darkA>;
      &:after  { content: ''; border-top: 0; border-left: 0; }
      &:before { background: <darkA>; border-radius: 0; width: 100%; height: 100%;
                 left: 0; top: 0; transform: none; }
    }

    /* placed colorB */
    &.darkOrange {
      border-bottom: 1px solid <darkB>; border-right: 1px solid <darkB>;
      &:after  { content: ''; border-top: 0; border-left: 0; }
      &:before { background: <darkB>; border-radius: 0; width: 100%; height: 100%;
                 left: 0; top: 0; transform: none; }
    }

    &.ghostBlock {
      background: rgba(255,255,255,0.05);
      &:before { background: rgba(255,255,255,0.08); border: 2px dashed rgba(255,255,255,0.4); border-radius: 3px; }
    }

    img { width: 100%; }
  }
}
```

---

### `src/skins/<name>/character.less`

Use the skin's character color and make the animation transition between it and one accent color.

```less
.character {
  grid-column-start: 1; grid-row-start: 3; align-self: end;
  text-align: center; font-size: 4.2rem; color: <characterColor>;
  border-radius: 50%; width: 50%; margin: 0 auto; position: relative;

  @keyframes moveCharacter<Name> {
    0%   { -webkit-transform: scale(0.8) rotate(0deg);   color: <characterColor>; }
    25%  { -webkit-transform: scale(1)   rotate(25deg);  }
    50%  { -webkit-transform: scale(0.9) rotate(360deg); color: <accent1>; }
    75%  { -webkit-transform: scale(1)   rotate(-25deg); }
    100% { -webkit-transform: scale(0.8) rotate(0deg);   color: <characterColor>; }
  }
  img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; transform: scale(3.5); }
  svg { -webkit-animation: moveCharacter<Name> 3s ease-in-out infinite;
        animation: moveCharacter<Name> 3s ease-in-out infinite; }
}
```

---

### `src/skins/<name>/dispenser.less`

Replace `rgba(0, 166, 251, ...)` from the default with `colorA` and `colorB`:

```less
@import "Skins/common.less";

.dispenser {
  width: @grid-item-width * 2; grid-column-start: 1; grid-row-start: 2;
  margin: 0 auto; align-self: start;

  .cube {
    margin-bottom: @grid-item-height; position: relative;
    &:after { clear: both; content: ''; display: block; }

    @keyframes dispenser<Name> {
      from { -webkit-transform: rotate(0deg); top: ~"calc(-310% - 2px)"; left: ~"calc(-310% - 2px)";
             width: ~"calc(600%)"; height: ~"calc(600%)"; border: 2px solid <colorA at 50% opacity>; }
      to   { -webkit-transform: rotate(360deg); top: ~"calc(-10% - 2px)"; left: ~"calc(-10% - 2px)";
             width: ~"calc(120%)"; height: ~"calc(120%)"; border: 2px solid <colorB>; }
    }

    &:before {
      border: 2px solid <colorA at 50% opacity>;
      position: absolute; content: ' '; display: block;
      top: ~"calc(-10% - 2px)"; left: ~"calc(-10% - 2px)";
      width: ~"calc(120%)"; height: ~"calc(120%)";
      -webkit-animation: dispenser<Name> 1.2s ease infinite;
      animation: dispenser<Name> 1.2s ease infinite;
    }

    .grid-item { border: 0; img { width: 100%; } &:first-child { border: 0; } }
  }
}
```

---

### `src/skins/<name>/score.less`

```less
#score {
  grid-column-start: 3; grid-row-start: 2; grid-row-end: 3;
  align-self: start; border-left: 1px solid <gridLine>;
  width: 50%; margin: 0 auto; display: flex; flex-direction: column;

  .data {
    height: 20%;
    .title { background: <colorA at ~20% opacity>; padding: 5px; opacity: 80%; color: <colorA>; }
    .info  { text-align: right; color: <colorB>; font-size: 1.5rem; padding: 0 5px; }
  }
}
```

---

### `src/skins/<name>/swiper.less`

```less
@import "Skins/common.less";

#swiper {
  position: absolute; bottom: 0; left: 0;
  height: ((@grid-rows - @ready-board-grid-rows) * @grid-item-height) + 2px;
  border-right: 2px solid <swiperColor>;
  background: linear-gradient(90deg, <swiperColor at 0%> 0%, <swiperColor at 35%> 100%);
  width: 0;

  .deleted {
    position: absolute; top: -25px; right: -2px; height: 25px; width: 50px;
    border: 2px solid <swiperColor>; padding-right: 15px;
    .score { color: <swiperColor>; text-align: right; }
    #arrow { position: absolute; right: -15px; top: 50%; transform: translateY(-50%); }
  }
}
```

---

### `src/skins/<name>/background.less`

**Critical animation rule**: define `@keyframes` *inside* the class that uses them — never at the top level. This ensures CSS Modules can scope the name correctly. Always include both `animation:` and `-webkit-animation:`.

```less
.background {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  transform: scale(1.5);

  &:before, &:after { position: absolute; top: 0; left: 0; width: 100%; height: 100%; content: ''; display: block; }

  &:before {
    background: linear-gradient(135deg, <bgBase> 0%, <bgGradient> 50%, <bgBase> 100%);
    background-size: 400% 400%;
    z-index: -20;

    @keyframes BgMove<Name> {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 51%; }
      100% { background-position: 0% 50%; }
    }
    -webkit-animation: BgMove<Name> 10s ease infinite;
    animation: BgMove<Name> 10s ease infinite;
  }

  &:after {
    z-index: -10;
    background: url('../../assets/images/scan-mask.png') repeat;
    opacity: 0.3;
  }
}

.cityscape {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
}

/* Add per-skin blink variants here, each with @keyframes inside */
.blinkSlow {
  @keyframes blinkSlow<Name> { 0%,44%,56%,100%{opacity:1} 50%{opacity:0.08} }
  -webkit-animation: blinkSlow<Name> 4.2s ease-in-out infinite;
  animation: blinkSlow<Name> 4.2s ease-in-out infinite;
}

.blinkFast {
  @keyframes blinkFast<Name> { 0%,82%,96%,100%{opacity:1} 89%{opacity:0.05} }
  -webkit-animation: blinkFast<Name> 2.8s ease-in-out infinite;
  animation: blinkFast<Name> 2.8s ease-in-out infinite;
}
```

---

### `src/skins/<name>/Background.jsx`

Import the CSS module and render a `<div>` with an inline SVG cityscape. Guidelines:

- `viewBox="0 0 1200 700"` with `preserveAspectRatio="xMidYMax slice"`.
- Add SVG `<defs>` with `<filter>` elements for each neon color glow (use `feGaussianBlur` + `feMerge`). Prefix all filter IDs with the skin slug to avoid global collisions (e.g. `id="ss-gc"` for "sunset-cyan").
- Add `<linearGradient>` and `<radialGradient>` elements for sky, ground, road, reflections, and aurora.
- Use `className={BackgroundStyle.blinkSlow}` etc. for animated SVG elements. Never use inline `style` for animations — they won't loop.
- Sky: a dark gradient rect covering y=0–450. Add atmospheric `<ellipse>` aurora bands using `<filter id="…"><feGaussianBlur stdDeviation="20"/></filter>` for large soft glow.
- Buildings: dark `<rect>` silhouettes on left and right sides, rising above y=450.
- Windows: `<rect>` groups per color, each `<g>` with `filter="url(#...)"` for glow.
- Ground: three `<polygon>` shapes for sidewalk-left, road-center, sidewalk-right, converging to a vanishing point at `(600, 450)`.
- Perspective railway tracks: two converging lines + perspective-spaced horizontal ties via a data array + `.map()`.
- Wet reflections: `<polygon>` shapes filled with `url(#gradient)` for each color, elongated toward the vanishing point.
- Tram or light source at the vanishing point.

```jsx
import React from 'react';
import {background as BackgroundStyle} from "Skins/<name>";

const Background = () => (
    <div className={BackgroundStyle.background}>
        <svg className={BackgroundStyle.cityscape}
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 1200 700"
             preserveAspectRatio="xMidYMax slice">
            <defs>
                {/* filters, gradients */}
            </defs>
            {/* sky, aurora, stars, buildings, windows, ground, tracks, reflections, tram, streetlights, rain */}
        </svg>
    </div>
);

export default Background;
```

---

## Step 4 — Register the skin

Edit `packages/@lumines/core/src/hooks/useSkin.js`:

```js
import * as <camelName> from 'Skins/<name>';
// add to skins array:
const skins = [ defaultSkin, purple, yellow, /* existing */, <camelName> ];
```

---

## Step 5 — Verify

After creating all files, tell the user:
- Run `yarn watch` and open the game.
- Press **S** until the new skin is active (it will be the last in the cycle).
- Confirm background renders, block colors match, animations loop, swiper line and score panel use the new colors.
- Check that **blink animations actually loop** — if they stop, the `@keyframes` placement or CSS Modules scoping is broken (see the `background.less` rule above).
