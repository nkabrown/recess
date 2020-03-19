/*
 * Graph 
 *
 * G = (V, E)
 */
export default class Graph {
  // returns a null graph
  constructor() {
    this.vertices = [];
    this.edges = [];
  }

  isEmpty() {
    return this.vertices.length > 0 ? false : true;
  }
}
