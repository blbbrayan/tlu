import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {AccountService} from "../services/account.service";
import {Race} from "../services/models/race.model";
import {Character} from "../services/models/character.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {

  tempCharacter: Character = new Character();
  races: Race[] = [];

  stats: { name: string, value: number }[] = [
    {name: "Red", value: 6},
    {name: "Blue", value: 6},
    {name: "Yellow", value: 6}
  ];

  selectedRace: Race;
  statPoints: number = 6;

  constructor(private database: DataService, private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => window['$']('.dropdown-button').dropdown(), 200);
    this.database.subscribe('races', '', races => {
      this.races = races || [];
    });
  }

  submit() {
    this.tempCharacter.red = this.stats[0].value;
    this.tempCharacter.blue = this.stats[1].value;
    this.tempCharacter.yellow = this.stats[2].value;

    if (this.tempCharacter.raceId !== undefined && this.tempCharacter.name !== undefined) {
      this.tempCharacter.id = this.database.add('characters', this.tempCharacter);
      console.log("saving", this.tempCharacter);
      this.accountService.character = this.tempCharacter;
      this.accountService.createCharacter(this.tempCharacter.id);
      this.router.navigate(['/home']);
    }
  }

  addStat(stat) {
    if (this.statPoints > 0) {
      stat.value++;
      this.statPoints--;
    }
  }

  removeStat(stat) {
    if (stat.value > 0) {
      this.statPoints++;
      stat.value--;
    }
  }

  selectRace(race: Race) {
    this.selectedRace = race;
    this.tempCharacter.raceId = race.id;
  }

}
