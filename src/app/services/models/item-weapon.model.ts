import {Item} from './item.model';
import {Stats} from './stats.model';
import {Ability} from "./ability.model";

export class Weapon extends Item{

    level: number;
    stats: Stats;
    rarity: number;
    abilityName: string;

    ability: Ability;

    constructor(){
        super('weapon');
    }

    create(name: string, level: number, rarity: number, stats: Stats, ability: Ability){
        this.name = name;
        this.level = level;
        this.rarity = rarity;
        this.stats = stats;
        this.ability = ability;
        return this;
    }


}
