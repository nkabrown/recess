'use strict';

const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (error, str) => {
  if (error) throw error;

  const program = str.split(',').map(x => parseInt(x));

  const switchcase = cases => key => key in cases ? cases[key] : `ERROR: key not found`;

  const Computer = (program, pointer, instructions, name) => ({
    memory: program,
    pointer,
    cpu: switchcase(instructions),
    name
  });

  const lookup = (address, memory) => memory[address];
  const write = (address, memory, value) => computer.memory[address] = value;
  const updateHead = (pointer) => computer.pointer = pointer + 4;

  const instructions = {
    1: (fst, snd, store) => (write(lookup(store, computer.memory), computer.memory, (lookup(lookup(fst, computer.memory), computer.memory) + lookup(lookup(snd, computer.memory), computer.memory))), updateHead(computer.pointer)),
    2: (fst, snd, store) => (write(lookup(store, computer.memory), computer.memory, (lookup(lookup(fst, computer.memory), computer.memory) * lookup(lookup(snd, computer.memory), computer.memory))), updateHead(computer.pointer)),
    99: () => run = false
  };

  // factory for computers
  const computer = Computer(program, 0, instructions, 'intcodes');

  let run = true;

  while(run) {
    computer.cpu(lookup(computer.pointer, computer.memory))(computer.pointer + 1, computer.pointer + 2, computer.pointer + 3);
  }

  // solution to part 1
  console.log(computer.memory[0]);
});
