import SimpleGraph from './SimpleGraph.js';

const G = new SimpleGraph(['p', 'q', 'r', 's'], ['pq', 'pr', 'ps', 'rs', 'qs']);
G.init();

// create a null graph
const H = new SimpleGraph();

console.log(G);
console.log(G.endpts('p'));
console.log(H);
