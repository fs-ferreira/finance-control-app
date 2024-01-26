import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { map, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { Entry, EntryType } from 'src/app/core/models/entry.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { EntryService } from 'src/app/core/services/entry.service';
import {
  ptBRDateLocale,
  showErrorMessage,
  showSuccessMessage,
  toDate,
} from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'],
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  public isEdit: boolean;
  public isSubmiting: boolean;
  public entryForm: FormGroup;
  public title: string;
  public serverErrorMessages: string[];
  public entry: Entry;
  public ptBR = ptBRDateLocale();

  public entryTypes: { name: string; value: string }[] = [
    { name: EntryType.expense, value: EntryType.expense },
    { name: EntryType.revenue, value: EntryType.revenue },
  ];

  public categoryList: Category[] = [];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _service: EntryService,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.checkIsEditable();
    this.createForm();
    this.loadData();
  }

  ngAfterContentChecked(): void {
    this.setTitle();
  }

  public submitForm() {
    this.isSubmiting = true;
    this.convertFormToObject();

    if (this.isEdit) {
      this.updateEntry();
    } else {
      this.createEntry();
    }
  }

  public onReset() {
    const notResetId = this.isEdit && {
      id: this.entryForm.get('id').value,
    };
    this.entryForm.reset(notResetId);
  }

  private convertFormToObject() {
    moment.locale('pt-br');
    const formValue = this.entryForm.getRawValue();
    let amountUS = parseFloat(formValue.amount).toFixed(2).toString();
    this.entry = {
      ...formValue,
      date: moment(formValue.date).format('L').toString(),
      amount: amountUS.replace('.', ','),
      type: formValue.type.value,
    };
  }

  private loadCategories() {
    this._categoryService.getAll().subscribe(
      (data) => (this.categoryList = data),
      (error) => alert('Erro ao carregar as categorias')
    );
  }

  private checkIsEditable() {
    this._activatedRoute.params.subscribe((params) =>
      params.id != 'new' ? (this.isEdit = true) : (this.isEdit = false)
    );
  }

  private createForm() {
    this.entryForm = this._fb.group({
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

  private loadData() {
    if (this.isEdit) {
      this._activatedRoute.paramMap
        .pipe(switchMap((params) => this._service.getById(+params.get('id'))))
        .subscribe((data: Entry) => {
          this.entry = data;
          this.entryForm.patchValue({
            ...data,
            date: toDate(data.date),
            amount: parseFloat(data.amount.replace(',', '.')),
            type: { name: data.type, value: data.type },
          });
        }),
        (error) => alert('Erro ao carregar o formulário!');
    }
  }

  private setTitle() {
    if (this.isEdit) {
      const label = this.entry ? `${this.entry.id} - ${this.entry.name}` : '';
      this.title = `Lançamento: ${label}`;
    } else {
      this.title = 'Cadastro de lançamento';
    }
  }

  private createEntry() {
    const entryObj: Entry = Entry.fromJson(this.entry);
    this._service.create(entryObj).subscribe(
      (resp) => {
        showSuccessMessage();
        this._router.navigate(['entries']);
      },
      (error) => showErrorMessage()
    );
  }

  private updateEntry() {
    const entryObj: Entry = Entry.fromJson(this.entry);
    this._service.update(entryObj).subscribe(
      (resp) => {
        showSuccessMessage();
        this._router.navigate(['entries']);
      },
      (error) => showErrorMessage()
    );
  }
}
