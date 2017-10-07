import {Stats} from "../services/models/stats.model";

export class AbilityUtil{

  public static attack(stat: string, bonus: number, attacker: Stats, target: Stats): {crit: boolean, dodge: boolean, damage: number}{
    var crit = false, dodge = false;

    var damage = stat === "agility" ? attacker[stat] * .8 : attacker[stat];
    damage += bonus;
    damage *= (Math.random() * 1.8) + 1;
    var roll = (Math.random() * 100);
    console.log('crit', attacker.crit, "roll", roll);
    if(attacker.crit >= roll) {
      damage *= ((Math.random() * 2) + 1.5);
      crit = true;
    }

    var defense = 0;
    switch(stat){
      case "strength":
        defense = target.armor;
        break;
      case "intelligence":
        defense = target.resist;
        break;
      case "agility":
        defense = target.armor;
        break;
    }
    if(target.dodge >= Math.random() * 100) {
      defense *= 1000;
      dodge = true;
    }
    var total = damage - defense;
    if(total < 0)
      total = 0;
    total = Math.floor(total);
    target.health -= total;
    return {crit: crit, dodge: dodge, damage: total};
  }

}
