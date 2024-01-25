import { Category } from './category.model';

export class Entry {
  constructor(
    public id?: number,
    public name?: string,
    public desc?: string,
    public type?: EntryType,
    public amount?: string,
    public date?: string | Date,
    public paid?: boolean,
    public category?: Category
  ) {}

  get paidText():string {
    return this.paid ? 'Pago' : 'Pendente'
  }
}

export enum EntryType {
  expense = 'Despesa',
  revenue = 'Receita'
}

