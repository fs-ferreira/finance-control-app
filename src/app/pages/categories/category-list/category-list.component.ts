import { Component, Injector } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { BaseResourceListDirective } from 'src/app/shared/components/base-resource-list/base-resource-list.directive';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent extends BaseResourceListDirective<Category> {
  constructor(
    protected service: CategoryService,
    protected injector: Injector
  ) {
    super(service, injector);
  }
}
