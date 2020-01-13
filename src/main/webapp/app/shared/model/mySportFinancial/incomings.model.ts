export interface IIncomings {
  id?: number;
  label?: string;
  amount?: number;
  status?: string;
  category?: string;
}

export class Incomings implements IIncomings {
  constructor(public id?: number, public label?: string, public amount?: number, public status?: string, public category?: string) {}
}
