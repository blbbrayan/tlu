import { Component, OnInit } from '@angular/core';
import { Skill } from '../../services/models/skill.model';
import {DataService} from "../../services/data.service"; 
import {ObjectUtil} from "../../utils/object.util";

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css', '../admin.component.css']
})
export class AdminSkillsComponent implements OnInit {

    tempSkill: Skill = new Skill();
    skills: any[];
    
  constructor(private database: DataService) {
        this.database.subscribe('skills', data=>{
            data = data || {};
            this.skills = ObjectUtil.toArray(data);
        });
  }

  ngOnInit() {
  }
    submit(){
        this.database.listAdd('skills', this.tempSkill);
        this.tempSkill = new Skill();
    } 
    
    delete(id){
        this.database.delete(`skills/${id}`);
    }
}
