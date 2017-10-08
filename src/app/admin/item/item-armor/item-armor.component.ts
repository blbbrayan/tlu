import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/data.service";
import {Armor} from "../../../services/models/item-armor.model";
import {Stats} from "../../../services/models/stats.model";

@Component({
  selector: 'app-item-armor',
  templateUrl: './item-armor.component.html',
  styleUrls: ['./item-armor.component.css', '../../admin.component.css']
})
export class ItemArmorComponent implements OnInit {

  item: Armor = new Armor();
  red: number;
  yellow: number;
  blue: number;
  armors: any[];
  rarity: number;
  selectedRarity: string;
  rarities: any[] =  ["Common", "UnCommon", "Rare", "Legendary", "Mythic"];

  constructor(private database: DataService) {
    this.database.subscribe('items/armors',"", data=>  this.armors = data || []);
  }

  ngOnInit() {
  }

  submit(){
    this.item.stats = new Stats(this.red,this.blue,this.yellow);
    this.item.rarity = this.rarity || 0;
    console.log("Armor", this.item);
    this.database.add('items/armors', this.item);
    this.item = new Armor();
  }

  delete(id){
    this.database.delete(`items/armors/${id}`);
  }


  selectRarity(rarity: string, index){
    this.selectedRarity = rarity;
    this.rarity = index;
  }
}
