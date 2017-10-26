import {Room} from "../services/models/room.model";
import {Entity} from "../services/models/entity.model";
import {DataService} from "../services/data.service";
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";
import {ObjectUtil} from "./object.util";
import {Monster, monsterRefresh} from "../services/models/monster.model";
import {Character, characterRefresh} from "../services/models/character.model";

export class GameUtil {

  static setEntityLocation(entity: Entity, x, y) {
    entity.locX = x;
    entity.locY = y;
  }

  static createRoom(side1: Entity[], side2: Entity[], data: DataService, account: AccountService, router: Router) {
    let room = new Room();
    room.side1 = side1;
    room.side2 = side2;
    room.turns = [];
    room.turnIndex = 0;
    room.battleReport = [];
    room.host = true;
    room.tiles = GameUtil.generateWorld(10);
    room.id = data.add('rooms', room);
    room.side1.map(e=>GameUtil.initEntity(e, account));
    room.side2.map(e=>GameUtil.initEntity(e, account));
    GameUtil.loadTurns(room);
    account.room = room;
    data.save('rooms', room.id, room);
    router.navigate(['/play/world']);
  }

  static initEntity(entity: Entity, accountService: AccountService) {
    if (entity.type === 'monster')
      return monsterRefresh(entity);
    else if (entity.type === 'character')
      return characterRefresh(entity, accountService);
  }

  static generateWorld(size: number): number[] {
    let tiles = [];
    for (let i = 0; i < size * size; i++)
      tiles.push(1);
    return tiles;
  }

  static loadTurns(room: Room) {
    room.turns = ObjectUtil.shuffle(room.side1.concat(room.side2));
  }

  static startTurn(entity: Entity) {
    //todo: onTurnStartEffects
    entity.stats.speed = entity.baseStats.speed;
  }

}
