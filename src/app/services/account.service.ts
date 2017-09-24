import { Injectable } from '@angular/core';
import {Account} from './models/account.model';
import {Character} from './models/character.model';
import {DataService} from './data.service';

@Injectable()
export class AccountService {
    
    account: Account;
    character: Character;
    
  constructor(private database: DataService) { }
    
    save(){
        this.database.set(`accounts/${this.account.id}`, this.account);
    }

}
