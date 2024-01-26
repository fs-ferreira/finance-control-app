import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import {
  showErrorMessage,
  showSuccessMessage,
} from 'src/app/shared/utils/utils';

import toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  public isEdit: boolean;
  public isSubmiting: boolean;
  public categoryForm: FormGroup;
  public title: string;
  public serverErrorMessages: string[];
  public category: Category;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _service: CategoryService
  ) {}

  ngOnInit(): void {
    this.checkIsEditable();
    this.createForm();
    this.loadData();
  }

  ngAfterContentChecked(): void {
    this.setTitle();
  }

  public submitForm() {
    this.isSubmiting = true;

    if (this.isEdit) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }

  public onReset() {
    const notResetId = this.isEdit && {
      id: this.categoryForm.get('id').value,
    };
    this.categoryForm.reset(notResetId);
  }

  private checkIsEditable() {
    this._activatedRoute.params.subscribe((params) =>
      params.id != 'new' ? (this.isEdit = true) : (this.isEdit = false)
    );
  }

  private createForm() {
    this.categoryForm = this._fb.group({
      id: [{ value: null, disabled: this.isEdit }, Validators.required],
      name: [null, Validators.required],
      desc: [null],
    });
  }

  private loadData() {
    if (this.isEdit) {
      this._activatedRoute.paramMap
        .pipe(switchMap((params) => this._service.getById(+params.get('id'))))
        .subscribe((data: Category) => {
          this.category = data;
          this.categoryForm.patchValue(data);
        }),
        (error) => alert('Erro ao carregar o formulário!');
    }
  }

  private setTitle() {
    if (this.isEdit) {
      const label = this.category
        ? `${this.category.id} - ${this.category.name}`
        : '';
      this.title = `Categoria: ${label}`;
    } else {
      this.title = 'Cadastro de categoria';
    }
  }

  private createCategory() {
    const category: Category = Object.assign(
      new Category(),
      this.categoryForm.getRawValue()
    );

    this._service.create(category).subscribe(
      (resp) => {
        showSuccessMessage();
        this._router.navigate(['categories']);
      },
      (error) => showErrorMessage()
    );
  }

  private updateCategory() {
    const category: Category = Object.assign(
      new Category(),
      this.categoryForm.getRawValue()
    );

    this._service.update(category).subscribe(
      (resp) => {
        showSuccessMessage();
        this._router.navigate(['categories']);
      },
      (error) => showErrorMessage()
    );
  }
}
