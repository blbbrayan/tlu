export class Stats{

    health;
    mana;
    energy;
    armor;
    resist;
    dodge;
    strength;
    intelligence;
    agility;
    crit;
    speed;

constructor(red, blue, yellow, level?){
    level = level || 0;
    this.health = red * 10 + 100 + (level * 30);
    this.mana = blue * 10 + (level * 2);
    this.energy = yellow * 5 + (level * 2);
    this.armor = red * .6 + (level * 0.1);
    this.resist = blue * .8 + (level * 0.1);
    this.dodge = yellow * .01 + (level * 0.01);
    this.strength = red + 5 + (level * 2);
    this.intelligence = blue + 5 + (level * 2);
    this.agility = yellow + 5 + (level * 2);
    this.crit = yellow * .3 + 5 + (level * 0.3);
    this.speed = 4 + Math.floor(yellow / 12);
}

set(stats: any){
  this.health = 0;
  this.mana = 0;
  this.energy = 0;
  this.armor = 0;
  this.resist = 0;
  this.dodge = 0;
  this.strength = 0;
  this.intelligence = 0;
  this.agility = 0;
  this.crit = 0;
  this.speed = 0;
  Object.keys(stats).forEach(key=>this[key]=stats[key]);
  return this;
}


}
