import {Ability} from "../models/ability.model";
import {AbilityUtil} from "../../utils/ability.util";
import {Entity} from "../models/entity.model";
import {BurnEffect} from "../effects/burn.effect";

export class InfernoAbility extends Ability{

  bonus: number;
  burnDur: number;
  burnBonus: number;

  constructor() {
    super("Inferno", "You whip an inferno at your opponent.", 5);
    this.bonus = 16;
    this.burnDur = 3;
    this.burnBonus = 5;
  }

  onCast(caster: Entity, enemy: Entity) {
    enemy.effects.push(new BurnEffect(this.burnDur, 'onTurnStart', this.burnBonus));
    return AbilityUtil.attack("intelligence", this.bonus*1.2, caster.stats, enemy.stats);
  }
}
