import {Item} from './item.model';
import {Stats} from './stats.model';

export class Armor extends Item{

    level: number;
    stats: Stats;
    rarity: number;

    constructor(){
        super('armor');
      this.stats = new Stats(0,0,0).set({});
      this.rarity = 0;
      this.level = 1;
    }

}
