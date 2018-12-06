'use strict';

const fs = require('fs');

// read in file as a string
fs.readFile('day1-input.txt', 'utf-8', (error, str) => {
  // remove '+' characters from string and split into an array on carriage return character and cast as a number type
  const array = str.replace(/\+/g, '').split(/\n/).map(x => parseInt(x));
  // sum input
  const result = array.reduce((arr, curr) => arr + curr, 0);
  console.log(result);
});
