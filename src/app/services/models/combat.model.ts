export class Combat{
    
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
    
constructor(red, blue, yellow){
    this.health = red * 5 + 100;
    this.mana = blue * 10;
    this.energy = yellow * 5;
    this.armor = red * .6;
    this.resist = blue * .8;
    this.dodge = yellow * .005;
    this.strength = red + 5;
    this.intelligence = blue + 5;
    this.agility = yellow + 5;
    this.crit = yellow * .03;
    this.speed = (yellow * 2) * (Math.random() * 100);
}
    
}