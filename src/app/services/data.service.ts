import {Injectable} from '@angular/core';
import {ObjectUtil} from "../utils/object.util";

@Injectable()
export class DataService {

  firebase: any = window['firebase'];

  database(path?: string) {
    if (path)
      return this.firebase.database().ref(path);
    return this.firebase.database();
  }

  get(path: string, onloaded) {
    this.database(path).once('value').then(function (snapshot) {
      onloaded(snapshot.val());
    });
  }

  private key(str: string) {
    return str ? `/${str}` : ''
  }

  private list(ar: any) {
    Object.keys(ar).forEach(key => ar[key].id = key);
    return ObjectUtil.toArray(ar);
  }

  subscribe(path: string, key: string, onChange: any) {
    this.database(path + this.key(key)).on('value', snapshot => {
      let data = snapshot.val();
      onChange(key ? Object.assign({id: key}, data) : this.list(data))
    });
  }

  delete(path: string) {
    this.database(path).remove();
  }

  save(path, key, obj) {
    this.database(path + this.key(key)).set(obj);
  }

  add(path: string, item: any) {
    let key = this.database(path).push().key;
    this.database().ref().update({[path + '/' + key]: item});
    return key;
  }

}
