import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayersNames, GameStages, PlayerType } from "@/types";
import { MAX_SCORE } from "@/constants/game";
import { confetti } from "@/utils/animations";

type GameContextType =
  | undefined
  | {
      p1: PlayerType;
      p2: PlayerType;
      gameStage: GameStages;
      winner?: PlayersNames;
      attack: (from: PlayersNames, x: number, y: number) => void;
    };

const GameContext = createContext<GameContextType>(undefined);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [gameStage, setGameStage] = useState(GameStages.SETUP);
  const [currentTurn, setCurrentTurn] = useState<PlayersNames>(
    PlayersNames.Player1
  );
  const [winner, setWinner] = useState<PlayersNames>();

  const p1 = usePlayer(PlayersNames.Player1);
  const p2 = usePlayer(PlayersNames.Player2);

  const toggleTurn = () => {
    setCurrentTurn((prev) =>
      prev === PlayersNames.Player1
        ? PlayersNames.Player2
        : PlayersNames.Player1
    );
  };

  const attack = (from: PlayersNames, x: number, y: number) => {
    if (gameStage)
      if (from !== currentTurn) {
        throw new TypeError("It's not your turn");
      }

    const attacking = from === PlayersNames.Player1 ? p1 : p2;
    const beingAttacked = from === PlayersNames.Player1 ? p2 : p1;

    if (attacking.battleBoard[x][y] !== null) {
      throw new TypeError("You already tried with this cell. Try again.");
    }

    const result = beingAttacked.receiveAttack(x, y);
    attacking.noteMadeAttack(x, y, result);

    toggleTurn();
  };

  // Update Game State
  useEffect(() => {
    if (
      gameStage === GameStages.SETUP &&
      p1.finishedPlacing &&
      p2.finishedPlacing
    ) {
      setGameStage(GameStages.PLAYING);
    }

    if (
      gameStage === GameStages.PLAYING &&
      (p1.score === MAX_SCORE || p2.score === MAX_SCORE)
    ) {
      setGameStage(GameStages.GAME_ENDED);
      setWinner(
        p1.score === MAX_SCORE ? PlayersNames.Player1 : PlayersNames.Player2
      );
      confetti();
    }
  }, [p1.finishedPlacing, p2.finishedPlacing, gameStage, p1.score, p2.score]);

  const contextValue = {
    p1,
    p2,
    gameStage,
    attack,
    winner,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new TypeError("`useGame` must be used within a `GameProvider`");
  }

  return context;
};
