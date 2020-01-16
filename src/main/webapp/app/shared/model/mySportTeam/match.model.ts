import { Moment } from 'moment';

export interface IMatch {
  id?: number;
  type?: string;
  date?: Moment;
  appointmentHour?: Moment;
  startTime?: Moment;
  place?: string;
  result?: number;
  scoreFor?: number;
  scoreAgainst?: number;
  opponentId?: number;
  calendarId?: number;
}

export class Match implements IMatch {
  constructor(
    public id?: number,
    public type?: string,
    public date?: Moment,
    public appointmentHour?: Moment,
    public startTime?: Moment,
    public place?: string,
    public result?: number,
    public scoreFor?: number,
    public scoreAgainst?: number,
    public opponentId?: number,
    public calendarId?: number
  ) {}
}
