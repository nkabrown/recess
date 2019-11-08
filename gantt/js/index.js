'use strict';

import Gantt from './Gantt.js';
import Table from './Table.js';

// generate testing data
const channels = ['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4', 'Channel 5', 'Channel 6', 'Channel 7', 'Channel 8'];
// generate one quarters worth of days
const quarter =  d3.timeDays(new Date(2019, 6), new Date(2019, 8, 31));
let start, lift;
const data = channels.reduce((acc, curr) => (start = Math.floor(Math.random() * quarter.length) - 1,
                                             acc.push({
                                               channel: curr,
                                               start: quarter[start],
                                               end: quarter[start +
                                                            Math.floor(Math.random() *
                                                            (quarter.length - start - 1)) + 1],
                                               metrics: {
                                                 ROI: Math.floor(Math.random() * 100),
                                                 avg: (Math.random() * 50).toFixed(2),
                                                 lift: (lift = Math.floor(Math.random() * 10),
                                                       lift === 0 ? lift : `+${lift}`),
                                                 growth: (Math.random() * 100).toFixed(2)
                                               }
                                             }), acc), []);

console.log(data);

const container = document.getElementsByClassName('chart-container')[0];

new Gantt('.chart-container', data, container.clientWidth * .70, channels.length * 32 + 35).init();
new Table('.chart-container', data, container.clientWidth * .30, channels.length * 32 + 35).init();
