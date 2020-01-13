import { Moment } from 'moment';

export interface IPlayers {
  id?: number;
  firstname?: string;
  lastname?: string;
  dateOfBirth?: Moment;
  email?: string;
  address?: string;
  phone?: string;
  avatar?: string;
}

export class Players implements IPlayers {
  constructor(
    public id?: number,
    public firstname?: string,
    public lastname?: string,
    public dateOfBirth?: Moment,
    public email?: string,
    public address?: string,
    public phone?: string,
    public avatar?: string
  ) {}
}
