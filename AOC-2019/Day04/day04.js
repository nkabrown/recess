'use strict';

// password must be within range of 206938 to 679128
// and must have at least one double and digits never decrease left to right
const pattern = /00|11|22|33|44|55|66|77|88|99/

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
};

const extent = [...range(206938, 679128)];

const doubles = extent.reduce((acc, n) => (pattern.test(n) ? acc.push(n) : null, acc), []);

const passwords = doubles.reduce((acc, n) => (/1(?=.*0)|2(?=.*[0-1])|3(?=.*[0-2])|4(?=.*[0-3])|5(?=.*[0-4])|6(?=.*[0-5])|7(?=.*[0-6])|8(?=.*[0-7])|9(?=.*[0-8])/g.test(n) ? null : acc.push(n), acc), []);

// solution to part 1
console.log(passwords.length);
