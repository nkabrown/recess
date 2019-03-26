'use strict';

export default class Coin {
  constructor(el, id) {
    this.mount = el;
    this.identity = id;
  }

  init() {
    d3.select(this.mount).append('div')
        .attr('class', 'coin');
  }
}
