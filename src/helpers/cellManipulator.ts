import { Cell, Coords, Field } from './field';

/**
 * Get indexes for all neighboring cells
 * @param {Coords} coords
 * @returns {Record<string, [number, number]>}
 */
export const getNeighborItems = ([y, x]: Coords): Record<
  string,
  [number, number]
> => {
  return {
    top: [y - 1, x],
    topRight: [y - 1, x + 1],
    right: [y, x + 1],
    rightBottom: [y + 1, x + 1],
    bottom: [y + 1, x],
    bottomLeft: [y + 1, x - 1],
    left: [y, x - 1],
    leftTop: [y - 1, x - 1],
  };
};

/**
 * Check item in the field
 * @param {Coords} coords
 * @param {Field} field
 * @returns {boolean}
 */
export const checkItemInField = (
  [y, x]: Coords,
  { length }: Field
): boolean => {
  return y >= 0 && x >= 0 && length - y > 0 && length - x > 0;
};

/**
 * Increment neighbour items for cell with coords
 * @param {Coords} coords
 * @param {Field} field
 * @returns {Cell}
 */
export const incrementNeighbors = (coords: Coords, field: Field): Field => {
  const items = getNeighborItems(coords);

  for (const item of Object.values(items)) {
    if (checkItemInField(item, field)) {
      const [y, x] = item;
      const cell = field[y][x];
      if (cell < 8) {
        field[y][x] = (cell + 1) as Cell;
      }
    }
  }

  return field;
};
