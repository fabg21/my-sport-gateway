export interface IOpposingTeam {
  id?: number;
  name?: string;
}

export class OpposingTeam implements IOpposingTeam {
  constructor(public id?: number, public name?: string) {}
}
