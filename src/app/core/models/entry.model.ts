import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Category } from './category.model';

export class Entry extends BaseResourceModel {
  constructor(
    public id?: number,
    public name?: string,
    public desc?: string,
    public type?: EntryType,
    public amount?: string,
    public date?: string | Date,
    public paid?: boolean,
    public category?: Category
  ) {
    super();
  }

  static fromJson(data: any): Entry {
    return Object.assign(new Entry(), data);
  }

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }
}

export enum EntryType {
   'Despesa' = 'expense',
   'Receita' = 'revenue',
}
