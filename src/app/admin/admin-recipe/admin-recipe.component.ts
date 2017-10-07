import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../services/models/recipe.model';
import { Collectable } from '../../services/models/item-collectable.model';
import {ObjectUtil} from '../../utils/object.util';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-admin-recipe',
  templateUrl: './admin-recipe.component.html',
  styleUrls: ['./admin-recipe.component.css', '../admin.component.css']
})

export class AdminRecipeComponent implements OnInit {
    
    tempRecipe: Recipe;
    recipes: any[];
    selectedItem: Collectable;
    collectables : Collectable[] = [];
    items: any[];
    categories: {name: string, items: any[]}[] = [];
    
    constructor(private database: DataService) { 
        this.tempRecipe = new Recipe();
        this.database.subscribe('items', items=>{
            items = items || [];
            let i = [];
            ObjectUtil.toArray(items).forEach((ar, index) =>{ 
                i = i.concat(ObjectUtil.toArray(ar));
                const name = Object.keys(items)[index];
                this.categories.push({name: name, items: ObjectUtil.toArray(items[name])});
            });
            this.items = i;
            console.log(this.categories);
        });
        this.database.subscribe('collectables', collectables=>{
            collectables = collectables || [];
            this.collectables = ObjectUtil.toArray(collectables)
        });
    }

    ngOnInit() {}

    selectItemTobeMade(collectable: Collectable){
        this.selectedItem = collectable;
        this.tempRecipe.itemId = collectable.id;
    }
    
    submit(){
        if(this.tempRecipe.itemId !== undefined && this.tempRecipe.itemsNeeded !== undefined && this.tempRecipe.level !== undefined){
            this.database.listAdd('items/collectables', this.tempRecipe);
            console.log("saving", this.tempRecipe);
        }else{
            console.log("not saving", this.tempRecipe);
        }
    }

}
