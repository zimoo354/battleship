import type { PlayerType } from "@/types";
import { Cell } from "./cell";
import { classNames, getCellTestId } from "@/utils/strings";
import { useGame } from "./game-provider";
import { useState } from "react";
import { Error } from "./error";
import { Subtitle } from "./subtitle";

type BattleGridProps = {
  player: PlayerType;
};

export const BattleGrid = ({ player }: BattleGridProps) => {
  const { attack } = useGame();

  const [error, setError] = useState("");

  if (!player.battleBoard) return null;

  const handleAttack = (x: number, y: number) => {
    try {
      attack(player.playerName, x, y);
    } catch (e) {
      const err = e as TypeError;
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };

  return (
    <div className={classNames("flex flex-col gap-6 relative transition-all")}>
      <Subtitle>{player.playerName}</Subtitle>
      <div className="grid grid-cols-10 bg-slate-200 border-white">
        {player.battleBoard.map((row, x) =>
          row.map((_c, y) => (
            <Cell
              key={`${x}|${y}`}
              data-testid={getCellTestId("battle", player.playerName, x, y)}
              onClick={() => handleAttack(x, y)}
              type={player.battleBoard[x][y]}
            />
          ))
        )}
      </div>
      <p className="text-center">Score: {player.score}</p>
      <Error content={error} />
    </div>
  );
};
