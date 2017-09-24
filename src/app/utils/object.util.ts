export class ObjectUtil{

    public static toArray(obj: any){
        return Object.keys(obj).map(key => obj[key]);
    }

    public static generateGuid(){
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
    
}