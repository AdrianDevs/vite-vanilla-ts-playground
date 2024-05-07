import { describe, expect, it } from 'vitest';
import {
  algoQuestion,
  islandsQuestion,
  reduceQuestion,
  sumQuestion,
} from '../src/lib/questions1';

describe('questions', () => {
  it('reduce', () => {
    expect(reduceQuestion([1, 1, 2, 2, 2, 3])).toEqual({ 1: 2, 2: 3, 3: 1 });
  });
  it('islands simple', () => {
    const input = [
      [1, 0],
      [0, 1],
    ];

    expect(algoQuestion(input)).toEqual(2);
  });
  it('islands', () => {
    const input = [
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1],
    ];

    expect(algoQuestion(input)).toEqual(3);
  });
  it('islands 1', () => {
    const input = [
      [1, 1],
      [0, 1],
    ];

    expect(islandsQuestion(input)).toEqual(1);
  });
  it('islands 2', () => {
    const input = [
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1],
    ];

    expect(islandsQuestion(input)).toEqual(3);
  });
  it('islands 3', () => {
    const input = [
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 1, 0, 1],
      [0, 0, 0, 0, 0],
    ];

    expect(islandsQuestion(input)).toEqual(2);
  });
  it('sumArray', () => {
    const input = [2, 7, 11, 14, 17];
    const wanted = 9;

    expect(sumQuestion(input, wanted)).toEqual([2, 7]);
  });
});
