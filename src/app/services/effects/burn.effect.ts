import {Effect} from "../models/effect.model";
import {Entity} from "../models/entity.model";

export class BurnEffect extends Effect{

  damage: number;

  constructor(duration, event, damage) {
    super("Burn", duration, event);
    this.damage = damage;
  }

  onTick(caster: Entity) {
    let total = Math.floor(this.damage - caster.stats.resist);
    if(total < 0)
      total = 0;
    caster.stats.health -= total;
  }
}
