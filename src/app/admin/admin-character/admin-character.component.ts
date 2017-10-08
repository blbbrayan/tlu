import {Component, OnInit} from '@angular/core';
import {Character} from '../../services/models/character.model';
import {Race} from '../../services/models/race.model';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-admin-character',
  templateUrl: './admin-character.component.html',
  styleUrls: ['./admin-character.component.css', '../admin.component.css']
})
export class AdminCharacterComponent {

  chars: Character[];
  races: Race[] = [];
  selectedCharacter: number;

  constructor(private database: DataService) {
    setTimeout(() => window['$']('.dropdown-button').dropdown(), 200);
    this.database.subscribe('races', '', data => {
      data = data || [];
      this.races = data;
    });
    this.database.subscribe('characters', '', data => {
      data = data || [];
      this.chars = data;
    });
  }

  delete(id) {
    this.database.delete(`characters/${id}`);
  }

}
