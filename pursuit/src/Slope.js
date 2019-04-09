'use strict';

export default class SlopeGraph {
  constructor(el, d, m, w, h) {
    this.mount = el; 
    this.data = d;
    this.margin = m;
    this.width = w - this.margin.right - this.margin.left;
    this.height = h - this.margin.bottom - this.margin.top;
   }

  init() {
    const svg = d3.select(this.mount).append('svg')
        .attr('width', this.width + this.margin.right + this.margin.left)
        .attr('height', this.height + this.margin.bottom + this.margin.top)
      .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const x = d3.scalePoint()
        .domain(this.data.map(d => d.status))
        .range([60, this.width - 60]);

    const y = d3.scaleLinear()
        .domain([0, 100000])
        .range([this.height, 0]);

    const xAxis = d3.axisBottom(x),
          yAxis = d3.axisLeft(y)
                      .ticks(10)
                      .tickSizeInner(-this.width)
                      .tickPadding(10)
                      .tickFormat(d3.format('$,'));
    
    svg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${this.height + 20})`)
        .call(xAxis);

    const line = d3.line()
        .x(d => x(d.status))
        .y(d => y(d.income));

    svg.append('path')
        .datum(this.data)
        .attr('fill', 'none')
        .attr('stroke', '#4242ea')
        .attr('stroke-width', 2)
        .attr('d', line);

    svg.selectAll('.point')
        .data(this.data)
      .enter().append('circle')
        .attr('class', 'point')
        .attr('r', 6)
        .attr('cx', d => x(d.status))
        .attr('cy', d => y(d.income))
        .attr('fill', '#fff')
        .attr('stroke', '#4242ea')
        .attr('stroke-width', 2);

    svg.append('text')
        .attr('dy', '1.3em')
        .attr('x', d => x(this.data[0].status) - 30)
        .attr('y', d => y(this.data[0].income))
        .attr('fill', '#000')
       .text(`${d3.format('$,')(this.data[0].income)}`);

    svg.append('text')
        .attr('dy', '-0.9em')
        .attr('x', d => x(this.data[1].status) - 30)
        .attr('y', d => y(this.data[1].income))
        .attr('fill', '#000')
        .text(`${d3.format('$,')(this.data[1].income)}`);
  }
}
