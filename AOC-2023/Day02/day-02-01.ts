/* Day 02
 *
 * https://adventofcode.com/2023/day/2
 *
 * Given a record of games consisting of series of random draws of red, green, and blue cubes from a bag 
 * determine which recorded games are possible given a specific bag of colored cubes and then sum the id
 * numbers of those games.
 *
 * - parse each line into a game object with id and set of draws and specific bag totals
 * - reduce the draws in the game object to the known cube totals
 * - determine whether the game is possible given the contents of a specific bag
 * - sum the id numbers of the possible games
 * 
 */
import { fullPath } from '../utils.js';
import { type FileHandle, open } from 'node:fs/promises';

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
  const file: FileHandle = await open(fullPath(import.meta.url, './game-records.txt'));

  const bag: Bag = { red: 12, green: 13, blue: 14 };
  const possibleGames: Game[] = [];

  for await (const line of file.readLines()) {
    // parse each line into a game object
    const game: Game = line
    .split(/[:;]/)
    .map(str => str.trim())
    .reduce((game: Game, str, idx): Game => {
      if (idx === 0) {
        const match: RegExpMatchArray | null = str.match(/(?<=Game\s)\d+\b/g);
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

    // determine whether the game is possible given the contents of a specific bag
    let isPossibleGame: boolean = true;

    for (const [color, count] of Object.entries(game.totals)) {
      if (bag[color as keyof Bag] < count) {
        isPossibleGame = false; 
        break;
      }
    }

    if (isPossibleGame) possibleGames.push(game);
  }

  // sum the id numbers of the possible games
  const sum = possibleGames.reduce((sum: number, game: Game): number => sum + game.id, 0);
  console.log(sum);
})();
