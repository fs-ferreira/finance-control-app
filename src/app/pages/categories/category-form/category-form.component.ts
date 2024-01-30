import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {
  constructor(
    protected _injector: Injector,
    protected _service: CategoryService
  ) {
    super(new Category(), _service, Category.fromJson, _injector);
  }

  protected createForm() {
    this.resourceForm = this.fb.group({
      id: [{ value: null, disabled: this.isEdit }, Validators.required],
      name: [null, Validators.required],
      desc: [null],
    });
  }

  protected get newHeaderTitle(): string {
    return 'Cadastro de categorias';
  }

  protected get editHeaderTitle(): string {
    const label = `${this.resource.id} - ${this.resource.name}`;
    return `Categoria: ${this.hasResourceBeenLoaded ? label : '...'}`;
  }
}
