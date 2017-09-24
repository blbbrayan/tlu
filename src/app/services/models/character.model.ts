import {Race} from './race.model';
import {ObjectUtil} from '../../utils/object.util';

export class Character{ 
    
    id: string;    
    raceId: string;

    name: string;
    red: number; // health, strength
    blue: number; // mana, intelligence
    yellow: number; // agility, crit-chance
    dateCreated: string;
    
    constructor(){
        const d = new Date();
        this.id = ObjectUtil.generateGuid();
        this.name = '';
        this.raceId = '';
        this.dateCreated = (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
        this.red = 0;
        this.blue = 0;
        this.yellow = 0; 
    }
} 
