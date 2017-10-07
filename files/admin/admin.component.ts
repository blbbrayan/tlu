import { Component, OnInit } from '@angular/core';
import { Race } from '../services/models/race.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    links: {target: string, name: string }[];
    
  constructor(private router: Router) { 
    
  }
  ngOnInit() { 
    this.links = [
        { target: '/admin/char', name: 'Character'},
        { target: '/admin/item', name: 'Item'},
        { target: '/admin/monster', name: 'Monster'},
        { target: '/admin/race', name: 'Race'},
        { target: '/admin/recipe', name: 'Recipe'},
        { target: '/admin/skills', name: 'Skills'},
        { target: '/admin/zone', name: 'Zone'},

    ]
  }
    open(link){
        this.router.navigate([link]);
    }

}