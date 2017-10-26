export class ObjectUtil {

  public static toArray(obj: any) {
    return Object.keys(obj).map(key => obj[key]);
  }

  public static generateGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  static clone(obj: any) {
    return Object.assign({}, obj);
  }

  static waitUntil(condition, onresult) {
    let listener = setInterval(()=>{
      if(condition()) {
        onresult();
        clearInterval(listener);
      }
    }, 100);
  }

  static shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
