import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/data.service";
import {Armor} from "../../../services/models/item-armor.model";

@Component({
  selector: 'app-item-armor',
  templateUrl: './item-armor.component.html',
  styleUrls: ['./item-armor.component.css', '../../admin.component.css']
})
export class ItemArmorComponent implements OnInit {

  item: Armor = new Armor();
  armors: any[];
  rarities: any[] = ["Common",
    "Rare",
    "Epic",
    "Legendary",
    "Mythic"
  ];

  constructor(private database: DataService) {
    setTimeout(() => window['$']('.dropdown-button').dropdown(), 200);
    this.database.subscribe('armors',"", data=>  this.armors = data || []);
  }

  ngOnInit() {
  }

  getStats(){
    return Object.keys(this.item.stats);
  }

  submit(){
    let key = this.database.add('armors', this.item);
    this.database.add('items', {db: 'armors', id: key});
    this.item = new Armor();
  }

  delete(id){
    this.database.delete(`items/armors/${id}`);
  }


  selectRarity(index){
    this.item.rarity = index
  }
}
