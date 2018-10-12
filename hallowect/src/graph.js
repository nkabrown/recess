// we will need to constrain our coordinate system to show axes and labels
var margin = { top: 20, right: 20, bottom: 20, left: 20 };
var width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

// define a container and coordinate system for our visualization
var graph = d3.select('#mount').append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
  // add a group element so we can apply transformations and inherit attributes to all of its children
  .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// load data from csv file
d3.csv('halloween.csv').then(data => {
  console.log(data); 

  // explain scales for our x and y axes
  // define scale and output range
  var x = d3.scaleLinear()
       .range([0, width]);

  var y = d3.scaleLinear()
       .range([height, 0]);

  // functions that generate axes
  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);

  // domain of input values to be mapped to output range
  x.domain([0, 10]);
  y.domain([0, 10]);

  graph.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

  graph.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

  // data has to be an array of objects bound to html elements with this pattern
  graph.selectAll('.point')
      .data(data)
    .enter().append('circle')
      .attr('class', 'point')
      .attr('r', 5)
      .attr('cx', d => x(d.spookiness))
      .attr('cy', d => y(d.cuteness))
      .style('fill', '#2fc3c7');
});
