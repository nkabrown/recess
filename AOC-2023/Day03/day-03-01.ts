/*
 * AOC Day 03 - Part 01
 *
 * Given an engine schematic of numbers, symbols, and periods, find the part numbers,
 * which are numbers adjacent to symbols, even diagonally adjacent, and then sum the part numbers.
 *
 * - read file into a 2d array of characters
 * - find the set of symbols used
 * - walk the 2d array
 *   - scan the rows for digits
 *   - for each digit check the row for adjacent symbols and digits
 *   - for each digit check the adjacent columns, even diagonally, for symbols
 *   - collect  adjacent digits in a row into a number
 *   - mark numbers adjecent to a symbol in the row or columns as part numbers
 *   - sum the part numbers
 *
 */
import { fullPath, sum } from '../utils.js';
import { type FileHandle, open } from 'node:fs/promises';

(async () => {
  const file: FileHandle = await open(fullPath(import.meta.url, './engine-schematic.txt'));

  const partNumbers: number[] = [];
  const matrix: string[][] = [];

  for await (const line of file.readLines()) {
    matrix.push(line.split(''));
  }

  // find set of symbols by filtering out digits and periods
  const symbols: Set<string> = new Set(matrix.flat().filter((char) => !char.match(/\d|\./)));

  for (let i = 0; i < matrix.length; i++) {
    // bookkeeping
    const previousRow = matrix[i - 1] || [];
    const nextRow = matrix[i + 1] || [];
    let number: string = '';
    let isPartNumber: boolean = false;
    for (let j = 0; j < matrix[i].length; j++) {
      // if character is a digit
      if (matrix[i][j].match(/\d/)) {
        number += matrix[i][j];
        [matrix[i][j-1], matrix[i][j+1], previousRow[j-1], previousRow[j], previousRow[j+1], nextRow[j-1], nextRow[j], nextRow[j+1]].forEach((char) => {
          if (symbols.has(char)) {
            isPartNumber = true;
          }
        });
      } else {
        if (number) {
          if (isPartNumber) partNumbers.push(Number(number));
          number = '';
          isPartNumber = false;
        }
      }
    }
    if (number && isPartNumber) partNumbers.push(Number(number));
  }

  // sum the part numbers
  const total = sum(partNumbers);
  console.log(total);
})();
