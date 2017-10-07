import { Component, OnInit } from '@angular/core';
import { Collectable } from '../../../services/models/item-collectable.model';
import {DataService} from "../../../services/data.service"; 
import {ObjectUtil} from "../../../utils/object.util";

@Component({
  selector: 'app-item-collectable',
  templateUrl: './item-collectable.component.html',
  styleUrls: ['./item-collectable.component.css', '../../admin.component.css']
})
export class AdminCollectableComponent implements OnInit {

    item: Collectable = new Collectable();
    collectables: any[];
    
  constructor(private database: DataService) {        
      this.database.subscribe('items/collectables', data=>{
            data = data || {};
            this.collectables = ObjectUtil.toArray(data);
        }); }

  ngOnInit() {
  }
    submit(){
        this.database.listAdd('items/collectables', this.item);
        this.item = new Collectable();
    } 
    
    delete(id){
        this.database.delete(`items/collectables/${id}`);
    }
}
