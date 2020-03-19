import SimpleGraph from './SimpleGraph.js';

const G = new SimpleGraph(['p', 'q', 'r', 's'], ['pq', 'pr', 'ps', 'rs', 'qs']);
G.init();

// create a null graph
const H = new SimpleGraph();

console.log(G);
console.log(G.endpts('q'));
console.log(H);
console.log(H.isEmpty());
console.log(G.isEmpty());

console.log(G.neighborhood('q', 'open'));
console.log(G.neighborhood('q', 'closed'));
