import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from "../services/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(private accountService: AccountService, private router: Router) {
  }

  signIn() {
    this.accountService.signIn(this.email, this.password, console.error);
  }
}
