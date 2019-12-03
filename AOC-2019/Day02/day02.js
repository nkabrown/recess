'use strict';

const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (error, str) => {
  if (error) throw error;

  const initial = str.split(',').map(x => parseInt(x));

  const switchcase = cases => key => key in cases ? cases[key] : `ERROR: key not found`;

  // factory for computers
  const Computer = (program, pointer, instructions, name) => ({
    memory: program,
    pointer,
    cpu: switchcase(instructions),
    name
  });

  const runtime = (computer) => {
    let run = true;

    const lookup = (address) => computer.memory[address];
    const write = (address, value) => computer.memory[address] = value;
    const updateHead = () => computer.pointer = computer.pointer + 4;

    const instructions = {
      1: (fst, snd, store) => (write(lookup(store), (lookup(lookup(fst)) + lookup(lookup(snd)))), updateHead()),
      2: (fst, snd, store) => (write(lookup(store), (lookup(lookup(fst)) * lookup(lookup(snd)))), updateHead()),
      99: () => run = false
    };

    // initialize computer with instructions
    computer.cpu = switchcase(instructions);

    while(run) {
      computer.cpu(lookup(computer.pointer))(computer.pointer + 1, computer.pointer + 2, computer.pointer + 3);
    }

    // solution to part 1
    console.log(computer.memory[0]);

    // solution to part 2
    computer.memory[0] === 19690720 ? console.log('Answer is ', 100 * computer.memory[1] + computer.memory[2]) : null;
  };

  const program = initial.map(x => x);
  program[1] = 12, program[2] = 2;
  runtime(Computer(program, 0, {}, 'intcodes'));

  const range = [...Array(100).keys()];

  // calculate the cartesian product
  const cartesianProduct = (A, B) => {
    let product = [];
    A.forEach((a, i) => {
      B.forEach((b, j) => {
        product.push([A[i], B[j]]);
      });
    });
    return product;
  };

  const product = cartesianProduct(range, range);

  product.forEach((p, i) => {
    const program = initial.map(x => x);
    program[1] = p[0], program[2] = p[1];
    runtime(Computer(program, 0, {}, `intcodes-${p[0]}-${p[1]}`));
  });
});
