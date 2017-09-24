import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

    inventory: string[];
    weapons: string[];
    armor: string[];
    
    constructor() { }

  ngOnInit() {
    this.inventory = [
        "dagger",
        "sword",
        "shield"
    ]
      this.weapons = [];
      this.armor = [];
  }

}
