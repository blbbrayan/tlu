import { Injectable } from '@angular/core';
import {Account} from './models/account.model';
import {Character} from './models/character.model';
import {DataService} from './data.service';
import {FakeDataService} from './fake-data.service';
// import {ObjectUtil} from '../utils/object.util';

@Injectable()
export class AccountService {

    account: Account;
    character: Character;

  constructor(private database: DataService, private fakedata: FakeDataService) {
    this.account =  fakedata.account;
    this.character = fakedata.character;
  }

    login(onloaded){
        // this.database.get('characters', data=>{
        //     this.character = ObjectUtil.toArray(data).find(character=>character.id === this.account.characterId);
        //     console.log(this.account, this.character);
        //     onloaded();
        // });
    }

    save(){
        this.database.save(`accounts`, this.account.id, this.account);
    }



}
