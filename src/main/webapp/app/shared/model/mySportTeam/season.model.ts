import { Moment } from 'moment';

export interface ISeason {
  id?: number;
  debut?: Moment;
  fin?: Moment;
  teamIdId?: number;
}

export class Season implements ISeason {
  constructor(public id?: number, public debut?: Moment, public fin?: Moment, public teamIdId?: number) {}
}
