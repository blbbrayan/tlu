import { Component, OnInit } from '@angular/core';

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
    
    constructor() { }

  ngOnInit() {
    this.inventory = [
        {name: 'knife', type: "weapon", rarity: 4, stats: {crit: 7, energy: 10}},
        {name: 'fork', type: "weapon", rarity: 2, stats: {crit: 3, speed: 12}},
        {name: 'spoon', type: "weapon", rarity: 3, stats: {mana: 8, intelligence: 3}},
        {name: 'potato', type: "armor", rarity: 1, stats: {health: 5}},
        {name: 'shield', type: "armor", rarity: 5, stats: {health: 50}}
    ]
      this.weapons = [];
      this.armor = [];
  }
    
    equip(item){
        switch(item.type){
            case "armor":
                if(this.armor.length < 4)
                    this.armor.push(item);
                break;
            case "weapon":
                if(this.weapons.length < 4)
                    this.weapons.push(item);
                break;
        }
        this.inventory.splice(this.inventory.indexOf(item), 1);
        this.selectItem(item, true);
        this.stopSelect();
    }
    
    isEquipped(item){
        return this.armor.indexOf(item) !== -1 || this.weapons.indexOf(item) !== -1
    }
    
    unequip(item){
        if(item.type === "armor")
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
    
    keys(obj){
        return obj ? Object.keys(obj.stats) : [];
    }
    
    selectItem(item, override?){
        if(this.selectMode || override)
            this.selectedItem = item;
    }
    
    stopSelect(){
        this.selectMode = false;
        setTimeout(()=>this.selectMode=true, 1000);
    }

}
