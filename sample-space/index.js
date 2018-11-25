'use strict';

// return result between 1 and number of sides on die
// cannot roll a zero
const roll = sides => Math.ceil(Math.random() * Math.floor(sides));

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

    switchcase(horizontal)(caseName)('unknown layout')();
  });
};

layout('#mount', 'right');
