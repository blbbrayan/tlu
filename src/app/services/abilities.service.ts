import {Injectable} from '@angular/core';
import {FireballAbility} from "./abilities/fireball.ability";
import {InfernoAbility} from "./abilities/inferno.ability";
import {ObjectUtil} from "../utils/object.util";

@Injectable()
export class AbilityService {

  abilities: any;

  constructor(){
    let abilities: any = {};
    abilities.fireball = new FireballAbility();
    abilities.inferno = new InfernoAbility();

    this.abilities = abilities;
  }

  get(name){
    return this.abilities[name];
  }

  getAll(){
    return ObjectUtil.toArray(this.abilities);
  }

}
