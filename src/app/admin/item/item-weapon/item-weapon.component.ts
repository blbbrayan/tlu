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
  weapons: any[];
  rarity: number;
  level: number;
  selectedRarity: string;
  selectedAbility: string;
  abilities: any[];
  rarities: any[] =  ["Common", "Uncommon", "Rare", "Legendary", "Mythic"];

  constructor(private database: DataService, private abilityservice: AbilityService) {
    setTimeout(() => window['$']('.dropdown-button').dropdown(), 200);
    this.database.subscribe('weapons',"", data=>  this.weapons = data || []);
    this.abilities = abilityservice.getAll();
  }

  ngOnInit() {
  }

  getStats(){
    return Object.keys(this.item.stats);
  }

  submit(){
    this.item.rarity = this.rarity;
    this.item.abilityName = this.selectedAbility;
    this.item.level = this.level;
    let key = this.database.add('weapons', this.item);
    this.database.add('items', {db: 'weapons', id: key});
    this.item = new Weapon();
  }

  delete(id){
    this.database.delete(`weapons/${id}`);
  }

  selectRarity(rarity: string, index){
    this.selectedRarity = rarity;
    this.rarity = index;
  }
  selectAbility(ability: Ability){
    this.selectedAbility = ability.name;
  }
}
