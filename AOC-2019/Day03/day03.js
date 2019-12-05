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

  // to improve performance represent the coordinates as strings instead of 2 place arrays
  // create set of coordinates for each path segment
  const directions = {
    R: (dist, cord, path) => [...Array(dist).keys()].forEach(n => (cord[0] += 1, path.push(`X${cord[0]}Y${cord[1]}`))),
    L: (dist, cord, path) => [...Array(dist).keys()].forEach(n => (cord[0] -= 1, path.push(`X${cord[0]}Y${cord[1]}`))),
    U: (dist, cord, path) => [...Array(dist).keys()].forEach(n => (cord[1] += 1, path.push(`X${cord[0]}Y${cord[1]}`))),
    D: (dist, cord, path) => [...Array(dist).keys()].forEach(n => (cord[1] -= 1, path.push(`X${cord[0]}Y${cord[1]}`)))
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

  // remove duplicates by creating sets
  const A = new Set(path1);
  const B = new Set(path2);
  // find the intersection of both sets of points A ∩ B = C
  const C = new Set([...A].filter(x => B.has(x)));
  const intersections = [...C];
  console.log(intersections);

  // calculate the Manhattan distance for each set of coordinates -- |p1 - q1| + |p2 - q2|
  const taxicabDistance = (cord) => Math.abs(0 - cord[0]) + Math.abs(0 - cord[1]);

  // cast representation of coordinates as strings back into 2 place array
  const unpack = str => {
    const index = str.indexOf('Y');
    const x = parseInt(str.substring(1, index));
    const y = parseInt(str.substring(index + 1,));
    return [x, y];
  };

  let minDistance = 5000000;
  intersections.forEach(cord => minDistance > taxicabDistance(unpack(cord)) ? minDistance = taxicabDistance(unpack(cord)) : null);

  // solution to part 1
  console.log(minDistance);

  // calculate the sum of steps it takes both wires to reach an intersection point the first time
  // test for matching coordinates
  const match = (cordA, cordB) => cordA === cordB;

  const sums = [];
  intersections.forEach(int => {
    const firstIndex = path1.findIndex(e => match(e, int));
    const secondIndex = path2.findIndex(e => match(e, int));
    sums.push(firstIndex + secondIndex);
  });

  // remember to add 2 to the smallest result
  console.log(sums.sort());
});
