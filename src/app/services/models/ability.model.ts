import {Stats} from "./stats.model";
import {Entity} from "./entity.model";

export abstract class Ability{

  name: string;
  desc: string;
  cooldown: number;
  interval: number;

  abstract onCast(caster: Entity, enemy: Entity);

  constructor(name, desc, cooldown){
    this.name = name;
    this.desc = desc;
    this.cooldown = cooldown + 1;
    this.interval = 0;
  }

}
