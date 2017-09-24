import {Race} from "./race.model";
import {Combat} from "./combat.model";
export class Character{

    name: string;
    level: number;
    experience: number;
    red: number; // health, strength
    blue: number; // mana, intelligence
    yellow: number; // agility, crit-chance

    raceId: number;
    
    combat: Combat;
    
constructor(name?: string, red?: number, blue?: number, yellow?: number){
        this.name = name || "";
        this.red = red || 0;
        this.blue = blue || 0;
        this.yellow = yellow || 0;
        this.level = 1;
        this.experience = 0;
    }

}