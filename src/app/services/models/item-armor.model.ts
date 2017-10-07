import {Item} from './item.model';
import {Stats} from './stats.model';

export class Armor extends Item{
    
    stats: Stats;
    rarity: number;
    
    constructor(){
        super('armor');
    }
    
}  