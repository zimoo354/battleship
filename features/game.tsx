import { GameStages, PlayersNames } from "@/types";
import { BattleGrid } from "@/components/battle-grid";
import { useGame } from "@/components/game-provider";
import { PlacingGrid } from "@/components/placing-grid";
import { SidePanel } from "@/components/sidepanel";
import { Winner } from "@/components/winner";

export const Game = () => {
  const { p1, p2, gameStage } = useGame();

  const gameStarted = gameStage !== GameStages.SETUP;

  return (
    <div className="flex flex-row flex-1 w-screen">
      {gameStage === GameStages.GAME_ENDED && <Winner />}
      <SidePanel>
        {gameStarted && <BattleGrid player={p1} />}
        <PlacingGrid player={p1} />
      </SidePanel>
      <SidePanel>
        {gameStarted && <BattleGrid player={p2} />}
        <PlacingGrid player={p2} />
      </SidePanel>
    </div>
  );
};
