import "babel-polyfill";
import { resolveAnchorCube } from "./index.js";
import { CUBE_STATES } from "@lumines/game-components/src/components/Dispenser/cube-states";

const cube = {
  topLeft: { x: 2, y: 0 },
  topRight: { x: 3, y: 0 },
  bottomLeft: { x: 2, y: 1 },
  bottomRight: { x: 3, y: 1 },
};

describe("resolveAnchorCube", () => {
  it("pins the cube while it is dropping", () => {
    expect(resolveAnchorCube(CUBE_STATES.DROP, cube)).toBe(cube);
  });

  it("pins the cube while it waits at the ready rows", () => {
    expect(resolveAnchorCube(CUBE_STATES.WAITING, cube)).toBe(cube);
  });

  it("does not pin a landed cube — its cells fall with gravity", () => {
    expect(resolveAnchorCube(CUBE_STATES.NEW, cube)).toBeNull();
  });

  it("does not pin during READY — the next cube is not drawn yet", () => {
    expect(resolveAnchorCube(CUBE_STATES.READY, cube)).toBeNull();
  });
});
