import {ObjectUtil} from '../../utils/object.util';
import {Item} from "./item.model";
import {Skill} from "./skill.model";

export class Recipe{
    id: string;
    itemId: string;
    itemIdsNeeded: {itemId: string, amount: number}[];
    skillId: string;

    level: number;
    item: Item;
    itemsNeeded: {item: Item, amount: number}[];

    constructor(){
        this.level = 0;
        this.itemId = '';
    }
    init(level,item,itemsNeeded,skill){
        this.level = level;
        this.item = item;
        this.itemId = this.item.id;
        this.itemsNeeded = itemsNeeded;
        this.skillId = skill.id;
        return this;
    }


}
