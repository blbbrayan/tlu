import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from "../services/data.service";
import {AccountService} from "../services/account.service";
import {ObjectUtil} from "../utils/object.util";
import {Character} from "../services/models/character.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  player: Character;

  constructor(private database: DataService, private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    if (!this.accountService.character)
      this.router.navigate(['/login']);
    this.player = this.accountService.character;
    console.log('player', this.player);
  }

  expNeeded() {
    return (this.player.level * 5) * 10;
  }

  addItem() {
    this.accountService.addItem('-KvxmD1yQtvCKD6lZPPo', 1);
  }

  battle() {
    // this.data.selectedMonster = this.data.monsters[Math.floor(Math.random() * this.data.monsters.length-1) + 1];
    this.router.navigate(['/play/battle']);
  }

}
