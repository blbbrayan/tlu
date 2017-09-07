import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {

  races: string[] = [
      "Human",
      "Kobald",
      "Dryad"
  ];

  stats: {name: string, value:number}[] = [
    {name: "Strength", value: 6},
    {name: "Intelligence", value: 6},
    {name: "Dexterity", value: 6}
  ];

  selectedRace: string;
  statPoints: number = 6;

  constructor() { }

  ngOnInit() {
    setTimeout(()=>window['$']('.dropdown-button').dropdown(), 200);
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

}
