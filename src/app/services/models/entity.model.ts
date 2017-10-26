import {Stats} from "./stats.model";
import {Effect} from "./effect.model";

export class Entity{

  id: string;
  type:string;
  name: string;
  red: number; // health, strength
  blue: number; // mana, intelligence
  yellow: number; // agility, crit-chance

  effectIds: { name: string, duration: number };
  effects: Effect[] = [];
  stats: Stats;
  baseStats: Stats;

  locX: number;
  locY: number;


  constructor(type: string) {
    this.type = type;
    this.locX = 0;
    this.locY = 0;
  }
}
