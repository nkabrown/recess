'use strict';

const fs = require('fs');

// read in file as a string
fs.readFile('day1-input.txt', 'utf-8', (error, str) => {
  const array = str.replace(/\+/g, '').split(/\n/).map(x => parseInt(x));

  // create an empty Set data structure to store seen sums
  // just as in mathematics "any two objects which appear as members
  // of the same set are different", i.e. duplicates are not allowed.
  const set = new Set();

  let boolean = true;
  let sum = 0;

  // repeat iteration over the array as many times as necessary
  while(boolean) {
    for (const num of array) {
      set.add(sum);
      sum += num;
     
      if (set.has(sum)) {
        boolean = false;
        console.log(sum);
        break;
      }
    }
  };
});
