import { Component, OnInit } from '@angular/core';
import {Race} from "../../services/models/race.model";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-play-garden',
  templateUrl: './play-garden.component.html',
  styleUrls: ['./play-garden.component.css']
})
export class PlayGardenComponent implements OnInit {

  raceId: string = "-Kvsub_MwZLEyIROpaQI";
  race: Race;

  constructor(private database: DataService) { }

  ngOnInit() {
    this.getRace(this.raceId);
    this.getRaces()
  }

  getRaces(){
    this.database.subscribe('races', '', races=>{
      console.log('races', races);
    })
  }

  getRace(raceId: string){
    this.database.subscribe('races', this.raceId, race=>{
      console.log(race);
    })
  }

  newRace(){
    let race = new Race('hooman', '', 2, 2, 2);
    this.database.add('races', race);
  }

}
