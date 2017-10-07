import {Recipe} from "./recipe.model";

export class Skill {
  id: string;
  name: string;
  recipeIds: string[];
  recipe: Recipe[];

  constructor() {
    this.name = "";

  }
}
