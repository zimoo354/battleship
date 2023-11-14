/**
 * @jest-environment jsdom
 */

import React, { PropsWithChildren, RefObject } from "react";
import { renderHook, render, act, waitFor } from "@testing-library/react";
import {
  GameContextType,
  GameProvider,
  useGame,
} from "@/components/game-provider";
import { GameStages, PlayersNames } from "@/types";
import { Game } from "@/features/game";
import { getCellTestId } from "@/utils/strings";
import { BOARD_SIZE, INITIAL_SHIPS, MAX_SCORE } from "@/constants/game";
import { sleep } from "@/utils/helpers";

const renderGameHook = (hookCb: () => any) => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <GameProvider>{children}</GameProvider>
  );
  return renderHook<GameContextType, {}>(hookCb, { wrapper });
};

describe.only("GameProvider", () => {
  const placeShips = async (result: RefObject<GameContextType>) => {
    if (!result.current) {
      return;
    }

    const totalShips = INITIAL_SHIPS.length;

    for (let i = 0; i < totalShips; i++) {
      await act(async () => {
        result.current?.p1.placeShip(i, 0, false);
        result.current?.p2.placeShip(i, 0, false);
      });

      await waitFor(() => {
        expect(result.current?.p1.availableShips.length).toBe(
          totalShips - i - 1
        );
        expect(result.current?.p2.availableShips.length).toBe(
          totalShips - i - 1
        );
      });
    }
  };

  it("should provide initial game state", () => {
    const { result } = renderGameHook(useGame);

    if (!result.current) {
      return;
    }

    const { p1, p2, gameStage, winner } = result.current;

    expect(p1).not.toBeUndefined();
    expect(p2).not.toBeUndefined();
    expect(gameStage).toBe(GameStages.SETUP);
    expect(winner).toBeUndefined();
  });

  it("allows players to place ships and start the game", async () => {
    const { result } = renderGameHook(useGame);

    if (!result.current) {
      return;
    }

    expect(result.current.gameStage).toBe(GameStages.SETUP);

    await placeShips(result);

    await waitFor(() => {
      expect(result.current?.gameStage).toBe(GameStages.PLAYING);
    });
  });

  it("handles attacks and score updates correctly", async () => {
    const { result } = renderGameHook(useGame);

    if (!result.current) {
      return;
    }

    await placeShips(result);

    const attackX = 0;
    const attackY = 0;

    await act(async () => {
      result.current?.attack(PlayersNames.Player1, attackX, attackY);
    });

    await waitFor(() => {
      expect(result.current?.p1.score).toBeGreaterThan(0);
      expect(result.current?.p1.battleBoard[attackX][attackY]).toBe("hit");
    });

    await act(async () => {
      result.current?.attack(PlayersNames.Player2, attackX, attackY);
    });

    await waitFor(() => {
      expect(result.current?.p2.score).toBeGreaterThan(0);
      expect(result.current?.p2.battleBoard[attackX][attackY]).toBe("hit");
    });
  });

  it("ends the game when a player reaches max score", async () => {
    const { result } = renderGameHook(useGame);

    if (!result.current) {
      return;
    }

    expect(result.current.gameStage).toBe(GameStages.SETUP);

    await placeShips(result);

    expect(result.current.gameStage).toBe(GameStages.PLAYING);

    for (let i = 0; i < BOARD_SIZE; i++)
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (result.current.gameStage !== GameStages.PLAYING) {
          break;
        }

        await act(async () => {
          result.current?.attack(PlayersNames.Player1, i, j);
        });

        await waitFor(() => {
          expect(result.current?.currentTurn).toBe(PlayersNames.Player2);
        });

        if (result.current.gameStage !== GameStages.PLAYING) {
          break;
        }

        await act(async () => {
          result.current?.attack(PlayersNames.Player2, j, i);
        });

        await waitFor(() => {
          expect(result.current?.currentTurn).toBe(PlayersNames.Player1);
        });
      }

    await waitFor(() => {
      expect(result.current?.gameStage).toBe(GameStages.GAME_ENDED);
    });

    expect(result.current.winner).toBe(PlayersNames.Player1);
  });
});
