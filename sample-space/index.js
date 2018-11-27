'use strict';
import Die from '/Die.js';
import SampleSpace from '/SampleSpace.js';

// helper function
const switchcase = cases => key => unknown => key in cases ? cases[key] : unknown;

const layout = (mount, caseName) => {
  d3.text('templates/figure.html').then(str => {
    const interactivity = () => d3.select(mount).append('div').attr('class', 'dice-ui');
    const figure = str => d3.select(mount).append('div').attr('class', 'sample-space').html(str);
    const horizontal = {
      'right': () => { interactivity(); figure(str); },
      'left': () => { figure(str); interactivity(); }
    };

    switchcase(horizontal)(caseName)(() => { console.error("unknown layout orientation: must be '%s' or '%s'", Object.keys(horizontal)[0], Object.keys(horizontal)[1]); })();

    d3.select('.dice-ui').append('div')
       .attr('class', 'dice-container');

    const die1 = new Die('.dice-container', 6, 0),
          die2 = new Die('.dice-container', 6, 1);
    die1.init(), die2.init();

    d3.select('.dice-ui').insert('button', ':first-child')
       .attr('id', 'roll-control')
       .text('Roll Dice')
       .on('click', () => {
          d3.select('#die-0').text(die1.roll());
          d3.select('#die-1').text(die2.roll());
       });

    const space = new SampleSpace('.sample-space');
    space.init();
  });
};

layout('#mount', 'left');
