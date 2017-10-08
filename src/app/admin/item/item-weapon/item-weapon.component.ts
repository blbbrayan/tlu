import { Component, OnInit } from '@angular/core';
import {Weapon} from "../../../services/models/item-weapon.model";
import {DataService} from "../../../services/data.service";
import {Stats} from "../../../services/models/stats.model";
import {AbilityService} from "../../../services/abilities.service";
import {Ability} from "../../../services/models/ability.model";

@Component({
  selector: 'app-item-weapon',
  templateUrl: './item-weapon.component.html',
  styleUrls: ['./item-weapon.component.css', '../../admin.component.css']
})
export class ItemWeaponComponent implements OnInit {
  item: Weapon = new Weapon();
  red: number;
  yellow: number;
  blue: number;
  weapons: any[];
  rarity: number;
  ability: Ability;
  level: number;
  selectedRarity: string;
  selectedAbility: string;
  abilities: any[];
  rarities: any[] =  ["Common", "UnCommon", "Rare", "Legendary", "Mythic"];

  constructor(private database: DataService, private abilityservice: AbilityService) {
    this.database.subscribe('items/weapons',"", data=>  this.weapons = data || []);
    this.abilities = abilityservice.getAll();
  }

  ngOnInit() {
  }

  submit(){
    this.item.stats = new Stats(this.red || 0,this.blue || 0,this.yellow || 0);
    this.item.rarity = this.rarity || 0;
    this.item.ability = this.ability;
    this.item.level = this.level || 0;
    console.log("Armor", this.item);
    this.database.add('items/weapons', this.item);
    this.item = new Weapon();
  }

  delete(id){
    this.database.delete(`items/weapons/${id}`);
  }


  selectRarity(rarity: string, index){
    this.selectedRarity = rarity;
    this.rarity = index;
  }
  selectAbility(ability: Ability, index){
    this.selectedAbility = ability.name;
    this.ability = ability;
  }
}
