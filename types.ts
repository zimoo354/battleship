export type Coordinates = { x: number; y: number };
export type CellType = "ship" | "miss" | "hit" | null;
export type BoardType = CellType[][];
export enum GameStages {
  SETUP,
  PLAYING,
  GAME_ENDED,
}

export enum PlayersNames {
  Player1 = "Player 1",
  Player2 = "Player 2",
}

export type PlayerType = {
  playerName: PlayersNames;
  shipBoard: BoardType;
  battleBoard: BoardType;
  placeShip: (startX: number, startY: number, vertical: boolean) => void;
  noteMadeAttack: (x: number, y: number, result: CellType) => void;
  receiveAttack: (x: number, y: number) => CellType;
  availableShips: number[];
  finishedPlacing: boolean;
  score: number;
};
