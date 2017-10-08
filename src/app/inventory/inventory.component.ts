import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventory: any[];
  weapons: string[];
  armor: string[];

  selectMode = true;
  selectedItem: any;

  constructor(private accountService: AccountService, private dataService: DataService) {
  }

  ngOnInit() {
    this.armor = [];
  }

  getInventory(){
    let inventory = this.accountService.character.inventory;
    if(inventory === undefined){
      let ids = this.accountService.character.inventoryIds;
      // ids.forEach(id=>this.dataService.get('item/'))
    }
  }

  equip(item) {
    switch (item.type) {
      case "armor":
        if (this.armor.length < 4)
          this.armor.push(item);
        break;
      case "weapon":
        if (this.weapons.length < 4)
          this.weapons.push(item);
        break;
    }
    this.inventory.splice(this.inventory.indexOf(item), 1);
    this.selectItem(item, true);
    this.stopSelect();
  }

  isEquipped(item) {
    return this.armor.indexOf(item) !== -1 || this.weapons.indexOf(item) !== -1
  }

  unequip(item) {
    if (item.type === "armor")
      this.armor.splice(this.armor.indexOf(item), 1);
    else
      this.weapons.splice(this.weapons.indexOf(item), 1);
    this.inventory.push(item);
  }

  rarityPipe = [
    "Common",
    "Rare",
    "Epic",
    "Legendary",
    "Mythic",
  ]

  keys(obj) {
    return obj ? Object.keys(obj.stats) : [];
  }

  selectItem(item, override?) {
    if (this.selectMode || override)
      this.selectedItem = item;
  }

  stopSelect() {
    this.selectMode = false;
    setTimeout(() => this.selectMode = true, 1000);
  }

}
