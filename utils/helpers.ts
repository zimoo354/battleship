import { BOARD_SIZE } from "@/constants/game";
import { BoardType } from "@/types";

export const createEmptyBoard = (size: number): BoardType => {
  return Array.from({ length: size }, () => Array(size).fill(null));
};

const randomInt = (max: number) => Math.floor(Math.random() * max);

export const randomCoordinates = () => [
  randomInt(BOARD_SIZE),
  randomInt(BOARD_SIZE),
];

export const randomBoolean = () => Math.random() < 0.5;

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
