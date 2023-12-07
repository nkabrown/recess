/*
 * AOC Day 03 - Part 02
 *
 * Given an engine schematic of numbers, symbols, and periods, find the part numbers,
 * which are numbers adjacent to symbols, even diagonally adjacent. A '*' symbol with two 
 * adjacent part numbers is a gear. Its gear ratio is the product of those two numbers.
 * Sum all the gear ratios in the engine schematic.
 *
 */
import { fullPath, sum } from '../utils.js';  
import { type FileHandle, open } from 'node:fs/promises';

(async () => {
  const file: FileHandle = await open(fullPath(import.meta.url, './engine-schematic.txt'));
 
  const partNumbers: string[] = [];
  const gearRatios: number[] = [];
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
    let columns: string = '';
    let isPartNumber: boolean = false;

    for (let j = 0; j < matrix[i].length; j++) {
      // if character is a digit
      if (matrix[i][j].match(/\d/)) {
        number += matrix[i][j];
        columns += `${j},`;
        [matrix[i][j-1], matrix[i][j+1], previousRow[j-1], previousRow[j], previousRow[j+1], nextRow[j-1], nextRow[j], nextRow[j+1]].forEach((char) => {
          if (symbols.has(char)) {
            isPartNumber = true;
          }
        });
      } else {
        if (number) {
          if (isPartNumber) partNumbers.push(`${i}:${columns}:${number}`);
          number = '';
          columns = '';
          isPartNumber = false;
        }
      }
    }
    if (number && isPartNumber) partNumbers.push(`${i}:${columns}:${number}`);
  }

  // which rows have * symbols and do they have two adjacent numbers?
  for (let i = 0; i < matrix.length; i++) {
    const previousRow = matrix[i - 1] || [];
    const nextRow = matrix[i + 1] || [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '*') {
        const parts: number[] = [];
        const rowRange = new RegExp(`(\\b${i-1}\\b|\\b${i}\\b|\\b${i+1}\\b)`);
        const columnRange = new RegExp(`(\\b${j-1}\\b|\\b${j}\\b|\\b${j+1}\\b)`);
        partNumbers.forEach((num) => {
          const [row, columns, partNumber] = num.split(':');
          if (rowRange.test(row) && columnRange.test(columns)) {
            parts.push(Number(partNumber));
          }
        });

        // must have two adjacent numbers to be a gear
        if (parts.length > 1) {
          const gearRatio = parts[0] * parts[1];
          if (gearRatio) gearRatios.push(gearRatio);
        }
      }
    }
  }

  const total = sum(gearRatios);
  console.log(total);
})();
