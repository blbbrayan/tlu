import {ObjectUtil} from '../../utils/object.util';
export class Race{
    id: string;
    name: string;
    desc: string;
    red: number;
    blue: number;
    yellow: number;
    
    constructor(){
        this.id = ObjectUtil.generateGuid();
        this.name = "";
        this.desc = "";
        this.red = 0;
        this.blue = 0;
        this.yellow = 0;
    }
    
}