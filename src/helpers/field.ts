import { incrementNeighbors } from './cellManipulator';

export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Field = Cell[][];
export type Coords = [number, number];

export const CellState: Record<string, Cell> = {
  empty: 0,
  mine: 9,
  hidden: 10,
  mark: 11,
  weakMark: 12,
};

/**
 * Create empty field
 *
 * Example emptyFieldGenerator(2)
 * [
 *   [0, 0],
 *   [0, 0],
 * ]
 *
 * @param {number} size
 * @param {Cell} state
 * @returns {Field}
 */
export const emptyFieldGenerator = (
  size: number,
  state: Cell = CellState.empty
): Field => {
  return new Array(size).fill(null).map(() => new Array(size).fill(state));
};

/**
 * Generate field with mines
 * Cell has a range between 0 and 9.
 * 0 - Cell contains no mine
 * 0 to 8 - count of mines arrount the cell
 * 9 - special flag for the mine
 *
 * (1/9 ~ 11.11%)
 * Example fieldGenerator(3, 1/9) would return
 * [
 *   [1, 1, 1],
 *   [1, 9, 1],
 *   [1, 1, 1]
 * ]
 *
 * @param {number} size
 * @param {number} probability
 * @returns {Field}
 */
export const fieldGenerator = (size: number, probability: number): Field => {
  if (probability > 1 || probability < 0) {
    throw new Error('Probability must be between 0 and 1');
  }

  let unprocessedCells = size * size;
  let cellsWithMines = unprocessedCells * probability;

  const result = emptyFieldGenerator(size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (cellsWithMines === 0) {
        return result;
      }
      if (cellsWithMines / unprocessedCells > Math.random()) {
        result[y][x] = CellState.mine;
        incrementNeighbors([y, x], result);
        cellsWithMines--;
      }
      unprocessedCells--;
    }
  }

  return result;
};
