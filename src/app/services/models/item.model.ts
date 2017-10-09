export class Item{
    id: string;
    itemId: string;
    name: string;
    type: string;

constructor(type,name?){
    this.type = type;
    this.name = name || "";
}
    init(name,type){
        this.name = name;
        this.type = type;
        return this;
    }

}
