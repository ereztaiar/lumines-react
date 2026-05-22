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
  RECURSIVE_TYPE_A,
  RECURSIVE_TYPE_B,
  RECURSIVE_TYPE_A_SPECIAL,
  RECURSIVE_TYPE_B_SPECIAL,
  SWEEPING_TYPE_A,
  SWEEPING_TYPE_B,
  SWEEPING_TYPE_A_SPECIAL,
  SWEEPING_TYPE_B_SPECIAL,
} = BLOCKS_TYPES;

const isMarkedForDeletion = (v) =>
  v === DELETION_TYPE_A ||
  v === DELETION_TYPE_B ||
  v === DELETION_TYPE_A_SPECIAL ||
  v === DELETION_TYPE_B_SPECIAL;

const isBeingRecursive = (v) =>
  v === RECURSIVE_TYPE_A ||
  v === RECURSIVE_TYPE_B ||
  v === RECURSIVE_TYPE_A_SPECIAL ||
  v === RECURSIVE_TYPE_B_SPECIAL;

const isBeingSwept = (v) =>
  v === SWEEPING_TYPE_A ||
  v === SWEEPING_TYPE_B ||
  v === SWEEPING_TYPE_A_SPECIAL ||
  v === SWEEPING_TYPE_B_SPECIAL;

const recursiveToNormal = (v) => {
  if (v === RECURSIVE_TYPE_A) return TYPE_A;
  if (v === RECURSIVE_TYPE_B) return TYPE_B;
  if (v === RECURSIVE_TYPE_A_SPECIAL) return TYPE_A_SPECIAL;
  if (v === RECURSIVE_TYPE_B_SPECIAL) return TYPE_B_SPECIAL;
  return v;
};

const sweepingToNormal = (v) => {
  if (v === SWEEPING_TYPE_A) return TYPE_A;
  if (v === SWEEPING_TYPE_B) return TYPE_B;
  if (v === SWEEPING_TYPE_A_SPECIAL) return TYPE_A_SPECIAL;
  if (v === SWEEPING_TYPE_B_SPECIAL) return TYPE_B_SPECIAL;
  return v;
};

export {
  isMarkedForDeletion,
  isBeingRecursive,
  isBeingSwept,
  recursiveToNormal,
  sweepingToNormal,
};
