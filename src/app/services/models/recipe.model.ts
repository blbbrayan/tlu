import {ObjectUtil} from '../../utils/object.util';
import {Item} from "./item.model";
import {Skill} from "./skill.model";

export class Recipe{
    id: string;
    level: number;
    itemId: string;
   // itemIdsNeeded: {itemId: string, amount: number}[];
    skillId: string; 
    item: Item;
    itemsNeeded: {item: Item, amount: number}[];
    skill: Skill;
    
    constructor(){
        this.id = ObjectUtil.generateGuid();
        this.level = 0;
        this.itemId = '';
    }
    init(level,item,itemsNeeded,skill){
        this.id = ObjectUtil.generateGuid();
        this.level = level;
        this.item = item;
        this.itemId = this.item.id;
        this.itemsNeeded = itemsNeeded;
        this.skill = skill;
        this.skillId = skill.id;
        return this;
    }
    
    
} 