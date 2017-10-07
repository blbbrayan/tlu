import { Component, OnInit } from '@angular/core';
import { Race } from '../../services/models/race.model';
import {DataService} from "../../services/data.service"; 
import {ObjectUtil} from "../../utils/object.util";

@Component({
  selector: 'app-admin-race',
  templateUrl: './admin-race.component.html',
  styleUrls: ['./admin-race.component.css', '../admin.component.css']
})
export class AdminRaceComponent implements OnInit {
    tempRace: Race = new Race();
    races: any[];
    
    constructor(private database: DataService) { 
        this.database.subscribe('races', data=>{
            data = data || {};
            this.races = ObjectUtil.toArray(data);
        });
    }

  ngOnInit() { 
  }

    submit(){
        console.log(this.tempRace);
        this.database.listAdd('races', this.tempRace);
        this.tempRace = new Race();
    }
    
    delete(id){
        this.database.delete(`races/${id}`);
    }
}
