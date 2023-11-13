/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { Cell } from "@/components/cell";
import { getCellTestId } from "@/utils/strings";

const mockFunc = () => {};
const cellTestId = getCellTestId("test", "player", 0, 0);

describe("Cell", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(
      <Cell data-testid={cellTestId} type={null} onClick={mockFunc} />
    );

    expect(getByTestId(cellTestId)).not.toBeUndefined();
    getByTestId(cellTestId).className.includes("grid-cell");
  });

  it("renders 'hit' variant", () => {
    const { getByTestId } = render(
      <Cell data-testid={cellTestId} type="hit" onClick={mockFunc} />
    );

    expect(
      getByTestId(cellTestId).className.includes("bg-red-500")
    ).toBeTruthy();
  });

  it("renders 'miss' variant", () => {
    const { getByTestId } = render(
      <Cell data-testid={cellTestId} type="miss" onClick={mockFunc} />
    );

    expect(
      getByTestId(cellTestId).className.includes("bg-slate-500")
    ).toBeTruthy();
  });

  it("renders 'ship' variant", () => {
    const { getByTestId } = render(
      <Cell data-testid={cellTestId} type="ship" onClick={mockFunc} />
    );

    expect(
      getByTestId(cellTestId).className.includes("bg-blue-400")
    ).toBeTruthy();
  });
});
