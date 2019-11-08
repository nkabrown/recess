'use strict';

console.log('table smoketest');

export default class Table {
  constructor(el, d, w, h) {
    this.mount = el;
    this.data = d;
    this.width = w;
    this.height = h;
  }

  init() {
    const table = d3.select(this.mount)
        .append('table')
        .attr('width', this.width)
        .attr('height', this.height)
        .html(`<thead></thead><tbody></tbody>`);

    table.select('thead')
        .append('tr')
        .selectAll('th')
        .data(Object.keys(this.data[0].metrics))
      .enter().append('th')
        .text(d => d);

    const row = table.select('tbody')
        .selectAll('.row')
        .data(this.data)
      .enter().append('tr')
        .attr('class', 'row');

    row.selectAll('.cell')
        .data(d => Object.values(d.metrics))
      .enter().append('td')
        .attr('class', 'cell')
        .text(d => d);
  }
}
