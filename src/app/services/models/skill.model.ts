import {ObjectUtil} from '../../utils/object.util';
import {Recipe} from "./recipe.model";

export class Skill{
    id: string;
    name: string;
    recipe: Recipe[];
    
    constructor(){
        this.id = ObjectUtil.generateGuid();
        this.name = "";
        
    }
    
}