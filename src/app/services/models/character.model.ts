import {Stats} from "./stats.model";
import {Item} from "./item.model";
import {Weapon} from "./item-weapon.model";
import {Armor} from "./item-armor.model";
import {Entity} from "./entity.model";

export class Character extends Entity {

  dateCreated: string;
  id: string;
  raceId: string;
  inventoryIds: { itemId: string, amount: number }[];
  equippedIds: { armor: any[], weapons: any[] };

  inventory: { item: Item, amount: number }[];
  equipped: { armor: Armor[], weapons: Weapon[] };

  level: number;
  experience: number;

  constructor(name?, red?, blue?, yellow?) {
    super();
    const d = new Date();
    this.name = name || '';
    this.dateCreated = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
    this.level = 1;
    this.experience = 0;
    this.red = red || 6;
    this.blue = blue || 6;
    this.yellow = yellow || 6;
    this.inventoryIds = [];
    this.equippedIds = {armor: [], weapons: []};
  }

}

export function characterRefresh(character) {
  console.log('character', character);
  character.stats = new Stats(character.red, character.blue, character.yellow, character.level);
  character.equipped.weapons.forEach(weapon =>
    Object.keys(character.stats).forEach(stat => character.stats[stat] += weapon.stats[stat])
  );
  character.equipped.weapons.forEach(weapon => weapon.ability.interval = 0);
  character.effects = [];
  return character;
}
