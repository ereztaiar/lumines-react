import { BLOCKS_TYPES } from "@lumines/game-components/src/components/Board/block-types";

const {
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

export { isMarkedForDeletion, isBeingSwept };
