import {ObjectUtil} from '../../utils/object.util';

export class Item{
    
    name: string;
    id: string;
    
constructor(){
    this.name = "";
    this.id = ObjectUtil.generateGuid();
}
    
}