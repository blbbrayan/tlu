import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  email: string;
  password: string;
  confirmPassword: string;
  error: string;

  constructor(private accountService: AccountService, private router: Router) {}

  submit() {
    this.accountService.createAccount(this.email, this.password,()=>this.router.navigate(['/login']), er=>{
      this.error = er.message;
      this.password = "";
      this.confirmPassword = "";
    });
  }

}
