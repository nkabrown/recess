'use strict';

const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (error, str) => {
  if (error) throw error;

  const wires = str.trim().split(/\n/).map(s => s.split(','));

  const orient = instr => {
    const direction = instr[0];
    const distance = instr.substring(1,);
    return [direction, +distance];
  };

  const switchcase = cases => key => key in cases ? cases[key] : 'ERROR: invalid direction';

  let path1 = [];
  let path2 = [];

  // create set of coordinates for each path segment
  const directions = {
    R: (dist, cord, path) => [...Array(dist).keys()].forEach(n => (cord[0] += 1, path.push(cord.map(x => x)))),
    L: (dist, cord, path) => [...Array(dist).keys()].forEach(n => (cord[0] -= 1, path.push(cord.map(x => x)))),
    U: (dist, cord, path) => [...Array(dist).keys()].forEach(n => (cord[1] += 1, path.push(cord.map(x => x)))),
    D: (dist, cord, path) => [...Array(dist).keys()].forEach(n => (cord[1] -= 1, path.push(cord.map(x => x))))
  };

  // collect coordinates of points visited in the plane
  let coordinates = [0, 0];
  wires[0].forEach(instr => {
    const instructions = orient(instr);  
    switchcase(directions)(instructions[0])(instructions[1], coordinates, path1);
  });

  coordinates = [0, 0];
  wires[1].forEach(instr => {
    const instructions = orient(instr);  
    switchcase(directions)(instructions[0])(instructions[1], coordinates, path2);
  });

  console.log(path1, path2);

  // find the sets of coordinate points visited by both points -- VERY SLOW
  const intersections = [];
  path1.forEach(cordA => {
    path2.forEach(cordB => {
      cordA[0] === cordB[0] ? (cordA[1] === cordB[1] ? intersections.push(cordA) : null) : null;
    }); 
  });
  console.log(intersections);

  // calculate the Manhattan distance for each set of coordinates -- |p1 - q1| + |p2 - q2|
  const taxicabDistance = (y1, y2) => Math.abs(0 - y1) + Math.abs(0 - y2);

  let minDistance = 5000000;
  intersections.forEach(cord => minDistance > taxicabDistance(cord[0], cord[1]) ? minDistance = taxicabDistance(cord[0], cord[1]) : null);

  // solution to part 1
  console.log(minDistance);
});
