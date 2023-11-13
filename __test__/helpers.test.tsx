import { BOARD_SIZE } from "@/constants/game";
import { confetti } from "@/utils/animations";
import {
  randomCoordinates,
  createEmptyBoard,
  randomBoolean,
} from "@/utils/helpers";

describe("helper functions", () => {
  it("creates random coordinates", () => {
    const coordinates = randomCoordinates();

    expect(coordinates).toEqual(expect.any(Array));

    const [x, y] = coordinates;

    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(BOARD_SIZE);

    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(BOARD_SIZE);
  });
  it("creates random boolean", () => {
    const boolean = randomBoolean();

    expect(boolean).toEqual(expect.any(Boolean));
  });
  it("creates an empty board", () => {
    const emptyBoard = createEmptyBoard(BOARD_SIZE);

    expect(emptyBoard.length).toBe(BOARD_SIZE);
  });

  it("throws confetti", () => {
    expect(confetti).not.toThrow();
  });
});
