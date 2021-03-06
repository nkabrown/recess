'use strict';
import Coin from './Coin.js';
import SampleSpace from './SampleSpace.js';

d3.select('#mount').append('div')
    .attr('class', 'coin-ui')
  .append('div')
    .attr('class', 'coin-holder');

d3.select('#mount').append('div')
    .attr('class', 'sample-space');

const coin = new Coin('.coin-holder', 0);
coin.init();

const space = new SampleSpace('.sample-space');
space.init();

d3.select('.coin-ui').append('button')
    .attr('id', 'flip-control')
    .text('Flip Coin')
    .on('click', () => {
      const c1 = d3.select(`#coin-${coin.identity} img`);
      coin.flip() ? (c1.attr('src', 'assets/heads.svg'), space.plot(true)) : (c1.attr('src', 'assets/tails.svg'), space.plot(false));
    });
