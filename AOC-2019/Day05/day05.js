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
  //const test = '3,0,4,0,99';
  //const test = '1002,4,3,4,33';
  //const test = '1101,100,-1,4,0';
  const program = str.split(',').map(x => parseInt(x));

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
    const valuespicker = n => {
      const params = [...Array(n).keys()].map(i => computer.pointer + (i+ 1));
      return params;
    }

    const length = n => {
      return +n === 1 || +n === 2 ? 5 : (+n === 3 || +n === 4 ? 3 : 0);
    };

    // returns an array of opcode and parameter modes
    const deconstruct = inst => {
      let str = inst.toString();
      const opcode = str.length > 1 ? str.substring(str.length - 2,) : str.padStart(2, '0');
      const l = length(opcode);
      str.length === l ? null : str = str.padStart(l, '0');
      const modes = str.substring(0, str.length - 2).split('');
      modes.reverse().unshift(opcode);
      const instructs = modes.map(x => parseInt(x));
      return instructs;
    };

    computer.load = deconstruct;

    // parameter modes
    const modes = {
      0: x => lookup(x),
      1: (x) => x
    };

    // initialize computer with parameter modes
    computer.mode = switchcase(modes);

    let params;
    const instructions = {
      1: (modes) => (params = valuespicker(3), write(computer.mode(modes[3])(params[2]), (computer.mode(modes[1])(lookup(params[0])) + computer.mode(modes[2])(lookup(params[1])))), updateHead(params.length + 1)),
      2: (modes) => (params = valuespicker(3), write(computer.mode(modes[3])(params[2]), (computer.mode(modes[1])(lookup(params[0])) * computer.mode(modes[2])(lookup(params[1])))), updateHead(params.length + 1)),
      3: (modes) => (reader.prompt(), updateHead(2)),
      4: (modes) => (params = valuespicker(1), read(params[0]), updateHead(params.length + 1)),
      99: (modes) => run = false
    };

    // initialize computer with instructions
    computer.cpu = switchcase(instructions);

    const execution = () => {
      while(run) {
        computer.cpu(computer.load(lookup(computer.pointer))[0])(modes);
      }
    };

    reader.prompt();

    reader.on('line', input => {
      write(computer.memory[1], +input);
      execution();
      reader.close()
    });
  };

  runtime(Computer(program, 0, {}, 'intcodes'));
});
