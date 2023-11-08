/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, act } from "@testing-library/react";
import { GameProvider } from "@/components/game-provider";
import { GameStages, PlayersNames } from "@/types";
import { Game } from "@/features/game";

describe.only("GameProvider", () => {
  test("renders without crashing", () => {
    const { queryByTestId } = render(
      <GameProvider>
        <Game />
      </GameProvider>
    );

    expect(queryByTestId("game-container")).toBeTruthy();
  });

  it("renders only both player's side panels", () => {
    const { queryByTestId } = render(
      <GameProvider>
        <Game />
      </GameProvider>
    );

    expect(queryByTestId("sidepanel-p1")).toBeTruthy();
    expect(queryByTestId("sidepanel-p2")).toBeTruthy();
    expect(queryByTestId("sidepanel-p3")).toBeNull();
  });

  // test("allows attacking and updates the context accordingly", () => {
  //   const { getByText, getByTestId } = render(
  //     <GameProvider>
  //       <Game />
  //     </GameProvider>
  //   );

  //   act(() => {
  //     getByText("Attack").click();
  //   });

  //   // Since it's setup stage, the turn shouldn't actually change.
  //   // This test assumes that attack doesn't change turns during setup.
  //   expect(getByTestId("game-stage").textContent).toBe(GameStages.SETUP);
  // });

  // test("throws error when attacking out of turn", () => {
  //   const { getByText } = render(
  //     <GameProvider>
  //       <TestComponent />
  //     </GameProvider>
  //   );

  //   // First attack to toggle the turn
  //   act(() => {
  //     getByText("Attack").click();
  //   });

  //   // Attempt to attack again, which should be out of turn
  //   expect(() => {
  //     act(() => {
  //       getByText("Attack").click();
  //     });
  //   }).toThrow(TypeError);
  // });
});
