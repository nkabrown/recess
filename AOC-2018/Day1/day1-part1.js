'use strict';

const fs = require('fs');

// read in file as a string
fs.readFile('day1-input.txt', 'utf-8', (error, str) => {
  // pipeline of transformations over a collection
  // remove '+' characters from string
  const sumFrequency = input => input.replace(/\+/g, '')
            // split into an array on carriage return char
            .split(/\n/)
            // cast as number type
            .map(x => parseInt(x))
            // sum input
            .reduce((arr, cur) => arr + cur, 0);

  // send output to stdout
  console.log(sumFrequency(str));
});
