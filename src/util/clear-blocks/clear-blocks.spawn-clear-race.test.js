import "babel-polyfill";
import { clearAllSweptCells, resolveAnchorCube } from "./index.js";
import { CUBE_STATES } from "@lumines/game-components/src/components/Dispenser/cube-states";
import { g, s } from "../grid-test-helpers.js";

// Regression for the half-cube bug: a cube lands, the spawn chain flushes
// mid-tick (next cube drawn at the ready rows, state WAITING), and the same
// tick clears a swept group whose columns sit under the new cube. With the
// anchor resolved from fresh refs the drawn cube must stay pinned; resolving
// it from a stale closure (anchor = null) let gravity pull the cube's columns
// into the stack, splitting it in half.
describe("same-tick land → spawn → clear", () => {
  const makeGrid = () =>
    g([
      "||AA||",
      "||BA||",
      "||||||",
      "||||||",
      "||||||",
      "||||||",
      "|ASS||",
      "|ASSB|",
    ]);

  const waitingCube = {
    topLeft: { x: 2, y: 0 },
    topRight: { x: 3, y: 0 },
    bottomLeft: { x: 2, y: 1 },
    bottomRight: { x: 3, y: 1 },
  };

  it("keeps the freshly drawn WAITING cube pinned while its columns clear", async () => {
    const array = makeGrid();

    const anchor = resolveAnchorCube(CUBE_STATES.WAITING, waitingCube);
    const count = await clearAllSweptCells(array, anchor);

    expect(count).toBe(4);
    expect(s(array)).toStrictEqual([
      "||AA||",
      "||BA||",
      "||||||",
      "||||||",
      "||||||",
      "||||||",
      "|A||||",
      "|A||B|",
    ]);
  });

  it("with no anchor (the stale-closure failure) the cube falls into the stack", async () => {
    const array = makeGrid();

    const anchor = resolveAnchorCube(CUBE_STATES.NEW, waitingCube);
    const count = await clearAllSweptCells(array, anchor);

    // This documents the exact corruption being prevented: the descriptor
    // still says rows 0-1, but the cube's cells now sit on the stack.
    expect(anchor).toBeNull();
    expect(count).toBe(4);
    expect(s(array)).toStrictEqual([
      "||||||",
      "||||||",
      "||||||",
      "||||||",
      "||||||",
      "||||||",
      "|AAA||",
      "|ABAB|",
    ]);
  });

  it("pins both halves of a split DROP cube at their actual rows", async () => {
    const array = g([
      "||||||",
      "||||||",
      "||A|||",
      "||A|||",
      "|||B||",
      "|||B||",
      "||SA||",
      "||SA||",
    ]);
    const splitCube = {
      topLeft: { x: 2, y: 2 },
      bottomLeft: { x: 2, y: 3 },
      topRight: { x: 3, y: 4 },
      bottomRight: { x: 3, y: 5 },
    };

    const anchor = resolveAnchorCube(CUBE_STATES.DROP, splitCube);
    const count = await clearAllSweptCells(array, anchor);

    expect(count).toBe(2);
    expect(s(array)).toStrictEqual([
      "||||||",
      "||||||",
      "||A|||",
      "||A|||",
      "|||B||",
      "|||B||",
      "|||A||",
      "|||A||",
    ]);
  });
});
