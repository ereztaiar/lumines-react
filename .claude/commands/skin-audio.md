Add or redesign audio for a Lumines skin. Arguments: `$ARGUMENTS` — e.g. `notes` or `tropical --mood dark-mystery`.

## Your job

You are composing the `sounds` export for a Lumines skin so that every game action (move, rotate, drop, deletion) triggers a distinct musical chord, and a looping theme melody plays during gameplay. The four SFX chords must harmonise together — the player should hear a miniature musical phrase as they play.

The audio engine is `src/util/audioEngine.js` (Web Audio API, no npm dependency). Skins without `sounds` fall back to `DEFAULT_SOUNDS` (subtle C major chords). This skill writes or replaces only the `sounds` export in the target skin's `index.js`.

---

## Step 1 — Identify the target skin

If no skin name was given in `$ARGUMENTS`, ask:
1. **Which skin?** — slug matching a folder under `src/skins/` (e.g. `tropical`, `galaxy`).
2. **Mood / theme override?** — optional extra direction (e.g. "dark and tense", "bright and bouncy"). If not given, derive from the skin's visual palette.

Read the skin's `index.js` and one of its `.less` files to derive the colour palette and mood before choosing any musical key or oscillator type.

---

## Step 2 — Design the sound palette

### Choose an oscillator type

| Type | Character | Best for |
|------|-----------|----------|
| `'triangle'` | Soft, warm, piano-like | Default — works for almost any skin |
| `'sine'` | Pure tone, smooth | Underwater, sci-fi, minimal |
| `'square'` | Bright, buzzy, retro | Chiptune, neon, cyberpunk, retro |
| `'sawtooth'` | Harsh, aggressive | Horror, heavy metal, industrial |

A single `synth.type` applies to all SFX and the theme melody unless overridden.

### Choose a tonal centre and scale

Pick a root note and mode based on the skin's mood:

| Mood | Recommended key / mode | Notes |
|------|------------------------|-------|
| Bright, happy | C major, G major | Use 4th, 5th, maj7 chords |
| Mysterious, tense | A minor, D minor | Minor chords, b7, diminished |
| Epic, dark fantasy | E minor, B minor | Power chords (root+5th) work well |
| Dreamy, ethereal | D major, F# minor | Add 9ths and sus4 for floating feel |
| Retro / chiptune | Any — stay in one octave | Square wave, staccato (short duration) |
| Underwater / calm | C major pentatonic | Omit the 4th and 7th for open sound |

### Map game actions to chord functions

The I–IV–V–I pattern is the default and always works. Adapt based on mood:

| Action | Default function | Intense/dark alternative |
|--------|-----------------|--------------------------|
| `moveLeft` | I (tonic) | i minor |
| `moveRight` | IV (subdominant) | iv minor or bVII |
| `rotate` | V (dominant) — creates tension | V7 or bVI for drama |
| `drop` | Quick accent, 1–2 notes | Root + 5th (power chord) |
| `deletion` | Resolution — I maj7 or I add9 | i + major7 (bittersweet) |

### Set durations and volume

- `synth.volume` — keep SFX at 0.10–0.16. Louder feels harsh.
- `moveLeft` / `moveRight` — short: 0.25–0.35 s. Player taps keys fast.
- `rotate` — slightly longer: 0.35–0.50 s. Rotation is deliberate.
- `drop` — very short: 0.15–0.22 s. Punchy accent.
- `deletion` — longest: 0.70–1.00 s. Reward sound; should feel satisfying.

---

## Step 3 — Design the theme melody

The theme is a looping sequence of single notes (or small chords). It plays via `setInterval` at a tempo-derived interval: `intervalMs = Math.round((60 / tempo / 2) * 1000)` — each step is one 8th note.

### Keep it quiet and unobtrusive

- `theme.volume` — 0.04–0.07. Theme must sit under SFX, not compete with them.
- `theme.noteDuration` — 0.14–0.22 s. Scale inversely with tempo: faster BPM → shorter duration to avoid note bleed. At 92 BPM use ~0.27 s; at 160 BPM use ~0.14 s.

### Sequence design

Build a 16–32 step sequence (4–8 bars of 4/4 at eighth-note resolution) from the chosen key. Include `null` for rests to add breathing room. Structure:

```
[bar 1 — states tonic]  [bar 2 — moves toward IV or vi]
[bar 3 — peaks at V or drama]  [bar 4 — resolves back to I]
```

Repeat/vary bars 1–4 to create an 8-bar loop if you have space. Keep it simple — a single-note melody with occasional two-note fills works better than dense chords.

### Tempo guide

Existing skins run 92–160 BPM. New skins should stay in this range.

| BPM | Feel | Interval (ms) |
|-----|------|---------------|
| 92  | Slow, ethereal (galaxy) | 326 ms |
| 108 | Gentle, pastoral (forest-zen, purple) | 278 ms |
| 120 | Upbeat, balanced (default, notes) | 250 ms |
| 140 | Energetic (notes, midnight-neon-adjacent) | 214 ms |
| 160 | Frenetic, chiptune (midnight-neon) | 188 ms |

