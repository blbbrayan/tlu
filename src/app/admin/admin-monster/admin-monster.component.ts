import { Component, OnInit } from '@angular/core';
import { Monster } from '../../services/models/monster.model';
import {DataService} from "../../services/data.service";
import {ObjectUtil} from "../../utils/object.util";

@Component({
  selector: 'app-admin-monster',
  templateUrl: './admin-monster.component.html',
  styleUrls: ['./admin-monster.component.css', '../admin.component.css']
})
export class AdminMonsterComponent implements OnInit {
    tempMonster: Monster = new Monster();
    mons: any[];

    constructor(private database: DataService) {
        this.database.subscribe('monsters',"", data=>{
            data = data || {};
            this.mons = data;
        });
    }

  ngOnInit() {
  }

    submit(){
        console.log(this.tempMonster);
        this.database.add('monsters', this.tempMonster);
    }
    delete(id){
        this.database.delete(`monsters/${id}`);
    }
}
