import {Ability} from "../services/models/ability.model";
import {Character} from "../services/models/character.model";
import {Entity} from "../services/models/entity.model";
import {Effect} from "../services/models/effect.model";

export class CombatUtil {

  static startTurn(entity: Entity) {
    this.runEffects(entity, "onTurnStart");
  }

  static endTurn(entity: Entity) {
    this.runEffects(entity, "onTurnEnd");
    if (entity instanceof Character)
      entity.equipped.weapons.forEach(weapon => {
        if (weapon.ability.interval > 0)
          weapon.ability.interval--
      })
  }

  static getEffects(event: string, effects: Effect[]){
    return effects.filter(effect=>effect.event===event);
  }

  static runEffects(entity: Entity, event: string){
    this.getEffects(event, entity.effects).forEach(effect=> {
      effect.onTick(entity);
      effect.duration--;
      if(effect.duration <= 0)
        entity.effects.splice(entity.effects.indexOf(effect), 1);
    });
  }

  static attack(ability: Ability, caster: Entity, target: Entity) {
    var battleReport = ability.onCast(caster, target);
    ability.interval = ability.cooldown;
    return battleReport;
  }

}
