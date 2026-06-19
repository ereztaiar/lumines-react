// Lazy singleton — AudioContext must be created after a user gesture (browser autoplay policy)
let ctx = null;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return ctx;
}

// Default sounds used when a skin does not export its own `sounds` config.
// I–IV–V–I progression in C major so the defaults are already harmonic.
const DEFAULT_SOUNDS = {
  synth: { type: 'triangle', volume: 0.10 },
  moveLeft:  { notes: [261.63, 329.63, 392.00], duration: 0.25 },
  moveRight: { notes: [349.23, 440.00, 523.25], duration: 0.25 },
  rotate:    { notes: [392.00, 493.88, 587.33], duration: 0.30 },
  drop:      { notes: [196.00, 246.94, 293.66], duration: 0.20 },
  deletion:  { notes: [261.63, 329.63, 392.00, 493.88], duration: 0.60 },
};

function playChord(notes, { type = 'triangle', duration = 0.3, volume = 0.12 } = {}) {
  try {
    const ac = getCtx();
    const perNoteVol = volume / notes.length;
    notes.forEach((freq) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(perNoteVol, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + duration);
    });
  } catch {
    // Audio context may be unavailable in some environments — silently no-op
  }
}

// Theme scheduler — interval-based with a step counter so the sequence loops
let themeHandle = null;
let themeStep = 0;

function startTheme(config) {
  stopTheme();
  if (!config || !config.sequence || config.sequence.length === 0) return;

  const {
    sequence,
    noteDuration = 0.20,
    tempo = 120,
    type = 'triangle',
    volume = 0.05,
  } = config;

  // 8th-note grid at the given tempo
  const intervalMs = Math.round((60 / tempo / 2) * 1000);
  themeStep = 0;

  themeHandle = setInterval(() => {
    const notes = sequence[themeStep % sequence.length];
    if (notes) playChord(notes, { type, duration: noteDuration, volume });
    themeStep++;
  }, intervalMs);
}

function stopTheme() {
  if (themeHandle !== null) {
    clearInterval(themeHandle);
    themeHandle = null;
  }
}

export { playChord, startTheme, stopTheme, DEFAULT_SOUNDS };
