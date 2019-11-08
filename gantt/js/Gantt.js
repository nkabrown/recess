'use strict';

console.log('gantt smoketest');

export default class Gantt {
  constructor(el, d, m, w, h) {
    this.mount = el;
    this.data = d;
    this.margin = m;
    this.width = w;
    this.height = h;
  }

  init() {
    const graph = d3.select(this.mount)
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);
  }
}
