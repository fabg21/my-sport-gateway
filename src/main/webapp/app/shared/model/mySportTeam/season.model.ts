import { Moment } from 'moment';
import { IPlayer } from 'app/shared/model/mySportTeam/player.model';

export interface ISeason {
  id?: number;
  start?: Moment;
  end?: Moment;
  teamIdId?: number;
  players?: IPlayer[];
}

export class Season implements ISeason {
  constructor(public id?: number, public start?: Moment, public end?: Moment, public teamIdId?: number, public players?: IPlayer[]) {}
}
