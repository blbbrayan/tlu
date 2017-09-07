import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateCharacterComponent } from './create-character/create-character.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { HomeComponent } from './home/home.component';
import {DataService} from "./services/data.service";
import { AdminComponent } from './admin/admin.component';

const ROUTES = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'create-character', component: CreateCharacterComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateCharacterComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [DataService, Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    window["firebase"].initializeApp({
      apiKey: "AIzaSyBGIsOo1Kd2ULOJYxnBSQErpz704orxbBk",
      authDomain: "todd-lewis-universe.firebaseapp.com",
      databaseURL: "https://todd-lewis-universe.firebaseio.com",
      projectId: "todd-lewis-universe",
      storageBucket: "todd-lewis-universe.appspot.com",
      messagingSenderId: "285267866986"
    });
    console.log('data loaded');
  }
}
