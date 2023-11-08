/**
 * @jest-environment jsdom
 */

import { BOARD_SIZE, INITIAL_SHIPS } from "@/constants/game";
import { usePlayer } from "@/hooks/usePlayer";
import { renderHook, act } from "@testing-library/react";

describe("usePlayer", () => {
  it("should initialize the player succesfully", async () => {
    const { result } = renderHook(() => usePlayer("Player 1"));

    expect(result.current.playerName).toBe("Player 1");
  });

  it("initial state is set correctly", () => {
    const { result } = renderHook(() => usePlayer("Player 1"));

    expect(result.current.shipBoard).toEqual(expect.any(Array));
    expect(result.current.battleBoard).toEqual(expect.any(Array));
    expect(result.current.availableShips).toEqual(INITIAL_SHIPS);
    expect(result.current.score).toBe(0);
  });

  it("placing a ship updates the shipBoard and availableShips", () => {
    const { result } = renderHook(() => usePlayer("Player 1"));
    const startX = 0;
    const startY = 0;
    const vertical = false;
    const length = INITIAL_SHIPS[0];

    act(() => {
      result.current.placeShip(startX, startY, vertical);
    });

    // Check if the ship is placed at the correct coordinates
    for (let i = 0; i < length; i++) {
      expect(result.current.shipBoard[startX][startY + i]).toBe("ship");
    }

    // Check if the first ship is removed from availableShips
    expect(result.current.availableShips.length).toBe(INITIAL_SHIPS.length - 1);
  });

  it("placing a ship outside the boundaries throws an error", () => {
    const { result } = renderHook(() => usePlayer("Player 1"));
    const startX = BOARD_SIZE;
    const startY = BOARD_SIZE;
    const vertical = false;

    expect(() => {
      act(() => {
        result.current.placeShip(startX, startY, vertical);
      });
    }).toThrow(TypeError);
  });

  it("recording a hit attack updates the battleBoard and score", () => {
    const { result } = renderHook(() => usePlayer("Player 1"));
    const x = 0;
    const y = 0;
    const resultHit = "hit";

    act(() => {
      result.current.noteMadeAttack(x, y, resultHit);
    });

    expect(result.current.battleBoard[x][y]).toBe(resultHit);
    expect(result.current.score).toBe(1);
  });

  it('receiving an attack on a ship returns "hit"', () => {
    const { result } = renderHook(() => usePlayer("Player 1"));
    // Place a ship first
    act(() => {
      result.current.placeShip(0, 0, false);
    });

    let attackResult;
    act(() => {
      attackResult = result.current.receiveAttack(0, 0);
    });

    expect(attackResult).toBe("hit");
  });

  it('receiving an attack on an empty cell returns "miss"', () => {
    const { result } = renderHook(() => usePlayer("Player 1"));

    let attackResult;
    act(() => {
      attackResult = result.current.receiveAttack(0, 1);
    });

    expect(attackResult).toBe("miss");
  });
});
