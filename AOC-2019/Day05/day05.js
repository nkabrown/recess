'use strict';

const fs = require('fs');
const readline = require('readline');

fs.readFile('input.txt', 'utf-8', (error, str) => {
  if (error) throw error;

  // tests for working day 02 functionality
  //const test = '1,0,0,0,99';
  //const test = '2,3,0,3,99';
  //const test = '2,4,4,5,99,0';
  //const test = '1,1,1,4,99,5,6,0,99';

  // output whatever value you get as input
  const test = '3,0,4,0,99';
  const program = test.split(',').map(x => parseInt(x));

  const switchcase = cases => key => key in cases ? cases[key] : 'ERROR: key not found';

  // factory for computers
  const Computer = (program, pointer, instructions, name) => ({
    memory: program,
    pointer,
    cpu: switchcase(instructions),
    name
  });

  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'SHIP>'
  });

  const runtime = (computer) => {
    let run = true;

    const lookup = (address) => computer.memory[address];
    const write = (address, value) => computer.memory[address] = value;
    const read = (address) => console.log(lookup(lookup(address)));
    const updateHead = update => computer.pointer = computer.pointer + update;

    // dynamically construct parameter inputs for specific opcode instructions
    // returning an array of positions in the program
    const valuepicker = n => {
      const params = [...Array(n).keys()].map(i => computer.pointer + (i+ 1));
      return params;
    }

    let params;
    const instructions = {
      1: () => (params = valuepicker(3), write(lookup(params[2]), (lookup(lookup(params[0])) + lookup(lookup(params[1]))), updateHead(params.length + 1))),
      2: () => (params = valuepicker(3), write(lookup(params[2]), (lookup(lookup(params[0])) * lookup(lookup(params[1]))), updateHead(params.length + 1))),
      3: () => reader.prompt(),
      4: () => (params = valuepicker(1), read(params[0]), updateHead(params.length + 1)),
      99: () => run = false
    };

    // initialize computer with instructions
    computer.cpu = switchcase(instructions);

    const execution = () => {
      while(run) {
        computer.cpu(lookup(computer.pointer))();
      }
    };

    reader.prompt();

    reader.on('line', input => {
      write(computer.memory[1], +input);
      updateHead(2);
      execution();
      reader.close()
    });
  };

  runtime(Computer(program, 0, {}, 'intcodes'));
});
