import { Injectable } from '@angular/core';
import {Account} from './models/account.model';
import {Character} from './models/character.model';
import {DataService} from './data.service';
import {ObjectUtil} from '../utils/object.util';
import {Item} from './models/item.model';
import {Collectable} from './models/item-collectable.model';
import {Armor} from './models/item-armor.model';
import {Recipe} from './models/recipe.model';
import {Weapon} from './models/item-weapon.model';
import {Skill} from './models/skill.model';
import {FireballAbility} from "./abilities/fireball.ability";
import {Stats} from "./models/stats.model";
import {BurnEffect} from "./effects/burn.effect";
import {Monster} from "./models/monster.model";
import {InfernoAbility} from "./abilities/inferno.ability";

@Injectable()
export class FakeDataService {

    account: Account;
    character: Character;
    items: Item[] = [];
    collectables: Collectable[] = [];
    armor: Armor[] = [];
    weapons: Weapon[] = [];
    recipes: Recipe[] = [];
    skills:  any[];
    monsters: Monster[];
    selectedMonster: Monster;
    constructor(private database: DataService){
        this.database.subscribe('skills', data=>{
            data = data || {};
            this.skills = ObjectUtil.toArray(data);

          this.recipes = [
            new Recipe().init(0,this.items[0],[{item: this.collectables[4], amount: 5}],this.skills[0]),
            new Recipe().init(0,this.items[2],[{item: this.collectables[2], amount: 3}],this.skills[0]),
            new Recipe().init(0,this.items[1],[{item: this.collectables[3], amount: 1}],this.skills[1]),
            new Recipe().init(0,this.items[3],[{item: this.collectables[0], amount: 2},{item: this.collectables[3], amount: 3},{item: this.collectables[2], amount: 2}],this.skills[1]),
            new Recipe().init(0,this.items[2],[{item: this.collectables[0], amount: 6},{item: this.collectables[2], amount: 6},{item: this.collectables[1], amount: 33.3}],this.skills[1]),
          ];
        });

        this.collectables = [
            new Collectable().init("Energy","collectable"),
            new Collectable().init("Air","collectable"),
            new Collectable().init("Water","collectable"),
            new Collectable().init("Fire","collectable"),
            new Collectable().init("Earth","collectable"),
        ];
        this.items = [
            new Item("Doge","weapon"),
            new Item("Not Doge","weapon"),
            new Item("Totes Doge","weapon"),
            new Item("Lmao Doge","weapon"),
        ];

        this.monsters = [
          new Monster().init("Spider", 1,3, 3, 6),
          new Monster().init("Lich",3, 8, 14, 8),
          new Monster().init("Mephistopheles",6, 16, 8, 8)
        ];
        this.selectedMonster = this.monsters[Math.floor(Math.random() * this.monsters.length-1) + 1];

        this.character = new Character().init("Tomato",1,0,5,6,7,[this.items[0],this.items[1]]);
        this.account = new Account().init("T","k",this.character.id);
        this.weapons = [
          new Weapon().create("Fire Wand", 1,1, new Stats(0, 0, 0).set({intelligence: 2}), new FireballAbility(0)),
          new Weapon().create("Inferno Staff", 1, 5, new Stats(0, 0, 0).set({intelligence: 16, mana: 20, crit: 8, resist: 6}), new InfernoAbility(3, 4, 3, 8)),
        ];
        this.character.equipped.weapons.push(this.weapons[0]);
        this.character.equipped.weapons.push(this.weapons[1]);
    }

}
