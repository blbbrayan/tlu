import {CombatUtil} from "../../utils/combat.util";
import {Entity} from "./entity.model";

export class Turn{

    caster: Entity;
    target: Entity;
    fn: any;
    speed: number;
    isPlayer:any;

  constructor(caster: Entity, target: Entity, fn: any, isPlayer:boolean) {
    this.caster = caster;
    this.target = target;
    this.fn = fn;
    this.speed = Math.floor(Math.random() * caster.stats.speed);
    this.isPlayer = isPlayer;
  }

  start(){
    CombatUtil.startTurn(this.caster);
    let report = this.fn(this.caster, this.target);
    CombatUtil.endTurn(this.caster);
    return report;
  }

}
