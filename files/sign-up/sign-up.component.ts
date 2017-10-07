import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Account} from "../services/models/account.model";
import {ObjectUtil} from "../utils/object.util";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    confirmTempPassword: string;
    account: Account = new Account();
    error: string;
    accounts: any[];
    
  constructor(private database: DataService) { }

  ngOnInit() {
      this.database.subscribe('accounts', data=> {
            data = data || {};
            this.accounts = ObjectUtil.toArray(data);
        });
  }
    
    submit(){
        if(!this.checkEmails())
            return this.error = "Email Taken";
        if(!this.checkPasswords())
            return this.error = "Passwords do not match!"
        console.log('Account Created');
        this.database.listAdd('accounts', this.account);
    }
    
    checkPasswords(){
        return this.account.password === this.confirmTempPassword;
    }
    checkEmails(){
        return this.accounts.find(account=>account.value.email===this.account.email) === undefined;
    }
    
}
