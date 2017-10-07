import {Component, OnInit} from '@angular/core';
import {Monster, monsterRefresh} from '../../services/models/monster.model';
import {Character, characterRefresh} from '../../services/models/character.model';
import {AbilityUtil} from "../../utils/ability.util";
import {AccountService} from "../../services/account.service";
import {Ability} from "../../services/models/ability.model";
import {CombatUtil} from "../../utils/combat.util";
import {FakeDataService} from "../../services/fake-data.service";
import {Entity} from "../../services/models/entity.model";
import {Router} from "@angular/router";
import {Turn} from "../../services/models/turn.model";
import {Room} from "../../services/models/room.model";

@Component({
  selector: 'app-play-single-battle',
  templateUrl: './play-single-battle.component.html',
  styleUrls: ['./play-single-battle.component.css']
})
export class PlaySingleBattleComponent implements OnInit {

  player: Character;
  room: Room;

  playerReport: { crit: boolean, dodge: boolean, damage: number } = {crit: false, dodge: false, damage: 0};
  enemyReport: { crit: boolean, dodge: boolean, damage: number } = {crit: false, dodge: false, damage: 0};

  constructor(private account: AccountService, private data: FakeDataService, private router: Router) {}

  ngOnInit() {
    this.player = this.account.character;
    characterRefresh(this.player);
    this.enemy = this.data.selectedMonster;
    monsterRefresh(this.enemy);
  }

  canAttack(): boolean {
    return this.player.equipped.weapons.find(weapon => weapon.ability.interval === 0) !== undefined;
  }

  isDead(entity: Entity){
    if(entity.stats.health <= 0)
      this.router.navigate(['/home']);
  }

  attack(ability: Ability) {
    this.turns = [];
    setTimeout(() => {
      CombatUtil.startTurn(this.player);
      if (this.canAttack())
        this.turns.push(new Turn(this.player,this.enemy,(player, enemy)=>CombatUtil.attack(ability, player, enemy), true));
      this.turns.push(new Turn(this.enemy,this.player,(enemy, player)=>AbilityUtil.attack("agility", 0, enemy.stats, player.stats), false));
     this.turns.sort((a:Turn, b:Turn)=>{
       if(a.speed > b.speed)
         return 1;
       if(a.speed < b.speed)
         return -1;
       return 0;
     });
     this.turns.forEach((turn, i)=> setTimeout(()=>turn.isPlayer ? this.playerReport = turn.start() : this.enemyReport = turn.start(), i*300));
     this.isDead(this.player);
     this.isDead(this.enemy);
    }, 200);
  }


}
