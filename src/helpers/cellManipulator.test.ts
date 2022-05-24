import {
  checkItemInField,
  getNeighborItems,
  incrementNeighbors,
} from './cellManipulator';
import { CellState, Field } from './field';

const { empty, mine } = CellState;

describe('getNeighborItems', () => {
  it('Should neighbors of coords [0, 0]', () => {
    expect(getNeighborItems([0, 0])).toStrictEqual({
      top: [-1, 0],
      topRight: [-1, 1],
      right: [0, 1],
      rightBottom: [1, 1],
      bottom: [1, 0],
      bottomLeft: [1, -1],
      left: [0, -1],
      leftTop: [-1, -1],
    });
  });

  it('Should neighbors of coords [3, 3]', () => {
    expect(getNeighborItems([3, 3])).toStrictEqual({
      top: [2, 3],
      topRight: [2, 4],
      right: [3, 4],
      rightBottom: [4, 4],
      bottom: [4, 3],
      bottomLeft: [4, 2],
      left: [3, 2],
      leftTop: [2, 2],
    });
  });
});

describe('checkItemField', () => {
  describe('Small Field tests', () => {
    const field: Field = [[empty]];

    it('Out of y range', () => {
      expect(checkItemInField([1, 0], field)).toBe(false);
    });

    it('Out of x range', () => {
      expect(checkItemInField([0, -1], field)).toBe(false);
    });

    it('In x and y range', () => {
      expect(checkItemInField([0, 0], field)).toBe(true);
    });
  });

  describe('Large Field tests', () => {
    const field: Field = [
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
    ];

    it('Out of x range', () => {
      expect(checkItemInField([5, 0], field)).toBe(false);
    });

    it('Out of x range with negative index', () => {
      expect(checkItemInField([-1, 0], field)).toBe(false);
    });

    it('Out of y range', () => {
      expect(checkItemInField([0, 5], field)).toBe(false);
    });

    it('In x and y range', () => {
      expect(checkItemInField([3, 4], field)).toBe(true);
    });
  });
});

describe('incrementNeighbors', () => {
  describe('Small Field tests', () => {
    it('Should not increment field with one item', () => {
      expect(incrementNeighbors([0, 0], [[mine]])).toStrictEqual([[mine]]);
    });

    it('Should increment 2x2 field with one mine', () => {
      expect(
        incrementNeighbors(
          [0, 0],
          [
            [mine, empty],
            [empty, empty],
          ]
        )
      ).toStrictEqual([
        [mine, 1],
        [1, 1],
      ]);
    });

    it('Should increment 2x2 field with two mines', () => {
      expect(
        incrementNeighbors(
          [0, 0],
          [
            [mine, empty],
            [empty, mine],
          ]
        )
      ).toStrictEqual([
        [mine, 1],
        [1, mine],
      ]);
    });
  });

  describe('3x3 Field tests', () => {
    it('Should increment 3x3 field with one centered mine', () => {
      expect(
        incrementNeighbors(
          [1, 1],
          [
            [empty, empty, empty],
            [empty, mine, empty],
            [empty, empty, empty],
          ]
        )
      ).toStrictEqual([
        [1, 1, 1],
        [1, mine, 1],
        [1, 1, 1],
      ]);
    });

    it('Should increment 3x3 field with two mines', () => {
      expect(
        incrementNeighbors(
          [1, 1],
          [
            [0, 1, mine],
            [0, mine, 1],
            [0, 0, 0],
          ]
        )
      ).toStrictEqual([
        [1, 2, mine],
        [1, mine, 2],
        [1, 1, 1],
      ]);
    });
  });

  describe('9x9 Field tests', () => {
    it('Should increment 9x9 field with seven mines', () => {
      expect(
        incrementNeighbors(
          [4, 5],
          [
            [9, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 9, 1],
            [0, 0, 1, 9, 1, 0, 2, 2, 2],
            [0, 0, 1, 1, 1, 0, 1, 9, 1],
            [0, 1, 1, 1, 1, 9, 1, 1, 1],
            [0, 1, 9, 2, 1, 1, 0, 0, 0],
            [0, 1, 1, 2, 9, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
          ]
        )
      ).toStrictEqual([
        [9, 1, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 9, 1],
        [0, 0, 1, 9, 1, 0, 2, 2, 2],
        [0, 0, 1, 1, 2, 1, 2, 9, 1],
        [0, 1, 1, 1, 2, 9, 2, 1, 1],
        [0, 1, 9, 2, 2, 2, 1, 0, 0],
        [0, 1, 1, 2, 9, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);
    });

    it('Should increment 9x9 Field with 11 mines', () => {
      expect(
        incrementNeighbors(
          [5, 4],
          [
            [9, 2, 9, 1, 0, 0, 1, 1, 1],
            [1, 2, 2, 2, 1, 0, 1, 9, 1],
            [0, 0, 1, 9, 1, 0, 2, 2, 2],
            [0, 0, 1, 1, 1, 0, 1, 9, 1],
            [0, 1, 1, 1, 1, 9, 1, 1, 1],
            [0, 1, 9, 2, 9, 1, 0, 0, 0],
            [0, 2, 2, 3, 9, 1, 1, 1, 1],
            [0, 1, 9, 2, 1, 1, 1, 9, 1],
            [0, 1, 1, 1, 0, 0, 1, 1, 1],
          ]
        )
      ).toStrictEqual([
        [9, 2, 9, 1, 0, 0, 1, 1, 1],
        [1, 2, 2, 2, 1, 0, 1, 9, 1],
        [0, 0, 1, 9, 1, 0, 2, 2, 2],
        [0, 0, 1, 1, 1, 0, 1, 9, 1],
        [0, 1, 1, 2, 2, 9, 1, 1, 1],
        [0, 1, 9, 3, 9, 2, 0, 0, 0],
        [0, 2, 2, 4, 9, 2, 1, 1, 1],
        [0, 1, 9, 2, 1, 1, 1, 9, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1],
      ]);
    });
  });
});
