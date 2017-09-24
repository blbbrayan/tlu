import { Injectable } from '@angular/core';
import {Account} from './models/account.model';
import {Character} from './models/character.model';
import {DataService} from './data.service';
import {ObjectUtil} from '../utils/object.util';

@Injectable()
export class AccountService {
    
    account: Account;
    character: Character;
    
  constructor(private database: DataService) { }
    
    login(onloaded){
        this.database.get('characters', data=>{
            this.character = ObjectUtil.toArray(data).find(character=>character.id === this.account.characterId);
            console.log(this.account, this.character);
            onloaded();
        });
    }
    
    save(){
        this.database.set(`accounts/${this.account.id}`, this.account);
    }

}