import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";

const {
  TYPE_A,
  TYPE_B,
  TYPE_A_SPECIAL,
  TYPE_B_SPECIAL,
  DELETION_TYPE_A,
  DELETION_TYPE_B,
  DELETION_TYPE_A_SPECIAL,
  DELETION_TYPE_B_SPECIAL,
  SWEEP_TYPE_A,
  SWEEP_TYPE_B,
  SWEEP_TYPE_A_SPECIAL,
  SWEEP_TYPE_B_SPECIAL,
} = BLOCKS_TYPES;

const isMarkedForDeletion = (v) =>
  v === DELETION_TYPE_A ||
  v === DELETION_TYPE_B ||
  v === DELETION_TYPE_A_SPECIAL ||
  v === DELETION_TYPE_B_SPECIAL;

const isBeingSwept = (v) =>
  v === SWEEP_TYPE_A ||
  v === SWEEP_TYPE_B ||
  v === SWEEP_TYPE_A_SPECIAL ||
  v === SWEEP_TYPE_B_SPECIAL;

const sweepToNormal = (v) => {
  if (v === SWEEP_TYPE_A) return TYPE_A;
  if (v === SWEEP_TYPE_B) return TYPE_B;
  if (v === SWEEP_TYPE_A_SPECIAL) return TYPE_A_SPECIAL;
  if (v === SWEEP_TYPE_B_SPECIAL) return TYPE_B_SPECIAL;
  return v;
};

export { isMarkedForDeletion, isBeingSwept, sweepToNormal };
