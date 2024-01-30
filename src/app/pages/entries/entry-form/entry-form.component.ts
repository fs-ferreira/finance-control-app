import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { Category } from 'src/app/core/models/category.model';
import { Entry, EntryType } from 'src/app/core/models/entry.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { EntryService } from 'src/app/core/services/entry.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import {
  enumOptions,
  ptBRDateLocale,
  toDate,
} from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent
  extends BaseResourceFormComponent<Entry>
  implements OnInit
{
  public ptBR = ptBRDateLocale();
  public entryTypes = enumOptions(EntryType);
  public categoryList: Category[] = [];

  constructor(
    protected _injector: Injector,
    protected _service: EntryService,
    protected _categoryService: CategoryService
  ) {
    super(new Entry(), _service, Entry.fromJson, _injector);
  }

  ngOnInit(): void {
    this.loadCategories();
    super.ngOnInit();
  }

  protected toSavePattern() {
    moment.locale('pt-br');
    const formValue = this.resourceForm.getRawValue();
    let amountUS = parseFloat(formValue.amount).toFixed(2).toString();
    return {
      ...formValue,
      date: moment(formValue.date).format('L').toString(),
      amount: amountUS.replace('.', ','),
      type: formValue.type.value,
    };
  }

  protected toFormPattern(data: Entry): any {
    return {
      ...data,
      date: toDate(data.date),
      amount: parseFloat(data.amount.replace(',', '.')),
      type: { value: data.type },
    };
  }

  protected loadCategories() {
    this._categoryService.getAll().subscribe(
      (data) => (this.categoryList = data),
      (error) => alert('Erro ao carregar as categorias')
    );
  }

  protected createForm() {
    this.resourceForm = this.fb.group({
      id: [{ value: null, disabled: this.isEdit }, Validators.required],
      name: [null, Validators.required],
      desc: [null],
      type: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      paid: [false, Validators.required],
      category: [null, Validators.required],
    });
  }

  protected get newHeaderTitle(): string {
    return 'Cadastro de lançamentos';
  }

  protected get editHeaderTitle(): string {
    const label = `${this.resource.id} - ${this.resource.name}`;
    return `Lançamento: ${this.hasResourceBeenLoaded ? label : '...'}`;
  }
}
