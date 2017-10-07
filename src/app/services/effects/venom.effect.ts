import {Effect} from "../models/effect.model";
import {Entity} from "../models/entity.model";

export class VenomEffectEffect extends Effect{

  damage: number;

  constructor(duration, event, damage) {
    super("Venom", duration, event);
    this.damage = damage;
  }

  onTick(caster: Entity) {
    this.growDamage();
    let total = Math.floor(this.damage - caster.stats.resist);
    if (total < 0)
      total = 0;
    caster.stats.health -= total;
    console.log('burn', total);
  }

  growDamage(){
    this.damage *= 2;
  }
}
