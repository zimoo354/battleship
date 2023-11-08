/**
 * @jest-environment jsdom
 */

import { render, fireEvent, renderHook, waitFor } from "@testing-library/react";
import { GameProvider } from "@/components/game-provider";
import { PlacingGrid } from "@/components/placing-grid";
import { PlayerType, PlayersNames } from "@/types";
import { usePlayer } from "@/hooks/use-player";
import { getCellTestId } from "@/utils/strings";

describe("PlacingGrid", () => {
  let mockPlayer: PlayerType;

  beforeEach(() => {
    const { result } = renderHook(() => usePlayer(PlayersNames.Player1));

    mockPlayer = result.current;
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <GameProvider>
        <PlacingGrid player={mockPlayer} />
      </GameProvider>
    );

    expect(getByText("Your board")).not.toBeUndefined();
  });

  it("allows placing ship on the grid", () => {
    const { getByText, getByTestId } = render(
      <GameProvider>
        <PlacingGrid player={mockPlayer} />
      </GameProvider>
    );

    const firstCell = getByTestId(
      getCellTestId("placing", mockPlayer.playerName, 0, 0)
    );
    fireEvent.click(firstCell);

    // It's a size-5 ship
    expect(mockPlayer.shipBoard[0][0]).toBe("ship");
    expect(mockPlayer.shipBoard[0][1]).toBe("ship");
    expect(mockPlayer.shipBoard[0][2]).toBe("ship");
    expect(mockPlayer.shipBoard[0][3]).toBe("ship");
    expect(mockPlayer.shipBoard[0][4]).toBe("ship");

    const orientationButton = getByText("Horizontal ➡️");
    fireEvent.click(orientationButton);

    // now we're placing ships vertically
    const rightTopCell = getByTestId(
      getCellTestId("placing", mockPlayer.playerName, 0, 9)
    );
    fireEvent.click(rightTopCell);

    // It's a size-4 ship placed vertically
    expect(mockPlayer.shipBoard[0][9]).toBe("ship");
    expect(mockPlayer.shipBoard[1][9]).toBe("ship");
    expect(mockPlayer.shipBoard[2][9]).toBe("ship");
    expect(mockPlayer.shipBoard[3][9]).toBe("ship");
  });

  it("changes orientation when the button is clicked", () => {
    const { getByText } = render(
      <GameProvider>
        <PlacingGrid player={mockPlayer} />
      </GameProvider>
    );

    const orientationButton = getByText("Horizontal ➡️");
    fireEvent.click(orientationButton);

    expect(orientationButton.textContent).toBe("Vertical ⬇️");
  });

  it("displays error when trying to place a ship out of bounds", async () => {
    jest.spyOn(mockPlayer, "placeShip").mockImplementation(() => {
      throw new TypeError("Cannot place ship out of bounds");
    });

    const { getByTestId, getByText } = render(
      <GameProvider>
        <PlacingGrid player={mockPlayer} />
      </GameProvider>
    );

    const cellOutOfBounds = getByTestId(
      getCellTestId("placing", mockPlayer.playerName, 9, 9)
    );
    fireEvent.click(cellOutOfBounds);

    await waitFor(() => {
      expect(getByText("Cannot place ship out of bounds")).not.toBeUndefined();
    });
  });
});
