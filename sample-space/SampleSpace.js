'use strict';

export default class SampleSpace {
  constructor(el, sides) {
    this.mount = el;
    this.sides = sides;
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

    // define scale, input domain and output range
    const x = d3.scalePoint()
       .padding(0.5)
       .domain(this.faces)
       .range([0, width]);

    const y = d3.scalePoint()
       .padding(0.5)
       .domain(this.faces)
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

    const offset = y.step() / 2;

    graph.selectAll('.data-band')
       .data(this.data)
     .enter().append('g')
       .attr('class', 'data-band')
       .attr('transform', (d, i) => `translate(0, ${i * y.step() + offset})`);

    d3.selectAll('.data-band')
       .each(function(row) {
         d3.select(this).selectAll('.point')
             .data(row)
           .enter().append('circle')
             .attr('class', 'point')
             .attr('r', 2)
             .attr('cx', d => x(d.x))
             .style('fill', '#444');
       });
  }

  event(roll) {
    const points = d3.selectAll('.point');
    points.transition(200).attr('r', 2).style('fill', '#444');
    points.each(function(d) {
      const point = d3.select(this);
      `${d.x}${d.y}` == roll ? point.transition().delay(200).duration(600).attr('r', 5).style('fill', '#f44336') : null;
    });
  }

  // the event of getting a total of x points in rolling two dice
  sum(roll1, roll2) {
    const points = d3.selectAll('.point');
    points.transition(200).attr('r', 2).style('fill', '#444');
    points.each(function(d) {
      const sum = d.x + d.y;
      const point = d3.select(this);
      sum == (roll1 + roll2) ? point.transition().delay(200).duration(500).attr('r', 5).style('fill', '#f44336') : null;
    });
  }

  tabulate() {
    this.faces = [...Array(this.sides).keys()].map(x => x + 1);
    // three representations for pairs of coordinates
    // 2 character string
    //const matrix = this.faces.map((elem, i, obj) => obj.map(x => `${x}${obj[i]}`)).reverse();

    // array with two elements
    //const matrix = this.faces.map((elem, i, obj) => obj.map(x => [x, obj[i]])).reverse();

    // object with x and y fields
    const matrix = this.faces.map((elem, i, obj) => obj.map(x => ({ x: x, y: obj[i] }))).reverse();

    return matrix;
  }
}
