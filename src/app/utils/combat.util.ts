import {Ability} from "../services/models/ability.model";
import {Entity} from "../services/models/entity.model";
import {Effect} from "../services/models/effect.model";
import {AccountService} from "../services/account.service";

export class CombatUtil {

  static startTurn(entity: Entity) {
    this.runEffects(entity, "onTurnStart");
  }

  static endTurn(entity: Entity, account: AccountService) {
    this.runEffects(entity, "onTurnEnd");
    if (entity === account.character)
      account.abilities.forEach(ability => {
        if (ability.interval > 0)
          ability.interval--
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
