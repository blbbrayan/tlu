import {Ability} from "../models/ability.model";
import {AbilityUtil} from "../../utils/ability.util";
import {Entity} from "../models/entity.model";

export class FireballAbility extends Ability{

  bonus: number;

  constructor() {
    super("Fireball", "You whip a fireball at your opponent.", 0);
    this.bonus = 0;
  }

  onCast(caster: Entity, enemy: Entity) {
    return AbilityUtil.attack("intelligence", this.bonus, caster.stats, enemy.stats);
  }
}
