/* Day 01
 *
 * https://adventofcode.com/2023/day/1
 *
 * Given a polluted calibration document, filter each line for digits (in numeral or numeric form), restore the two digit calibration value, and then sum all the calibration values.
 *
 * - convert numerals to numeric digits
 * - filter digits from lines of text
 * - identify the first and last digit in each line of text which combined make the two digit calibration value
 * - sum all the calibration values
 *
 * Read lines, filter digits, produce a calibration value, and then sum the calibration values of all lines.
 */
import { fullPath } from '../utils.js';
import { open } from 'node:fs/promises';

const numeralsToNumbers: Record<string, string>= {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4', 
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
};

const mapNumeralsToNumbers = new Map<string, string>(Object.entries(numeralsToNumbers));

// filter digits in any form from lines of text, even overlapping numerals
const findAllDigits = (line: string): string[] | null => Array.from(
  line.matchAll(/(?=(?<digit>\d|one|two|three|four|five|six|seven|eight|nine))/g),
  arr => arr.groups?.digit || ''
);

(async () => {
  const file = await open(fullPath(import.meta.url, './calibration-document.txt'));

  const calibrationValues: number[] = [];

  for await (const line of file.readLines()) {
    const digits = findAllDigits(line);
    if (digits) {
      // duplicate digit for arrays of length 1 and combine first and last digit for arrays of length 2 or greater
      const value: number  = Number(digits
        .map(d => mapNumeralsToNumbers.get(d) || d)
        .map(
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
