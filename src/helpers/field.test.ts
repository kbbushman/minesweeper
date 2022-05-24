import { Cell, CellState, emptyFieldGenerator, fieldGenerator } from './field';

const { empty, mine, hidden } = CellState;

const cellWithBombFilter = (cell: Cell) => cell === mine;

describe('Field Generator', () => {
  describe('emptyFieldGenerator tests', () => {
    it('Should generate a 2x2 field with empty state', () => {
      const result = emptyFieldGenerator(2);

      expect(result).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });

    it('Should generate a 3x3 field with empty state', () => {
      const result = emptyFieldGenerator(3);

      expect(result).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ]);
    });

    it('Should generate a 3x3 field with hidden state', () => {
      const result = emptyFieldGenerator(3, hidden);

      expect(result).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ]);
    });
  });

  describe('fieldGenerator tests', () => {
    it('Should not accept density greater than 1', () => {
      const errorText = 'Probability must be between 0 and 1';

      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });

    it('Should create smallest field without mines', () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
    });

    it('Should create large field without mines', () => {
      expect(fieldGenerator(10, 0)).toStrictEqual([
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
      ]);
    });

    it('Should create smallest field with mine', () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[mine]]);
    });

    it('Should create 2x2 field with mines', () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [mine, mine],
        [mine, mine],
      ]);
    });

    it('Should create 2x2 field with 50% probability of mines', () => {
      const field = fieldGenerator(2, 0.5);
      const flatField = field.flat();
      const cellsWithMines = flatField.filter((cell) => cell === mine);
      const emptyCells = flatField.filter((cell) => cell === 2);

      expect(cellsWithMines).toHaveLength(2);
      expect(emptyCells).toHaveLength(2);
    });

    it('Should create 10x10 field with 1/4 mines (25 mines)', () => {
      const size = 10;
      const mines = 25;

      const probability = mines / (size * size);
      const field = fieldGenerator(size, probability);

      const flatField = field.flat();

      expect(flatField.filter(cellWithBombFilter)).toHaveLength(25);
    });
  });
});
