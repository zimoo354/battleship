import type { BoardType, CellType, Coordinates, PlayersNames } from "@/types";
import { BOARD_SIZE, INITIAL_SHIPS } from "@/constants/game";
import { createEmptyBoard } from "@/utils/helpers";
import { useState } from "react";

export const usePlayer = (playerName: PlayersNames) => {
  const [shipBoard, setShipBoard] = useState<BoardType>([
    ...createEmptyBoard(BOARD_SIZE),
  ]);
  const [battleBoard, setBattleBoard] = useState<BoardType>([
    ...createEmptyBoard(BOARD_SIZE),
  ]);
  const [availableShips, setAvailableShips] = useState([...INITIAL_SHIPS]);
  const [score, setScore] = useState(0);

  const placeShip = (startX: number, startY: number, vertical: boolean) => {
    const ships = [...availableShips];
    if (ships.length === 0) {
      throw new TypeError("You don't have more ships to place");
    }

    const [shipLength, ...remaining] = ships.slice(0);
    const coordinates: Coordinates[] = [];
    for (let i = 0; i < shipLength; i++) {
      coordinates.push({
        x: startX + (vertical ? i : 0),
        y: startY + (vertical ? 0 : i),
      });
    }

    const isValidPlacement = coordinates.every((coord) => {
      return (
        coord.x >= 0 &&
        coord.x < BOARD_SIZE &&
        coord.y >= 0 &&
        coord.y < BOARD_SIZE &&
        shipBoard[coord.x][coord.y] === null
      );
    });

    if (!isValidPlacement) {
      throw new TypeError("Invalid placement of ship.");
    }

    setShipBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      coordinates.forEach((coord) => {
        newBoard[coord.x][coord.y] = "ship";
      });
      return newBoard;
    });

    setAvailableShips(remaining);
  };

  const noteMadeAttack = (x: number, y: number, result: CellType) => {
    if (result === "hit") {
      setScore((prev) => prev + 1);
    }

    setBattleBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[x][y] = result;
      return newBoard;
    });
  };

  const receiveAttack = (x: number, y: number) => {
    const cell = shipBoard[x][y];
    if (cell === "ship") {
      return "hit";
    }

    return "miss";
  };

  return {
    playerName,
    shipBoard,
    battleBoard,
    placeShip,
    noteMadeAttack,
    receiveAttack,
    availableShips,
    finishedPlacing: availableShips.length === 0,
    score,
  };
};
