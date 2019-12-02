'use strict';

const fs = require('fs');

// Day 01 AOC 2019
fs.readFile('input.txt', 'utf-8', (error, str) => {
  if (error) throw error;

  const calculateFuel = m => Math.floor(m / 3) - 2;

  // fuel requirements are inductively defined
  const fuelRequirement = (m, arr) => calculateFuel(m) >= 0 ? (arr.push(calculateFuel(m)), fuelRequirement(calculateFuel(m), arr)) : arr;

  // transform input string into array of numbers
  const input = str.trim().split(/\n/).map(x => parseInt(x));

  // solution to part 1
  const fuelLoad = input.reduce((acc, curr) => acc += calculateFuel(curr), 0);
  console.log(fuelLoad);

  const extraFuelLoads = input.reduce((acc, curr) => (acc.push(fuelRequirement(curr, []).reduce((a, b) => a + b)), acc), []);

  // solution to part 2
  const fullFuelLoad = extraFuelLoads.reduce((a, b) => a + b);
  console.log(fullFuelLoad);
});
