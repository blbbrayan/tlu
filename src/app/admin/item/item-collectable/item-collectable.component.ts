import {Component, OnInit} from '@angular/core';
import {Collectable} from '../../../services/models/item-collectable.model';
import {DataService} from "../../../services/data.service";
import {ObjectUtil} from "../../../utils/object.util";

@Component({
  selector: 'app-item-collectable',
  templateUrl: './item-collectable.component.html',
  styleUrls: ['./item-collectable.component.css', '../../admin.component.css']
})
export class AdminCollectableComponent {

  item: Collectable = new Collectable();
  collectables: any[];

  constructor(private database: DataService) {
    this.database.subscribe('collectables', "", data => {
      data = data || [];
      this.collectables = data;
    });
  }

  submit() {
    let key = this.database.add('collectables', this.item);
    this.database.add('items', {db: 'collectables', id: key});
    this.item = new Collectable();
  }

  delete(id) {
    this.database.delete(`items/collectables/${id}`);
  }
}
