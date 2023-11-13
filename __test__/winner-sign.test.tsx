/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { GameProvider } from "@/components/game-provider";

import { Winner } from "@/components/winner";

describe("Winner", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(
      <GameProvider>
        <Winner />
      </GameProvider>
    );

    expect(getByTestId("winner-sign")).not.toBeUndefined();
  });
});
