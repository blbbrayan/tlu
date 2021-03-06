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

  level: number;
  experience: number;

  constructor(name?, red?, blue?, yellow?) {
    super('character');
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

export function characterRefresh(character, account) {
  console.log('character', character);
  character.baseStats = new Stats(character.red, character.blue, character.yellow, character.level);
  character.stats = new Stats(character.red, character.blue, character.yellow, character.level);
  account.equipped.weapons.forEach(weapon =>
    Object.keys(character.stats).forEach(stat => character.stats[stat] += weapon.stats[stat])
  );
  account.abilities.forEach(ability => ability.interval = 0);
  character.effects = [];
  return character;
}
