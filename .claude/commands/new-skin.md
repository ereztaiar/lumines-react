Create a new Lumines skin. Arguments (optional): `$ARGUMENTS` — e.g. `sunset` or `sunset --colors "orange, red, yellow"`.

## Your job

You are creating a new visual skin for this React Lumines game. A skin controls the background, block colors, grid, score panel, swiper line, dispenser animation, and character emoji. Follow the steps below exactly.

---

## Step 1 — Gather requirements

If the skin name and color palette were not supplied in the arguments, ask the user for:
1. **Skin name** (slug, e.g. `sunset`, `forest`, `deep-sea`) — this becomes the folder name and import key.
2. **Color palette** — two main block colors (A and B), background mood, accent/highlight colors.

If a reference image URL was provided, fetch it with WebFetch, read the saved image file with Read, and use the visual as a template for the background icon composition.

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
| `accent1..N` | Additional neon/highlight colors for background icons. |

**Brightness floor**: `bgBase` and `bgGradient` must NOT be near-black (avoid hex
lightness below ~20%, e.g. `#0d0517`, `#021024`, `#04001a`). Even for "dark mood"
themes (horror, space, night), use deep *saturated* mid-tones — see `tropical`'s
gradient (`#ff8c42`, `#ff4f7b`, `#00a6a6`) as the brightness bar. A near-black
gradient combined with a translucent dark `gridCell` makes the whole board murky
and hard to watch. Same floor applies to `gridCell`'s rgba base color.

