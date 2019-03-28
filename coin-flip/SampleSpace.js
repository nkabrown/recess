'use strict';

export default class SampleSpace {
  constructor(el) {
    this.mount = el;
  }

  init() {
    // we will need to constrain our coordinate system to show labels
    const margin = {top: 20, right: 20, bottom: 20, left: 20},
          width = document.getElementsByClassName('sample-space')[0].clientWidth - 100 - margin.right - margin.left,
          height = document.getElementsByClassName('coin-holder')[0].clientHeight + 100;

    const svg = d3.select(this.mount).append('svg')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // svg lines are plotted with x1, y1, x2, y2
    svg.append('line')
        .attr('x1', margin.left + 15)
        .attr('x2', width - margin.right - 15) 
        .attr('y1', (height/2) - 40)
        .attr('y2', (height/2) - 40)
        .style('stroke', '#4c5f68')
        .style('stroke-width', 2);

    // svg circles are plotted with cx, cy, and given a radius r
    svg.append('circle')
       .attr('r', 20)
       .attr('cx', margin.left + 15)
       .attr('cy', (height/2) - 40)
       .style('fill', '#4c5f68');

    svg.append('circle')
       .attr('r', 20)
       .attr('cx', width - margin.right - 30)
       .attr('cy', (height/2) - 40)
       .style('fill', '#4c5f68');
  }
}
