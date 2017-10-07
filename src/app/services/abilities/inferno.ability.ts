import {Ability} from "../models/ability.model";
import {AbilityUtil} from "../../utils/ability.util";
import {Entity} from "../models/entity.model";
import {BurnEffect} from "../effects/burn.effect";

export class InfernoAbility extends Ability{

  bonus: number;
  burnDur: number;
  burnBonus: number;

  constructor(cooldown: number, bonus?: number, burnDur?: number, burnBonus?: number) {
    super("Inferno", "You whip an inferno at your opponent.", cooldown);
    this.bonus = bonus || 1;
    this.burnDur = burnDur || 1;
    this.burnBonus = burnBonus || 1;
  }

  onCast(caster: Entity, enemy: Entity) {
    enemy.effects.push(new BurnEffect(this.burnDur, 'onTurnStart', this.burnBonus));
    return AbilityUtil.attack("intelligence", this.bonus*1.2, caster.stats, enemy.stats);
  }
}
