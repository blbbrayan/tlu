export class ObjectUtil{

    public static toArray(obj: any){
        return Object.keys(obj).map(key => obj[key]);
    }

}