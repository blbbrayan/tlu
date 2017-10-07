import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {AccountService} from "../services/account.service";
import {Race} from "../services/models/race.model";
import {Character} from "../services/models/character.model";
import {ObjectUtil} from "../utils/object.util";

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {

    tempCharacter: Character = new Character();
  races: Race[] = [];

  stats: {name: string, value:number}[] = [
    {name: "Strength", value: 6},
    {name: "Intelligence", value: 6},
    {name: "Dexterity", value: 6}
  ];

  selectedRace: Race;
  statPoints: number = 6;

  constructor(private database: DataService, private accountService: AccountService) { }

  ngOnInit() {
    setTimeout(()=>window['$']('.dropdown-button').dropdown(), 200);
    this.database.subscribe('races', races=>{
        races = races || [];
        this.races = ObjectUtil.toArray(races)
    });
  }

    submit(){
        if(this.tempCharacter.raceId !== undefined && this.tempCharacter.name !== undefined){
            this.database.listAdd('characters', this.tempCharacter);
            console.log("saving", this.tempCharacter);
            this.accountService.character = this.tempCharacter;
            this.accountService.account.characterId = this.tempCharacter.id;
            this.accountService.save();
        }else{
            console.log("not saving", this.tempCharacter);
        }
    }
    
  addStat(stat){
    if(this.statPoints > 0) {
      stat.value++;
      this.statPoints--;
    }
  }

  removeStat(stat){
    if(stat.value > 0) {
      this.statPoints++;
      stat.value--;
    }
  }
    
    selectRace(race: Race){
            this.selectedRace = race; 
            this.tempCharacter.raceId = race.id;
    }

}
