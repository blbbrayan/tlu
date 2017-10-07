import {Turn} from "./turn.model";
import {Entity} from "./entity.model";

export class Room{

  turns: Turn[];
  battleReport: any[];

  allies: Entity[];
  enemies: Entity[];

  isHost: boolean;

  addReport(report){
    this.battleReport.push(report);
  }

}
