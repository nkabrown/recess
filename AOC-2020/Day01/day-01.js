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

  // Given a goal sum and a set of numbers to pick from finds the 3 numbers that add to goal sum.
  const findTriple = (d) => (set) => {
    for (const a of set.values()) {
      let b = d - a;
      // find pair that sum to difference from goal sum.
      if (findPair(b)(set))
        return [a, ...findPair(b)(set)];
    }
    return null;
  };

  const multiply = ([a, b]) => a * b;
  const multiplyTriple = ([a, b, c]) => a * b * c;

  // Part 01 – (x + y = z) -> (x * y)
  console.log(multiply(findPair(2020)(entries)));
  // Part 02 – (a + b + c = d) -> (a * b * c)
  console.log(multiplyTriple(findTriple(2020)(entries)));
});
