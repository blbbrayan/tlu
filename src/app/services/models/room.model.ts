import {Turn} from "./turn.model";
import {Entity} from "./entity.model";

export class Room{

  id: string;
  turns: Entity[];
  turnIndex: 0;
  turnEnd: boolean;
  battleReport: Turn[];

  side1: Entity[];
  side2: Entity[];
  tiles: number[];

  host: boolean;

  addReport(report){
    this.battleReport.push(report);
  }

}
