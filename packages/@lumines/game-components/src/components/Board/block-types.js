const BLOCKS_TYPES = {
  // No visual — invisible to the player
  EMPTY: '|',
  // Regular single-color block, visible to the player
  TYPE_A: 'A',
  // Same as TYPE_A, different color
  TYPE_B: 'B',
  // Special A block: when part of a 2×2 with TYPE_A/TYPE_A_SPECIAL, initiates flood fill; flood-fill neighbors become RECURSIVE at 0.5 opacity
  TYPE_A_SPECIAL: '@',
  // Same as TYPE_A_SPECIAL but for TYPE_B/TYPE_B_SPECIAL color
  TYPE_B_SPECIAL: '%',
  // TYPE_A corner of a matched 2×2 — orange-glowing; tentative, reverts to TYPE_A each tick unless committed by swiper
  DELETION_TYPE_A: 'a',
  // Same as DELETION_TYPE_A but for TYPE_B color
  DELETION_TYPE_B: 'b',
  // TYPE_A_SPECIAL corner of a matched 2×2 — orange-glowing; reverts to TYPE_A_SPECIAL each tick unless committed
  DELETION_TYPE_A_SPECIAL: '*',
  // Same as DELETION_TYPE_A_SPECIAL but for TYPE_B_SPECIAL
  DELETION_TYPE_B_SPECIAL: '~',
  // TYPE_A block reached by flood fill from a special — rendered at 0.5 opacity; tentative, reverts to TYPE_A each tick unless committed by swiper
  RECURSIVE_TYPE_A: 'X',
  // Same as RECURSIVE_TYPE_A but for TYPE_B color
  RECURSIVE_TYPE_B: 'x',
  // TYPE_A_SPECIAL block reached by flood fill — 0.5 opacity; reverts to TYPE_A_SPECIAL each tick unless committed
  RECURSIVE_TYPE_A_SPECIAL: '+',
  // Same as RECURSIVE_TYPE_A_SPECIAL but for TYPE_B_SPECIAL
  RECURSIVE_TYPE_B_SPECIAL: '=',
  // TYPE_A cell committed by the swiper this tick — 0.45 opacity fade; will be cleared to EMPTY next swiper step. Not reverted by revertUncommittedMarks.
  SWEEPING_TYPE_A: 'S',
  // Same as SWEEPING_TYPE_A but for TYPE_B
  SWEEPING_TYPE_B: 's',
  // TYPE_A_SPECIAL cell committed by the swiper — 0.45 opacity; cleared next swiper step
  SWEEPING_TYPE_A_SPECIAL: '#',
  // Same as SWEEPING_TYPE_A_SPECIAL but for TYPE_B_SPECIAL
  SWEEPING_TYPE_B_SPECIAL: '$',
};

export { BLOCKS_TYPES };
