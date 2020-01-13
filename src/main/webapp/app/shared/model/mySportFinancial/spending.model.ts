export interface ISpending {
  id?: number;
  label?: string;
  amount?: number;
  status?: string;
}

export class Spending implements ISpending {
  constructor(public id?: number, public label?: string, public amount?: number, public status?: string) {}
}
