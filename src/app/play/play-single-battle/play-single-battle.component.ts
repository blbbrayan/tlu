import { Component, OnInit } from '@angular/core';
import { Monster } from '../../services/models/monster.model';
import { Character } from '../../services/models/character.model';
import { Combat } from '../../services/models/combat.model';

@Component({
  selector: 'app-play-single-battle',
  templateUrl: './play-single-battle.component.html',
  styleUrls: ['./play-single-battle.component.css']
})
export class PlaySingleBattleComponent implements OnInit {

player: Character;
enemy: Monster;

constructor() { }

  ngOnInit() { 
    this.player = new Character();
    this.enemy = new Monster();
    this.setStats(this.player, "Dave", 8, 6, 6);
    this.setStats(this.enemy, "Spider", 3, 2, 6);
    this.player.combat = new Combat(this.player.red, this.player.blue, this.player.yellow);
    this.enemy.combat = new Combat(this.enemy.red, this.enemy.blue, this.enemy.yellow);
  }
    
get(obj){
    return JSON.stringify(obj);
}
    
setStats(e, name, red, blue, yellow){
    e.name=name;
    e.red=red;
    e.blue=blue;
    e.yellow=yellow;
}
    
attack(attacker, target){
    
}


}
