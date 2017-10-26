import {Stats} from "./stats.model";
import {Entity} from "./entity.model";

export class Monster extends Entity {

  level: number;

  constructor() {
    super('monster');
    this.name = "";
    this.red = 0;
    this.blue = 0;
    this.yellow = 0;
  }

  init(name, level, red, blue, yellow) {
    this.name = name;
    this.level = level;
    this.red = red;
    this.blue = blue;
    this.yellow = yellow;
    this.stats = new Stats(red, blue, yellow);
    return this;
  }

}
export function monsterRefresh(monster) {
  console.log('monster', monster);
  monster.stats = new Stats(monster.red, monster.blue, monster.yellow, monster.level);
  monster.effects = [];
  return monster;
}
