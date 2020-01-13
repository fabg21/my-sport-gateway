export interface ITeam {
  id?: number;
  name?: string;
  logo?: string;
}

export class Team implements ITeam {
  constructor(public id?: number, public name?: string, public logo?: string) {}
}
