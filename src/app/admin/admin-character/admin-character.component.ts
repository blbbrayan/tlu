import { Component, OnInit } from '@angular/core';
import { Character } from '../../services/models/character.model';
import { Race } from '../../services/models/race.model';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-admin-character',
  templateUrl: './admin-character.component.html',
  styleUrls: ['./admin-character.component.css', '../admin.component.css']
})
export class AdminCharacterComponent implements OnInit {
    tempChar: Character = new Character();
    chars: any[];
    selectedRace: Race;
    races: Race[] = [];

    constructor(private database: DataService) {
      setTimeout(()=>window['$']('.dropdown-button').dropdown(), 200);
      this.database.subscribe('races', '', data => {
          data = data || [];
          this.races = data;
      });
      this.database.subscribe('characters', '', data => {
        data = data || [];
        this.chars = data;
      });
    }

  ngOnInit() {
  }

    submit(){
        console.log(this.tempChar);
        this.tempChar.name = this.tempChar.name.substring(0,((this.tempChar.name.length>15) ? 15 : this.tempChar.name.length));
        this.database.add('characters', this.tempChar);
    }
        selectRace(race: Race, index){
            this.selectedRace = race;
            this.tempChar.raceId = index;
    }
    delete(id){
        this.database.delete(`characters/${id}`);
    }
}
