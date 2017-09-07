import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ObjectUtil} from "../utils/object.util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  entry: string;
  entries: any[];

  constructor(private database: DataService) {}

  ngOnInit() {
    this.database.subscribe('entries', data=>{
      data = data || {};
      this.entries = ObjectUtil.toArray(data);
    });
  }

  submit(){
    this.database.listAdd('entries', {value: this.entry});
    this.entry = "";
  }

}
