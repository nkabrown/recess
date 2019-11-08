'use strict';

export default class Gantt {
  constructor(el, d, m, w, h, q) {
    this.mount = el;
    this.data = d;
    this.margin = m;
    this.width = w - this.margin.left - this.margin.right;
    this.height = h - this.margin.top - this.margin.bottom;
    this.quarter = q;
  }

  init() {
    const graph = d3.select(this.mount)
        .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const y = d3.scaleBand().rangeRound([this.height, 0]);
    const x = d3.scaleTime().domain([new Date(2019, 6), new Date(2019, 8, 31)]).range([0, this.width]);

    const xAxis = d3.axisTop(x).ticks(d3.timeMonth).tickFormat(d3.timeFormat('%b')).tickSize(35);
    const yAxis = d3.axisLeft(y);

    y.domain(this.data.reverse().map(d => d.channel));

    graph.append('g')
        .attr('class', 'x-axis')
        .call(xAxis);

    graph.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

    d3.selectAll('.x-axis text')
        .style('font-size', '12px')
        .attr('transform', 'translate(102, 28)');
  }
}
