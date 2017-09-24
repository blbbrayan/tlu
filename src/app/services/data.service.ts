import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  firebase: any = window['firebase'];

  database(path?: string){
    if(path)
      return this.firebase.database().ref(path);
    return this.firebase.database();
  }

  set(path: string, obj: any) {
    this.database(path).set(obj);
  }

  get(path: string, onloaded){
    this.database(path).once('value').then(function(snapshot) {
      onloaded(snapshot.val());
    });
  }

  subscribe(path: string, onChange){
    this.database(path).on('value', snapshot=> onChange(snapshot.val()));
  }

  delete(path: string){
    this.database(path).remove();
  }

  listAdd(path, obj){
    let ref = this.database(path).push();
    ref.set(obj);
  }

  listSubscribe(path, events: {onChange?, onAdd?, onRemove?}){
    let ref = this.database(path);
    if(events.onChange)
      ref.on('child_changed', data=>events.onChange(data.val()));
    if(events.onAdd)
      ref.on('child_added', data=>events.onAdd(data.val()));
    if(events.onRemove)
      ref.on('child_removed', data=>events.onRemove(data.val()));
  }

}
