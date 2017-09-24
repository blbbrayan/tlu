import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ObjectUtil} from "../utils/object.util";
import {Character} from "../services/models/character.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    player: Character;
    
  constructor(private database: DataService) {}

  ngOnInit() { 
    this.player = new Character("Steve", 10, 8, 6);
    console.log(this.player);
  }
    
expNeeded(){
    return (this.player.level * 5) * 10;
}

}
