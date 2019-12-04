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

  // intersecting coordinates found by my input
  //const intersections = [[ 225, 0 ],      [ 1009, 16 ],    [ 963, 286 ], [ 835, 286 ],    [ 789, 286 ],    [ 638, 318 ], [ 638, 435 ],    [ 638, 540 ],    [ 1010, 804 ], [ 1010, 435 ],   [ 1138, 384 ],   [ 1321, 804 ], [ 1141, 804 ],   [ 538, 16 ],     [ 538, 24 ], [ 538, 318 ],    [ 789, 370 ],    [ 835, 370 ], [ 1138, 370 ],   [ 1426, 302 ],   [ 1672, 342 ], [ 1672, 804 ],   [ 1139, 804 ],   [ 835, 591 ], [ -102, 883 ],   [ 80, 694 ],     [ 80, 627 ], [ 347, 347 ],    [ 721, 318 ],    [ 721, 24 ], [ 721, 16 ],     [ 938, 16 ],     [ 938, 77 ], [ 835, 192 ],    [ 789, 192 ],    [ -478, 514 ], [ -571, 326 ],   [ -571, 268 ],   [ -628, 2 ], [ -1545, -161 ], [ -1397, -218 ], [ -1610, 247 ], [ -2229, 932 ],  [ -2738, 975 ],  [ -2383, 1665 ], [ -2738, 1295 ]];

  // calculate the Manhattan distance for each set of coordinates -- |p1 - q1| + |p2 - q2|
  const taxicabDistance = (y1, y2) => Math.abs(0 - y1) + Math.abs(0 - y2);

  let minDistance = 5000000;
  intersections.forEach(cord => minDistance > taxicabDistance(cord[0], cord[1]) ? minDistance = taxicabDistance(cord[0], cord[1]) : null);

  // solution to part 1
  console.log(minDistance);

  // calculate the sum of steps it takes both wires to reach an intersection point the first time
  // test for matching coordinates
  const match = (cordA, cordB) => cordA[0] === cordB[0] && cordA[1] === cordB[1];

  const sums = [];
  intersections.forEach(int => {
    const firstIndex = path1.findIndex(e => match(e, int));
    const secondIndex = path2.findIndex(e => match(e, int));
    sums.push(firstIndex + secondIndex);
  });

  // remember to add 2 to the smallest result
  console.log(sums.sort());
});
