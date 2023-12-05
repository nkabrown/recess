/*
 * AOC 2023 Day 04 - Part 01
 *
 * Given a list of scratchcards, for each scratch card find which of your numbers match the winning numbers. 
 * The first match is worth 1 point and each further match doubles the points. Sum up all the points for each scratch card.
 *
 */
import { fullPath, sum } from '../utils.js';
import { open } from 'node:fs/promises';

const calculateWinnings = (line: string): number => {
  let points: number = 0;
  const lists: string[] | null = line.match(/(?<=:)(.*)(?=\|)|(?<=\|)(.*)/g);
  if (lists) {
    const winningNumbers: Set<string> = new Set(lists[0].trim().split(/\s+/));
    const numbers: string[] = lists[1].trim().split(/\s+/);
    for (const number of numbers) {
      if (winningNumbers.has(number)) {
        points === 0 ? points += 1 : points *= 2;
      }
    }
  }
  return points;
};

(async () => {
  const file = await open(fullPath(import.meta.url, './scratchcards.txt'));

  let points: number[] = []
  for await (const line of file.readLines()) {
    points.push(calculateWinnings(line));
  }

  const total = sum(points);
  console.log(total);
})();
