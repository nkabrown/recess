'use strict';

export default class SampleSpace {
  constructor(el) {
    this.mount = el;
    this.data = this.tabulate();
  }

  init() {

    // we will need to constrain our coordinate system to show axes and labels
    const margin = { top: 20, right: 20, bottom: 40, left: 40 },
          width = document.getElementsByClassName('sample-space')[0].clientWidth - 100 - margin.right - margin.left,
          height = document.getElementsByClassName('sample-space')[0].clientWidth - 100 - margin.top - margin.bottom;

    // define a container and coordinate system for our visualization
    const graph = d3.select(this.mount).select('svg')
       .attr('width', width + margin.right + margin.left)
       .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const faces = [1, 2, 3, 4, 5, 6];

    // define scale, input domain and output range
    const x = d3.scalePoint()
       .padding(0.5)
       .domain(faces)
       .range([0, width]);

    const y = d3.scalePoint()
       .padding(0.5)
       .domain(faces)
       .range([height, 0]);

    // functions that generate axes
    const xAxis = d3.axisBottom(x),
          yAxis = d3.axisLeft(y);

    graph.append('g')
       .attr('class', 'x-axis')
       .attr('transform', `translate(0, ${height})`)
       .call(xAxis);

    graph.append('g')
       .attr('class', 'y-axis')
       .call(yAxis);

   graph.data(this.data);
  }

  tabulate() {
    const faces = [1, 2, 3, 4, 5, 6];

    const matrix = faces.map((elem, i, obj) => obj.map(x => [x, obj[i]])).reverse();

    return matrix;
  }
}
