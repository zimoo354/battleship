import { useState } from "react";
import type { PlayerType } from "@/types";
import { Cell } from "./cell";
import { Button } from "./button";
import { classNames, getCellTestId } from "@/utils/strings";
import { Error } from "./error";
import { NowPlacing } from "./now-placing";

type PlacingGridProps = {
  player: PlayerType;
};

export const PlacingGrid = ({ player }: PlacingGridProps) => {
  const [vertical, setVertical] = useState(false);
  const [error, setError] = useState("");

  if (!player.shipBoard) return null;

  const handlePlace = (x: number, y: number) => {
    try {
      player.placeShip(x, y, vertical);
    } catch (e) {
      const err = e as TypeError;
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col gap-6 relative transition-all",
        player.finishedPlacing ? "scale-75 pointer-events-none" : ""
      )}
    >
      <h3>Your board</h3>
      <div className="grid grid-cols-10 bg-slate-200 border-white">
        {player.shipBoard.map((row, x) =>
          row.map((_c, y) => (
            <Cell
              key={`${x}|${y}`}
              data-testid={getCellTestId("placing", player.playerName, x, y)}
              onClick={() => handlePlace(x, y)}
              type={player.shipBoard[x][y]}
            />
          ))
        )}
      </div>
      {!player.finishedPlacing && (
        <div className="flex flex-col gap-4 justify-center items-center">
          <NowPlacing available={player.availableShips} />
          <Button
            data-testid="orientation-button"
            onClick={() => setVertical(!vertical)}
          >
            {vertical ? "Vertical ⬇️" : "Horizontal ➡️"}
          </Button>
        </div>
      )}
      <Error content={error} />
    </div>
  );
};
