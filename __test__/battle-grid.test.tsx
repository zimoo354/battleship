/**
 * @jest-environment jsdom
 */

import { render, fireEvent, renderHook, waitFor } from "@testing-library/react";
import { GameProvider } from "@/components/game-provider";
import { BattleGrid } from "@/components/battle-grid";
import { PlayerType, PlayersNames } from "@/types";
import { usePlayer } from "@/hooks/use-player";
import { getCellTestId } from "@/utils/strings";
import { act } from "react-dom/test-utils";

describe("BattleGrid", () => {
  let mockPlayer: PlayerType;
  let attackMock: jest.Mock;

  beforeEach(() => {
    const { result: playerResult } = renderHook(() =>
      usePlayer(PlayersNames.Player1)
    );
    mockPlayer = playerResult.current;

    const useGameMock = jest.spyOn(
      require("@/components/game-provider"),
      "useGame"
    );
    attackMock = jest.fn();
    useGameMock.mockReturnValue({ attack: attackMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <GameProvider>
        <BattleGrid player={mockPlayer} />
      </GameProvider>
    );

    expect(getByText(`${mockPlayer.playerName}`)).not.toBeUndefined();
  });

  it("allows attacking a cell on the grid", () => {
    const { getByTestId } = render(
      <GameProvider>
        <BattleGrid player={mockPlayer} />
      </GameProvider>
    );

    const cell = getByTestId(
      getCellTestId("battle", mockPlayer.playerName, 0, 0)
    );
    fireEvent.click(cell);

    expect(attackMock).toHaveBeenCalledWith(mockPlayer.playerName, 0, 0);
  });

  it("updates score after succesfull attack", async () => {
    const { getByTestId } = render(
      <GameProvider>
        <BattleGrid player={mockPlayer} />
      </GameProvider>
    );

    await act(async () => {
      mockPlayer.noteMadeAttack(0, 0, "hit");

      await waitFor(() => {
        expect(getByTestId(`player-score`).textContent).toBe(
          `Score: ${mockPlayer.score}`
        );
      });
    });
  });

  it("displays error when an invalid attack is made", async () => {
    attackMock.mockImplementation(() => {
      throw new TypeError("Invalid attack");
    });

    const { getByTestId, getByText } = render(
      <GameProvider>
        <BattleGrid player={mockPlayer} />
      </GameProvider>
    );

    const cell = getByTestId(
      getCellTestId("battle", mockPlayer.playerName, 9, 9)
    );
    fireEvent.click(cell);

    await waitFor(() => {
      expect(getByText("Invalid attack")).not.toBeUndefined();
    });
  });
});
