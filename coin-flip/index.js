'use strict';
import Coin from './Coin.js';

d3.select('#mount').append('div')
    .attr('class', 'coin-ui')
  .append('div')
    .attr('class', 'coin-holder');

const coin = new Coin('.coin-holder', 0);
coin.init();

d3.select('#mount').append('div')
    .attr('class', 'sample-space');
