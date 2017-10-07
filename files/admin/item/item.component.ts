import { Component, OnInit } from '@angular/core';
import { Race } from '../../services/models/race.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css','../admin.component.css']
})
export class AdminItemComponent implements OnInit {


    links: {target: string, name: string }[];
    
  constructor(private router: Router) { 
    
  }
    
  ngOnInit() { 
    this.links = [
        { target: '/admin/item/collectable', name: 'Collectable'},
        { target: '/admin/item/armor', name: 'Armor'},
        { target: '/admin/item/weapons', name: 'Weapons'},
        { target: '/admin/item/crafting', name: 'Crafting'},
        { target: '/admin/item/potions', name: 'Potions'},

    ]
  }
    open(link){
        this.router.navigate([link]);
    }
}
