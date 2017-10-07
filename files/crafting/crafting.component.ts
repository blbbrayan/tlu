import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ObjectUtil} from "../utils/object.util";
import {Collectable} from "../services/models/item-collectable.model";
import {Item} from "../services/models/item.model";
import {Recipe} from "../services/models/recipe.model";
@Component({
  selector: 'app-crafting',
  templateUrl: './crafting.component.html',
  styleUrls: ['./crafting.component.css']
})
export class CraftingComponent {

    skills: any[];
    allRecipes: any[];
    recipes: any[];
    collectables: {collectable: any, amount: number}[];
    selectedSkill: number = 0;
    selectedRecipe: number = 0;

    constructor(private database: DataService) {
        this.init();
        this.database.subscribe('skills', data=>{
            data = data || {};
            this.skills = ObjectUtil.toArray(data);
            this.recipes.forEach(recipe=>recipe.skill = this.skills.find(skill=>skill.id === recipe.skillId));
            this.selectSkill(0);
        });
  }

    selectSkill(skill: number){
        this.selectedSkill=skill;
        this.recipes = this.allRecipes.filter(recipe=>recipe.skillId === this.skills[this.selectedSkill].id);
    }

  init() {
      this.recipes = [];
      this.skills = [];
      this.collectables = [];
      this.allRecipes = [];

      let collectables = [
        {name: "Empty"},
        {name: "Fire"},
        {name: "Water"},
        {name: "Earth"},
        {name: "Air"}
      ];
      let items = [
        {name: "Not Wowzers"},
        {name: "Doge"},
        {name: "Doge Prime"},
        {name: "Megatron"},
        {name: "Pantsu"}
      ];
      let recipes = [
          {
            item: items[0],
            itemsNeeded: [{item: collectables[4], amount: 5}],
            level: 1,
            skillId: "3f0877ec-c4a2-653a-79be-4e9e77034796"
          },
          {
            item: items[2],
            itemsNeeded: [{item: collectables[3], amount: 5}],
            level: 1,
            skillId: "3f0877ec-c4a2-653a-79be-4e9e77034796"
          },
          {
            item: items[3],
            itemsNeeded: [{item: collectables[0], amount: 5},{item: collectables[3], amount: 3},{item: collectables[2], amount: 2}],
            level: 1,
            skillId: "3f0877ec-c4a2-653a-79be-4e9e77034796"
          },
          {
            item: items[1],
            itemsNeeded: [{item: collectables[0], amount: 6},{item: collectables[2], amount: 6},{item: collectables[1], amount: 33.3}],
            level: 1,
            skillId: "0c2a0b1c-9a38-1cc2-59b0-a79669cac859"
          }
      ];

      recipes.forEach(recipe=>this.allRecipes.push(recipe));
      collectables.forEach(collectable=>this.collectables.push({collectable: collectable, amount: 99}));
  }

  isSelected(ar, item, v){
      return ar.indexOf(item) === v
  }


}
