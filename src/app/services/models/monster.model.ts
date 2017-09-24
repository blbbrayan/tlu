import {Combat} from "./combat.model";
export class Monster{
    
    name: string;
    red: number; // health, strength
    blue: number; // mana, intelligence
    yellow: number; // agility, crit-chance
    
    combat: Combat;
    
    constructor(){
        this.name = "";
        this.red = 0;
        this.blue = 0;
        this.yellow = 0;
    }
    
}