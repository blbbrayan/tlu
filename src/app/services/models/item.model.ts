import {ObjectUtil} from '../../utils/object.util';

export class Item{

    name: string;
    id: string;
    type: string;

constructor(type,name?){
    this.type = type;
    this.name = name || "";
    this.id = ObjectUtil.generateGuid();
}
    init(name,type){
        this.name = name;
        this.type = type;
        this.id = ObjectUtil.generateGuid();
        return this;
    }

}
