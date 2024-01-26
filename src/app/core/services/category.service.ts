import { Category } from 'src/app/core/models/category.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseResourceService<Category> {
  constructor(protected readonly injector: Injector) {
    super('api/categories', injector, Category.fromJson);
  }
}
