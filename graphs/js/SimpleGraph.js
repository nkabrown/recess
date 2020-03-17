/*
 * Simple Graph
 * 
 * Simple graphs do not have self-loops or multi-edges
 * A constructor for undirected graphs for now
 * Though direction is sort of already encoded into edge symbols
 */
import Graph from './Graph.js';

export default class SimpleGraph extends Graph {
  constructor(v = [], e = []) {
    super();
    this.vertices = v;
    this.edges = e;
    this.table = {};
  }

  init() {
    this.tabulate();
  }

  // construct adjacency table
  tabulate() {
    const pairs = this.edges.map(edge => edge.split(''));
    let arr;
    const writeRow = (key, val) => this.table[key] !== undefined 
      ? (arr = this.table[key], arr.push(val), this.table[key] = arr) 
      : this.table[key] = [val];

    pairs.forEach(pairing => {
      const a = pairing[0], b = pairing[1]; 
      writeRow(a, b), writeRow(b, a);
    });
  }

  // adjacency table lookup
  // vertex -> set of neighbors
  endpts(v) {
    return this.table[v];
  }
}
