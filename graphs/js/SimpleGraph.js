/*
 * Simple Graph
 * 
 * Simple graphs do not have self-loops or multi-edges
 * Note: direction is already encoded into edge symbols
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

  // return the neighborhood of a vertex in the graph
  // vertex -> set of neighbors (open) or join of set of neighbors with vertex (closed)
  neighborhood(v, type, neighborhood = []) {
    type === 'open'
      ? neighborhood = this.endpts(v).map(v => v)
      : (neighborhood = this.endpts(v).map(v => v),
        neighborhood.push(v),
        neighborhood);

    return neighborhood
  }
}
