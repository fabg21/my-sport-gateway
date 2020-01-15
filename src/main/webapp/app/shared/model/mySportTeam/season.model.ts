import { Moment } from 'moment';
import { IPlayer } from 'app/shared/model/mySportTeam/player.model';

export interface ISeason {
  id?: number;
  start?: Moment;
  end?: Moment;
  current?: boolean;
  teamIdId?: number;
  players?: IPlayer[];
}

export class Season implements ISeason {
  constructor(
    public id?: number,
    public start?: Moment,
    public end?: Moment,
    public current?: boolean,
    public teamIdId?: number,
    public players?: IPlayer[]
  ) {
    this.current = this.current || false;
  }
}
