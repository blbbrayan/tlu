import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {DataService} from "./services/data.service";
import {AccountService} from "./services/account.service";
import {AbilityService} from "./services/abilities.service";

import {PlayGardenComponent} from './play/play-garden/play-garden.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {CreateCharacterComponent} from './create-character/create-character.component';
import { InventoryComponent } from './inventory/inventory.component';
import {AdminCharacterComponent} from './admin/admin-character/admin-character.component';
import {AdminItemComponent} from './admin/item/item.component';
import {AdminMonsterComponent} from './admin/admin-monster/admin-monster.component';
import {AdminRaceComponent} from './admin/admin-race/admin-race.component';
import {AdminCollectableComponent} from './admin/item/item-collectable/item-collectable.component';
import {SignUpComponent} from './sign-up/sign-up.component';
// import { CraftingComponent } from './crafting/crafting.component';
import {AdminSkillsComponent} from './admin/admin-skills/admin-skills.component';
import {AdminRecipeComponent} from './admin/admin-recipe/admin-recipe.component';
import { ItemArmorComponent } from './admin/item/item-armor/item-armor.component';
import { ItemWeaponComponent } from './admin/item/item-weapon/item-weapon.component';
import {Ability} from "./services/models/ability.model";
import { PlayWorldComponent } from './play/play-world/play-world.component';
// import { SingleBattleReportComponent } from './play/single-battle-report/single-battle-report.component';

const ROUTES = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'home', component: HomeComponent},
  {path: 'inventory', component: InventoryComponent},
  //     {path: 'crafting', component: CraftingComponent},
  {path: 'create-character', component: CreateCharacterComponent},
  {path: 'play/garden', component: PlayGardenComponent},
  {path: 'play/world', component: PlayWorldComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/char', component: AdminCharacterComponent},
  {path: 'admin/item', component: AdminItemComponent},
  {path: 'admin/monster', component: AdminMonsterComponent},
  {path: 'admin/race', component: AdminRaceComponent},
  {path: 'admin/recipe', component: AdminRecipeComponent},
  {path: 'admin/skills', component: AdminSkillsComponent},
  {path: 'admin/item/collectable', component: AdminCollectableComponent},
  {path: 'admin/item/armor', component: ItemArmorComponent},
  {path: 'admin/item/weapon', component: ItemWeaponComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateCharacterComponent,
    HomeComponent,
    AdminComponent,
    PlayGardenComponent,
    InventoryComponent,
    AdminCharacterComponent,
    AdminItemComponent,
    AdminMonsterComponent,
    AdminRaceComponent,
    AdminCollectableComponent,
    SignUpComponent,
    // CraftingComponent,
    AdminSkillsComponent,
    AdminRecipeComponent,
    ItemArmorComponent,
    ItemWeaponComponent,
    PlayWorldComponent,
    // SingleBattleReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers:
    [DataService, AccountService,AbilityService, Location, {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }],
  bootstrap:
    [AppComponent]
})

export class AppModule {
  constructor() {
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
