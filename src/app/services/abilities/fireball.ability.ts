import {Ability} from "../models/ability.model";
import {AbilityUtil} from "../../utils/ability.util";
import {Entity} from "../models/entity.model";
import {Effect} from "../models/effect.model";

export class FireballAbility extends Ability{

  bonus: number;

  constructor(cooldown: number, bonus?: number) {
    super("Fireball", "You whip a fireball at your opponent.", cooldown);
    this.bonus = bonus || 0;
  }

  onCast(caster: Entity, enemy: Entity) {
    return AbilityUtil.attack("intelligence", this.bonus, caster.stats, enemy.stats);
  }
}
