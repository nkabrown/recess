'use strict';
import SampleSpace from '../SampleSpace.js';

const test = require('tape');

test("data length is equal to n choose k", t => {
  const faces = [1, 2, 3, 4, 5, 6];
  const space = new SampleSpace('#mount');
  space.tabulate(faces);
  const count = space.data.reduce((acc, curr) => acc + curr.length, 0);
  t.plan(1);
  t.equal(count, 6*6);
  t.end();
});
