import {Stats} from "./stats.model";
import {Effect} from "./effect.model";

export class Entity{

  name: string;
  red: number; // health, strength
  blue: number; // mana, intelligence
  yellow: number; // agility, crit-chance
  effects: Effect[] = [];

  stats: Stats;

}
