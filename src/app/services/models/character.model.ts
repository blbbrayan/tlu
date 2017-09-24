import {Race} from "./race.model";
import {Combat} from "./combat.model";
import {ObjectUtil} from '../../utils/object.util';
export class Character{ 
    
    id: string;    
    dateCreated: string;
    raceId: string;

    name: string;
    level: number;
    experience: number;
    red: number; // health, strength
    blue: number; // mana, intelligence
    yellow: number; // agility, crit-chance
    
    combat: Combat;
    
    constructor(name?, red?, blue?, yellow?){
        const d = new Date();
        this.id = ObjectUtil.generateGuid();
        this.name = name || '';
        this.dateCreated = (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
        this.level = 1;
        this.experience = 0;
        this.red = red || 0;
        this.blue = blue || 0;
        this.yellow = yellow || 0; 
    }
} 
