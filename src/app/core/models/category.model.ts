import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Category extends BaseResourceModel {
  constructor(public id?: number, public name?: string, public desc?: string) {
    super();
  }

  static fromJson(data: any): Category {
    return Object.assign(new Category(), data);
  }
}
