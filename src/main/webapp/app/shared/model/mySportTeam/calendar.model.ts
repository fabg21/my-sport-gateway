import { IMatch } from 'app/shared/model/mySportTeam/match.model';

export interface ICalendar {
  id?: number;
  matchs?: IMatch[];
  seasonId?: number;
}

export class Calendar implements ICalendar {
  constructor(public id?: number, public matchs?: IMatch[], public seasonId?: number) {}
}
