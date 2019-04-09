'use strict';
import SlopeGraph from './Slope.js';

const data = [{income: 18000, status:'Pre-program'}, {income:85000, status:'Post-program'}];

new SlopeGraph('#mount', data, {top:30, right:0, bottom:40, left:65}, 320, 250).init();