---

## Step 4 — Write the sounds config

### Full template

```js
const sounds = {
  // Oscillator shape: 'triangle'|'sine'|'square'|'sawtooth'
  // Volume: 0–1 (split equally across notes; keep SFX at 0.10–0.16)
  synth: { type: 'triangle', volume: 0.13 },

  moveLeft:  { notes: [Hz, Hz, Hz],     duration: 0.30 }, // tonic chord
  moveRight: { notes: [Hz, Hz, Hz],     duration: 0.30 }, // subdominant
  rotate:    { notes: [Hz, Hz, Hz],     duration: 0.42 }, // dominant
  drop:      { notes: [Hz, Hz],         duration: 0.18 }, // quick accent
  deletion:  { notes: [Hz, Hz, Hz, Hz], duration: 0.85 }, // resolution

  theme: {
    tempo: 120,           // BPM
    type: 'triangle',     // can differ from synth.type if melody needs different timbre
    volume: 0.055,        // quiet — should be barely noticeable
    noteDuration: 0.20,   // seconds per note
    sequence: [
      // 4 bars × 4 beats × 2 eighth-notes = 32 steps (adjust freely)
      // null = rest
      [Hz], [Hz], [Hz], null,   // bar 1
      [Hz], [Hz], [Hz], null,   // bar 2
      [Hz], [Hz], [Hz], null,   // bar 3
      [Hz], [Hz], [Hz], null,   // bar 4
    ],
  },
};
```

### Note frequency reference

```
Octave 3:  C3=130.81  D3=146.83  E3=164.81  F3=174.61  G3=196.00  A3=220.00  B3=246.94
Octave 4:  C4=261.63  D4=293.66  E4=329.63  F4=349.23  G4=392.00  A4=440.00  B4=493.88
Octave 5:  C5=523.25  D5=587.33  E5=659.25  F5=698.46  G5=783.99  A5=880.00  B5=987.77

Accidentals:
  C#4=277.18  D#4=311.13  F#4=369.99  G#4=415.30  A#4=466.16
  C#5=554.37  D#5=622.25  F#5=739.99  G#5=830.61
```

### Ready-made chord shapes (copy & paste)

```
C major:        [261.63, 329.63, 392.00]
C minor:        [261.63, 311.13, 392.00]
C major 7th:    [261.63, 329.63, 392.00, 493.88]
C minor 7th:    [261.63, 311.13, 392.00, 466.16]
C suspended 4:  [261.63, 349.23, 392.00]

D major:        [293.66, 369.99, 440.00]
D minor:        [293.66, 349.23, 440.00]

E major:        [329.63, 415.30, 493.88]
E minor:        [329.63, 392.00, 493.88]

F major:        [349.23, 440.00, 523.25]
F minor:        [349.23, 415.30, 523.25]

G major:        [392.00, 493.88, 587.33]
G major 7th:    [392.00, 493.88, 587.33, 739.99]
G dominant 7th: [392.00, 493.88, 587.33, 698.46]

A minor:        [220.00, 261.63, 329.63]
A major:        [220.00, 277.18, 329.63]

B diminished:   [246.94, 293.66, 349.23]

Power chords (root + 5th only — works for any mood):
  C5:  [261.63, 392.00]
  G5:  [196.00, 293.66]
  A5:  [220.00, 329.63]
  E5:  [164.81, 246.94]
```

---

## Step 5 — Wire into the skin's index.js

Read `src/skins/<name>/index.js`. Add the `sounds` const (from Step 4) and add `sounds` to the export list:

```js
// Add above the exports:
const sounds = { /* ... */ };

// Replace the export line:
export { background, character, dispenser, grid, score, swiper, paths, reflection, BackgroundComponent, sounds };
```

If `sounds` is already exported, replace only the `const sounds = { ... }` block — do not touch any other export.

---

## Step 6 — Verify

Run `yarn lint` — no new errors expected (the sounds object is plain JS).

Then confirm in the browser (`yarn watch` on :8080):
1. Navigate to the target skin via the SKIN menu panel.
2. Start an ARCADE game.
3. Press **Left / Right** — two distinct chords should sound.
4. Press **Up (rotate)** — a third, harmonically related chord.
5. Let a 2×2 complete and get swept — the deletion chord plays (richer, longer).
6. **Theme music** — listen for a quiet looping melody after a few seconds.
7. Toggle **MUTED** in settings — all audio must go silent.
8. Switch skins — theme stops; the new skin's theme (or default fallback) starts.

If a chord is silent, check that the `notes` array contains valid numbers > 0 and `duration` > 0.  
If the theme does not loop, check `sequence` is a non-empty array and `tempo` > 0.
