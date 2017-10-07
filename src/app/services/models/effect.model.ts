import {Entity} from "./entity.model";

export abstract class Effect{

  name: string;
  duration: number;
  event: string;

  abstract onTick(caster: Entity);


  constructor(name: string, duration: number, event: string) {
    this.name = name;
    this.duration = duration;
    this.event = event;
  }
}