Then choose the react-icons that drive the visuals (browse https://react-icons.github.io/react-icons — the package is already installed, v4.3.1):

| Role | Description |
|------|-------------|
| `iconA` | react-icons component for block A (normal + placed). Bold, filled silhouette that reads clearly at ~30px — `Gi`/`Fa` families work best. |
| `iconB` | react-icons component for block B. A distinct silhouette from `iconA` (e.g. `GiCrystalShine` vs `GiFlame`). |
| `iconASpecial` | Icon marking special A blocks — a different icon, or `iconA` in a brighter glow color. |
| `iconBSpecial` | Icon marking special B blocks. |
| `sceneIcons` | 3–8 react-icons composing the background scene (moon, trees, stars, waves, …), colored from `accent1..N`. |

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
    └── index.jsx
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

### Block icons — `src/skins/<name>/paths/index.jsx`

Blocks are react-icons rendered to SVG data-URI strings. The file must be named `index.jsx` (it contains JSX); webpack resolves `Skins/<name>/paths` to it automatically.

```jsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiCrystalShine, GiFlame } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiCrystalShine color="<iconA color>" />);
const aBlockSpecial = toDataUri(<GiCrystalShine color="<iconASpecial glow color>" />); // or a distinct icon
const bBlock        = toDataUri(<GiFlame color="<iconB color>" />);
const bBlockSpecial = toDataUri(<GiFlame color="<iconBSpecial glow color>" />);
const darkA         = toDataUri(<GiCrystalShine color="<darkA>" />);
const darkB         = toDataUri(<GiFlame color="<darkB>" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
```

**Rules — do not deviate:**

- The six export names and the fact that they are **plain strings** are a hard contract: `Grid.jsx` and `Dispenser.jsx` inject them as raw HTML `<img src="${paths.aBlock}"/>`. Never export React components or elements from this file.
- The grid paints a solid `colorA`/`colorB` face behind the icon (the `:before` background in `grid.less`), so pick icon colors that **contrast with the block face** — near-white or a much darker shade. An icon the same color as the face is invisible.
- Special blocks must be visually distinct: a different icon, or the same icon in a clearly brighter glow color.
- `darkA`/`darkB` reuse the normal icons with the dim/desaturated placed-block colors.

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
    // both stops mid-tone/saturated, not near-black — see brightness floor above
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

/* Icon scene layer — holds all background react-icons */
.scene {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  overflow: hidden;

  svg { position: absolute; }
}

/* Soft neon glow for any icon — uses the icon's own color */
.glow {
  filter: drop-shadow(0 0 6px currentColor);
}

/* Per-skin animation variants, each with @keyframes inside the class */
.floatSlow {
  @keyframes floatSlow<Name> { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  -webkit-animation: floatSlow<Name> 6s ease-in-out infinite;
  animation: floatSlow<Name> 6s ease-in-out infinite;
}

.pulse {
  @keyframes pulse<Name> { 0%,100%{opacity:1} 50%{opacity:0.35} }
  -webkit-animation: pulse<Name> 3.5s ease-in-out infinite;
  animation: pulse<Name> 3.5s ease-in-out infinite;
}

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

.driftSlow {
  @keyframes driftSlow<Name> { 0%,100%{transform:translate(0,0)} 50%{transform:translate(14px,10px)} }
  -webkit-animation: driftSlow<Name> 9s ease-in-out infinite;
  animation: driftSlow<Name> 9s ease-in-out infinite;
}
```

---

### `src/skins/<name>/Background.jsx`

The background is a **composition of react-icons components** layered over the CSS gradient — no hand-drawn inline SVG. Import the chosen `sceneIcons` from `react-icons` and position them absolutely inside the `.scene` layer. Guidelines:

- Position, size, color, and opacity go in inline `style` (`left`/`top`/`bottom` in %, `fontSize` in rem, `color` from the palette roles). `.scene svg { position: absolute }` is already set in the CSS, so don't repeat it.
- **Animations are CSS-module classes only** (`className={BackgroundStyle.floatSlow}` etc.). Never animate via inline `style` — those won't scope or loop.
- Repeated elements (stars, snow, birds, bubbles) come from data arrays + `.map()`, varying position/size/opacity per item.
- Create depth with scale and opacity: small + dim = far away, large + saturated = foreground. Paint order = JSX order (later elements render on top).
- Glow comes from the `.glow` class (`drop-shadow` of the icon's own color) — no SVG filter defs needed.
- Aim for a composed scene, not confetti: one focal icon (moon, sun, planet), a ground/horizon band of larger icons along the bottom edge, and one or two ambient particle layers.

```jsx
import React from 'react';
import {background as BackgroundStyle} from "Skins/<name>";
import { WiMoonAltWaningCrescent } from 'react-icons/wi';
import { GiPineTree } from 'react-icons/gi';
import { FaRegSnowflake } from 'react-icons/fa';

const snowflakes = [
    { left: '8%',  top: '12%', size: '1.4rem', opacity: 0.8 },
    { left: '22%', top: '30%', size: '0.9rem', opacity: 0.5 },
    /* ... 10–20 entries spread across the viewport */
];

const trees = [
    { left: '2%',  size: '9rem', color: '<accent2>' },
    { left: '12%', size: '6rem', color: '<accent2, dimmer>' },
    /* ... a horizon band along the bottom edge */
];

const Background = () => (
    <div className={BackgroundStyle.background}>
        <div className={BackgroundStyle.scene}>
            <WiMoonAltWaningCrescent
                className={`${BackgroundStyle.glow} ${BackgroundStyle.pulse}`}
                style={{ top: '6%', right: '10%', fontSize: '7rem', color: '<accent1>' }}
            />
            {trees.map((t, i) => (
                <GiPineTree key={`tree-${i}`}
                            style={{ left: t.left, bottom: 0, fontSize: t.size, color: t.color }} />
            ))}
            {snowflakes.map((s, i) => (
                <FaRegSnowflake key={`snow-${i}`}
                                className={i % 2 ? BackgroundStyle.driftSlow : BackgroundStyle.floatSlow}
                                style={{ left: s.left, top: s.top, fontSize: s.size, opacity: s.opacity, color: '<accent3>' }} />
            ))}
        </div>
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
- Confirm blocks in the **grid and dispenser** show the chosen icons. If a block tile is blank, the data-URI failed — check `renderToStaticMarkup` output, the `encodeURIComponent` wrapping, and that the icon color contrasts with the block face painted by `grid.less`.
- Confirm background icons are positioned and colored per the palette, and that the scene never intercepts clicks (`pointer-events: none` on `.scene`).
- Check that **animations actually loop** — if they stop, the `@keyframes` placement or CSS Modules scoping is broken (see the `background.less` rule above), or an animation was set via inline `style` instead of a class.
