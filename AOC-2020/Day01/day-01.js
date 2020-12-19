'use strict';

const fs = require('fs');

// Day 01 AOC 2020
fs.readFile('expense-report.txt', 'utf-8', (error, str) => {
  if (error) throw error;

  const testInput = [1721, 979, 366, 299, 675, 1456];

  // transform input string into an array of numbers
  const input = str.trim().split(/\n/).map(x => parseInt(x));

  const entries = new Set(input);

  // Given a goal sum and a set of numbers to pick from finds the 2 numbers that add to goal sum.
  const findPair = (z) => (set) => {
    // Solve for y in x + y = z, or y = z - x and check for set memebership
    for (const x of set.values()) {
      let y = z - x;
      if (set.has(y))
        return [x , y];
    }
    return null;
  };

  const multiply = ([a, b]) => a * b;

  console.log(multiply(findPair(2020)(entries)));
});
