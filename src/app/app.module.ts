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
import {AccountService} from "./services/account.service";
import { AdminComponent } from './admin/admin.component';
import { GameComponent } from './game/game.component';
import { AdminCharacterComponent } from './admin/admin-character/admin-character.component';
import { AdminItemComponent } from './admin/item/item.component';
import { AdminMonsterComponent } from './admin/admin-monster/admin-monster.component';
import { AdminRaceComponent } from './admin/admin-race/admin-race.component';
import { AdminCollectableComponent } from './admin/item/item-collectable/item-collectable.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const ROUTES = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'home', component: HomeComponent},
  {path: 'create-character', component: CreateCharacterComponent},
  {path: 'game', component: GameComponent},
  {path: 'admin', component: AdminComponent},
    {path: 'admin/char', component: AdminCharacterComponent},
    {path: 'admin/item', component: AdminItemComponent},
    {path: 'admin/monster', component: AdminMonsterComponent},
    {path: 'admin/race', component: AdminRaceComponent},
    {path: 'admin/item/collectable', component: AdminCollectableComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateCharacterComponent,
    HomeComponent,
    AdminComponent,
    GameComponent,
    AdminCharacterComponent,
    AdminItemComponent,
    AdminMonsterComponent,
    AdminRaceComponent,
    AdminCollectableComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [DataService, AccountService, Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
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
