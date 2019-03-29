'use strict';

export default class Coin {
  constructor(el, id) {
    this.mount = el;
    this.identity = id;
  }

  init() {
    d3.select(this.mount).append('div')
        .attr('class', 'coin')
        .attr('id', `coin-${this.identity}`)
        .style('width', '100px')
        .style('height', '100px')
      .append('img')
        .attr('src', 'assets/heads.svg');
  }

  flip() {
    return Math.random() >= 0.5;
  }
}
