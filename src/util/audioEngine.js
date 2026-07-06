// Lazy singleton — AudioContext must be created after a user gesture (browser autoplay policy)
let ctx = null;
let masterInput = null;
let masterGain = null;
let reverbSendBus = null;

// Everything routes through masterInput → masterGain → compressor → destination,
// so overlapping theme + SFX can't clip and a single knob controls output level.
function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 20;
    compressor.ratio.value = 4;
    compressor.connect(ctx.destination);

    masterGain = ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(compressor);

    masterInput = ctx.createGain();
    masterInput.connect(masterGain);

    const convolver = ctx.createConvolver();
    convolver.buffer = makeImpulseResponse(ctx, 1.6, 2.8);
    convolver.connect(masterInput);
    reverbSendBus = convolver;
  }
  // A backgrounded/idle tab can suspend the context; resume is async but
  // scheduled nodes queue up and play once it's running again.
  if (ctx.state === 'suspended' && ctx.resume) {
    ctx.resume();
  }
  return ctx;
}

// Procedural reverb impulse: exponentially decaying stereo noise. Avoids
// shipping an audio file while still giving notes a sense of space.
function makeImpulseResponse(ac, seconds, decay) {
  const rate = ac.sampleRate;
  const length = Math.floor(rate * seconds);
  const impulse = ac.createBuffer(2, length, rate);
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  return impulse;
}

function setMasterVolume(volume) {
  try {
    getCtx();
    masterGain.gain.value = Math.max(0, Math.min(1, volume));
  } catch {
    // Audio context may be unavailable in some environments — silently no-op
  }
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

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function playChord(notes, options = {}) {
  const {
    type = 'triangle',
    duration = 0.3,
    volume = 0.12,
    // Sample-accurate start time on the AudioContext clock; defaults to "now".
    when = null,
    // 0–1 send into the shared reverb bus.
    reverb = 0.18,
    // Cents of spread between the two oscillators of each voice.
    detune = 5,
  } = options;
  try {
    const ac = getCtx();
    const start = when === null ? ac.currentTime : when;
    // Two detuned oscillators sum to ~2× a single one's amplitude.
    const peak = (volume / notes.length) * 0.6;
    const attack = Math.min(0.012, duration * 0.15);

    notes.forEach((freq) => {
      // Voice graph: [osc, osc] → gain (envelope) → lowpass (sweep) → dry + reverb send.
      const gain = ac.createGain();
      const filter = ac.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 0.8;
      filter.frequency.setValueAtTime(clamp(freq * 6, 800, 10000), start);
      filter.frequency.exponentialRampToValueAtTime(
        clamp(freq * 1.5, 200, 4000),
        start + duration
      );

      gain.connect(filter);
      filter.connect(masterInput);
      if (reverb > 0) {
        const send = ac.createGain();
        send.gain.value = reverb;
        filter.connect(send);
        send.connect(reverbSendBus);
      }

      // exponentialRamp can't reach 0, so the envelope lives between 0.0001 and peak.
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(peak, start + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      [-detune, detune].forEach((cents) => {
        const osc = ac.createOscillator();
        osc.type = type;
        osc.frequency.value = freq;
        osc.detune.value = cents;
        osc.connect(gain);
        osc.start(start);
        osc.stop(start + duration + 0.05);
      });
    });
  } catch {
    // Audio context may be unavailable in some environments — silently no-op
  }
}

// Each chain level past the first doubles one more chord tone an octave up —
// the clear sound gets denser and brighter without ever leaving the key.
function chainNotes(notes, chain = 1) {
  const extra = clamp(chain - 1, 0, notes.length);
  return notes.concat(notes.slice(0, extra).map((freq) => freq * 2));
}

// 8th-note grid at the given tempo.
function stepSeconds(tempo) {
  return 60 / tempo / 2;
}

// Pure scheduler step: given the last scheduled position and the current
// context time, return the steps due within the lookahead window and the
// advanced state. If the pump was throttled (background tab) and nextTime
// fell behind, the missed steps are skipped — advancing the position as if
// they had played — rather than firing them all at once on resume.
function collectDueSteps(state, now, { stepDur, lookahead, seqLen }) {
  let { step, nextTime } = state;
  if (now - nextTime > stepDur) {
    const missed = Math.ceil((now - nextTime) / stepDur);
    step += missed;
    nextTime += missed * stepDur;
  }
  const events = [];
  while (nextTime < now + lookahead) {
    events.push({ index: step % seqLen, time: nextTime });
    step++;
    nextTime += stepDur;
  }
  return { events, state: { step, nextTime } };
}

// Theme playback — a lookahead scheduler: notes are booked ahead of time on
// the AudioContext clock (sample-accurate), and setInterval only pumps the
// scheduler, so timer jitter never reaches the music.
const THEME_LOOKAHEAD_S = 0.15;
const THEME_PUMP_MS = 40;
let themeHandle = null;

function startTheme(config) {
  stopTheme();
  if (!config || !config.sequence || config.sequence.length === 0) return;

  const {
    sequence,
    noteDuration = 0.20,
    tempo = 120,
    type = 'triangle',
    volume = 0.05,
    reverb = 0.12,
  } = config;

  const stepDur = stepSeconds(tempo);
  let state = { step: 0, nextTime: null };

  const pump = () => {
    try {
      const ac = getCtx();
      if (state.nextTime === null) {
        state.nextTime = ac.currentTime + 0.05;
      }
      const due = collectDueSteps(state, ac.currentTime, {
        stepDur,
        lookahead: THEME_LOOKAHEAD_S,
        seqLen: sequence.length,
      });
      state = due.state;
      due.events.forEach(({ index, time }) => {
        const notes = sequence[index];
        if (notes) {
          playChord(notes, { type, duration: noteDuration, volume, reverb, when: time });
        }
      });
    } catch {
      // Audio context may be unavailable in some environments — silently no-op
    }
  };

  pump();
  themeHandle = setInterval(pump, THEME_PUMP_MS);
}

function stopTheme() {
  if (themeHandle !== null) {
    clearInterval(themeHandle);
    themeHandle = null;
  }
}

export {
  playChord,
  startTheme,
  stopTheme,
  setMasterVolume,
  chainNotes,
  stepSeconds,
  collectDueSteps,
  DEFAULT_SOUNDS,
};
