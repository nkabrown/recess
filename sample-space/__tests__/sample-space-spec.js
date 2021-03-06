'use strict';
import SampleSpace from '../SampleSpace.js';

const test = require('tape');

const faces = [1, 2, 3, 4, 5, 6];

test("data length is equal to number of points in sample space", t => {
  const space = new SampleSpace('#mount');
  space.tabulate(faces);
  const count = space.data.reduce((acc, curr) => acc + curr.length, 0);
  t.plan(1);
  // number of 2-tuples for a set of k objects (k²)
  t.equal(count, 6**2);
  t.end();
});

test("sample space data is correctly constructed", t => {
  const matrix = faces.map((elem, i, obj) => obj.map(x => ({ x: x, y: obj[i] }))).reverse();
  const S = [...new Set(matrix.flatMap(elem => elem))].sort();
  const space = new SampleSpace('#mount');
  space.tabulate(faces);
  t.plan(1)
  t.deepEqual([...new Set(space.data.flatMap(elem => elem))].sort(),  S);
  t.end();
});
