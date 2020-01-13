import { Moment } from 'moment';
import { ISeason } from 'app/shared/model/mySportTeam/season.model';

export interface IPlayer {
  id?: number;
  firstname?: string;
  lastname?: string;
  dateOfBirth?: Moment;
  email?: string;
  address?: string;
  phone?: string;
  avatar?: string;
  seasons?: ISeason[];
}

export class Player implements IPlayer {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public dateOfBirth?: Moment,
    public email?: string,
    public address?: string,
    public phone?: string,
    public avatar?: string,
    public seasons?: ISeason[]
  ) {}
}
