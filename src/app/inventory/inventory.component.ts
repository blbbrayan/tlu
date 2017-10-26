import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {DataService} from "../services/data.service";
import {Character} from "../services/models/character.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  selectMode = true;
  selectedItem: any;
  character: Character;
  equipped: any;
  inventory: any;

  constructor(private accountService: AccountService, private dataService: DataService, private router: Router) {
    if (!this.accountService.character)
      this.router.navigate(['/login']);
    this.character = this.accountService.character;
    this.equipped = this.accountService.equipped;
    this.inventory = this.accountService.inventory;
    console.log('character', this.character);
  }

  ngOnInit() {

  }

  equip(item: {item: any, amount: number}, i) {
    let character = this.character;
    let equipped = this.accountService.equipped;
    let inventory = this.accountService.inventory;
    if (character.equippedIds === undefined)
      character.equippedIds = {armor: [], weapons: []};
    switch (item.item.type) {
      case "armor":
        if (equipped.armor.length < 4)
          character.equippedIds.armor.push(item.item.itemId);
        break;
      case "weapon":
        if (equipped.weapons.length < 4)
          character.equippedIds.weapons.push(item.item.itemId);
        break;
    }
    character.inventoryIds[i].amount--;
    if(character.inventoryIds[i].amount <= 0)
      character.inventoryIds.splice(inventory.indexOf(item), 1);
    this.accountService.reloadCharacter();
    this.selectItem(item, true);
    this.stopSelect();
  }

  isEquipped(item) {
    return this.accountService.equipped.armor.indexOf(item) !== -1 || this.accountService.equipped.weapons.indexOf(item) !== -1
  }

  unequip(item) {
    let character = this.accountService.character;
    let equipped = this.accountService.equipped;
    let inventory = this.accountService.inventory;
    if (item.type === "armor")
        character.equippedIds.armor.splice(equipped.armor.indexOf(item), 1);
    else {
      if(character.equippedIds.weapons.length <= 1)
        return null;
      character.equippedIds.weapons.splice(equipped.weapons.indexOf(item), 1);
    }

    let invItem = character.inventoryIds.find(e => e.itemId === item.itemId);
    console.log('invItem', invItem, item);
    if(invItem)
      invItem.amount++;
    else
      this.accountService.character.inventoryIds.push({itemId: item.itemId, amount: 1});
    this.accountService.reloadCharacter();
  }

  rarityPipe = [
    "Common",
    "Rare",
    "Epic",
    "Legendary",
    "Mythic",
  ];

  keys(obj) {
    return obj ? Object.keys(obj.stats) : [];
  }

  selectItem(item, override?) {
    if (this.selectMode || override)
      this.selectedItem = item.item ? item.item : item;
  }

  stopSelect() {
    this.selectMode = false;
    setTimeout(() => this.selectMode = true, 1000);
  }

}
