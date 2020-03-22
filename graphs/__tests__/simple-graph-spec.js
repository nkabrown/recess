'use strict';
import SimpleGraph from '../js/SimpleGraph.js';

const test = require('tape');

// Euler's Degree-Sum Theorem
test("The sum of the degrees of the vertices of a graph is twice the number of edges", t => {
  const graph = new SimpleGraph(['p', 'q', 'r', 's'], ['pq', 'pr', 'ps', 'rs', 'qs']);
  graph.init();
  // sum of the degrees
  const sum = graph.degreeSequence().reduce((acc, curr) => (acc += curr, acc), 0);
  // number of edges
  const edges = graph.edges.length;
  t.plan(1);
  t.equal(sum / edges, 2);
  t.end();
});
