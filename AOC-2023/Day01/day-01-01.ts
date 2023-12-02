/* Day 01
 *
 * https://adventofcode.com/2023/day/1
 *
 * Given a calibration document containing polluted calibration values, filter each line for digits, restore the
 * two digit calibration value, and then sum all the calibration values.
 *
 * - filter digits from lines of text
 * - identify the first and last digit in each line of text which combined make the two digit calibration value
 * - sum all the calibration values
 *
 * Read lines, filter digits, produce a calibration value, and then sum the calibration values of all lines.
 */
import { fullPath } from '../utils.js';
import { open } from 'node:fs/promises';

// filter digits from lines of text
const findDigits = (line: string): string[] | null => line.match(/\d/g);

(async () => {
  const file = await open(fullPath(import.meta.url, './calibration-document.txt'));

  const calibrationValues: number[] = [];

  for await (const line of file.readLines()) {
    const digits = findDigits(line);
    if (digits) {
      // duplicate digit for arrays of length 1 and combine first and last digit for arrays of length 2 or greater
      const value: number  = Number(digits.map(
        (d, i, arr) => arr.length === 1
          ? `${d}${d}` 
          : i === 0
            ? `${d}${arr[arr.length - 1]}`
            : null
         ).filter(d => d)[0]);

      calibrationValues.push(value);
    }
  }
  // sum up calibration values
  const sum = calibrationValues.reduce((acc, val) => acc + val, 0);
  console.log(sum);
})();
