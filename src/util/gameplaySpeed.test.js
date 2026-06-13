import { DEFAULT_SPEED_MULTIPLIER, getSpeedMultiplier, getTickSpeed } from './gameplaySpeed';

describe('getSpeedMultiplier', () => {
  it('returns the default multiplier when the skin has no gameplay export', () => {
    expect(getSpeedMultiplier({})).toBe(DEFAULT_SPEED_MULTIPLIER);
  });

  it('returns the default multiplier when gameplay is missing entirely', () => {
    expect(getSpeedMultiplier(undefined)).toBe(DEFAULT_SPEED_MULTIPLIER);
  });

  it('returns the skin-defined multiplier when present', () => {
    expect(getSpeedMultiplier({ gameplay: { speedMultiplier: 0.8 } })).toBe(0.8);
  });
});

describe('getTickSpeed', () => {
  it('returns the base speed for a skin with no multiplier', () => {
    expect(getTickSpeed({}, 35)).toBe(35);
  });

  it('scales the base speed by the skin multiplier', () => {
    expect(getTickSpeed({ gameplay: { speedMultiplier: 0.8 } }, 35)).toBe(28);
    expect(getTickSpeed({ gameplay: { speedMultiplier: 1.25 } }, 35)).toBe(43.75);
  });

  it('defaults baseSpeed to 35', () => {
    expect(getTickSpeed({ gameplay: { speedMultiplier: 2 } })).toBe(70);
  });
});
