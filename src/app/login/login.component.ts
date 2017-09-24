import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from "../services/data.service"; 
import {AccountService} from "../services/account.service"; 
import {ObjectUtil} from "../utils/object.util";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    accounts: any[];
    
  constructor(private database: DataService, private accountService: AccountService, private router: Router) { }
//[routerLink]="['/create-character']"
    
  ngOnInit() {
      this.database.subscribe('accounts', data => {
            this.accounts = ObjectUtil.toArray(data) || [];
            Object.keys(data).forEach((id, index)=>this.accounts[index].id = id);
            console.log('accounts', this.accounts);
        });
  } 
    
    signIn(){
        this.accounts.forEach(item => {
            if(this.compareAccount(item.email, item.password))
               this.accountService.account = item;
        })
        if(this.accountService.account){
            if(!this.accountService.account.characterId)
                this.router.navigate(['/create-character']);
            this.router.navigate(['/home']);
        }else{
            this.password = "";
            alert("email/password incorrectly entered");
        }
    }
    compareAccount (email, password) {
        console.log(email, this.email, password, this.password)
        return (this.email === email && this.password === password); 
    }
}
