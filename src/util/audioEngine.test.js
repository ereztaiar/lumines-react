import { chainNotes, stepSeconds, collectDueSteps } from './audioEngine';

describe('chainNotes', () => {
  const chord = [261.63, 329.63, 392.0];

  it('returns the base chord at chain 1', () => {
    expect(chainNotes(chord, 1)).toEqual(chord);
  });

  it('defaults to chain 1', () => {
    expect(chainNotes(chord)).toEqual(chord);
  });

  it('adds one octave-doubled tone per chain level past the first', () => {
    expect(chainNotes(chord, 2)).toEqual([...chord, 261.63 * 2]);
    expect(chainNotes(chord, 3)).toEqual([...chord, 261.63 * 2, 329.63 * 2]);
  });

  it('caps the added tones at the chord size', () => {
    const result = chainNotes(chord, 99);
    expect(result).toEqual([...chord, ...chord.map((f) => f * 2)]);
  });

  it('does not mutate the input chord', () => {
    chainNotes(chord, 3);
    expect(chord).toEqual([261.63, 329.63, 392.0]);
  });
});

describe('stepSeconds', () => {
  it('returns the 8th-note duration for a tempo', () => {
    expect(stepSeconds(120)).toBeCloseTo(0.25);
    expect(stepSeconds(140)).toBeCloseTo(60 / 140 / 2);
  });
});

describe('collectDueSteps', () => {
  const opts = { stepDur: 0.25, lookahead: 0.15, seqLen: 8 };

  it('schedules all steps that fall inside the lookahead window', () => {
    const { events, state } = collectDueSteps(
      { step: 0, nextTime: 10.0 },
      10.0,
      { ...opts, lookahead: 0.6 }
    );
    expect(events).toEqual([
      { index: 0, time: 10.0 },
      { index: 1, time: 10.25 },
      { index: 2, time: 10.5 },
    ]);
    expect(state.step).toBe(3);
    expect(state.nextTime).toBeCloseTo(10.75);
  });

  it('schedules nothing when the next step is beyond the window', () => {
    const { events, state } = collectDueSteps({ step: 4, nextTime: 10.5 }, 10.0, opts);
    expect(events).toEqual([]);
    expect(state).toEqual({ step: 4, nextTime: 10.5 });
  });

  it('wraps the sequence index at seqLen', () => {
    const { events } = collectDueSteps({ step: 9, nextTime: 10.0 }, 10.0, opts);
    expect(events[0].index).toBe(1);
  });

  it('skips missed steps after a throttled gap instead of firing them all at once', () => {
    // nextTime is 2s in the past (background tab); 8 steps of 0.25s were missed.
    const { events, state } = collectDueSteps({ step: 0, nextTime: 8.0 }, 10.0, opts);
    // Position advanced past the gap; only steps inside the window fire.
    expect(state.step).toBeGreaterThanOrEqual(8);
    events.forEach(({ time }) => {
      expect(time).toBeGreaterThanOrEqual(10.0 - opts.stepDur);
      expect(time).toBeLessThan(10.0 + opts.lookahead);
    });
    // At most one step per stepDur inside the window — no machine-gun burst.
    expect(events.length).toBeLessThanOrEqual(Math.ceil(opts.lookahead / opts.stepDur) + 1);
  });

  it('keeps musical position through a gap (step count matches elapsed time)', () => {
    const { events, state } = collectDueSteps({ step: 0, nextTime: 8.0 }, 10.0, {
      ...opts,
      lookahead: 0.1,
    });
    // 2s gap / 0.25s per step = 8 missed steps; step 8 lands exactly at now,
    // so it is due (not missed) and gets scheduled, advancing the state to 9.
    expect(events).toEqual([{ index: 0, time: 10.0 }]);
    expect(state.step).toBe(9);
    expect(state.nextTime).toBeCloseTo(10.25);
  });
});
