/* Day 02
 *
 * https://adventofcode.com/2023/day/2
 *
 * Given a record of games consisting of series of random draws of red, green, and blue cubes from a bag 
 * determine the fewest number of cubes of each color a bag would need to contain to make the game possible
 * and then multiply the number of cubes in this bag and then sum all of these powers.
 *
 * - parse each line into a game object with id and set of draws and specific bag totals
 * - reduce the draws in the game object to the known cube totals
 * - multipy the known cube totals to get the power of the minimum possible bag
 * - sum the powers of all possible games
 * 
 */
import { fullPath } from '../utils.js';
import { open } from 'node:fs/promises';

interface Bag {
  red: number; 
  green: number;
  blue: number;
}

type Draw = Partial<Bag>;

interface Game {
  id: number;
  draws: Draw[];
  totals: Bag;
}

(async () => {
  const file = await open(fullPath(import.meta.url, './game-records.txt'));

  const powers: number[] = [];

  for await (const line of file.readLines()) {
    // parse each line into a game object
    const game: Game = line
    .split(/[:;]/)
    .map(str => str.trim())
    .reduce((game: Game, str, idx): Game => {
      if (idx === 0) {
        const match = str.match(/(?<=Game\s)\d+\b/g);
        if (match) game.id = Number(match[0]);
      } else {
        // transform string of '6 red, 1 blue, 3 green' into a Draw object
        // and tally the drawn cubes in a game to the known cube totals
        const draw: Draw = {};
        const matches = Array.from(str.matchAll(/(?<red>\d+\b)(?=\sred)|(?<green>\d+\b)(?=\sgreen)|(?<blue>\d+\b)(?=\sblue)/g), match => match.groups);
        matches.forEach(match => {
          if (match?.red) {
            draw.red = Number(match.red);
            if (game.totals.red < draw.red) game.totals.red = draw.red;
          }
          if (match?.green) {
            draw.green = Number(match.green);
            if (game.totals.green < draw.green) game.totals.green = draw.green;
          }
          if (match?.blue) {
            draw.blue = Number(match.blue);
            if (game.totals.blue < draw.blue) game.totals.blue = draw.blue;
          }
        });
        game.draws.push(draw);
      }
      return game;
    }, {id: 0, draws: [], totals: {red: 0, green: 0, blue: 0}} as Game);

    // multiply known cube totals to get the power of the minimum possible bag
    const power = Object.values(game.totals).reduce((power: number, total: number): number => power * total, 1); 

    powers.push(power);
  }

  // sum the powers of all minimum possible games
  const sum = powers.reduce((sum: number, power: number): number => sum + power, 0);
  console.log(sum);
})();
