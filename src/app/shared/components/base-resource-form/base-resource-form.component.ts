import {
  AfterContentChecked,
  Directive,
  Injector,
  OnInit,
} from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceService } from '../../services/base-resource.service';
import { switchMap } from 'rxjs/operators';
import { showErrorMessage, showSuccessMessage } from '../../utils/utils';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked
{
  public isEdit: boolean;
  public isSubmiting: boolean;
  public resourceForm: FormGroup;
  public title: string;

  protected router: Router;
  protected activatedRoute: ActivatedRoute;
  protected fb: FormBuilder;

  constructor(
    public resource: T,
    protected _service: BaseResourceService<T>,
    protected _jsonConverterFn: (data) => T,
    protected _injector: Injector
  ) {
    this.activatedRoute = _injector.get(ActivatedRoute);
    this.router = _injector.get(Router);
    this.fb = _injector.get(FormBuilder);
  }
  
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
      this.updateResource();
    } else {
      this.createResource();
    }
  }

  public onReset() {
    const notResetId = this.isEdit && {
      id: this.resourceForm.get('id').value,
    };
    this.resourceForm.reset(notResetId);
  }

  protected checkIsEditable() {
    this.activatedRoute.params.subscribe((params) =>
      params.id != 'new' ? (this.isEdit = true) : (this.isEdit = false)
    );
  }

  protected loadData() {
    if (this.isEdit) {
      this.activatedRoute.paramMap
        .pipe(switchMap((params) => this._service.getById(+params.get('id'))))
        .subscribe((data: T) => {
          this.resource = data;
          this.resourceForm.patchValue(this.toFormPattern(data));
        }),
        (error) => alert('Erro ao carregar o formulário!');
    }
  }

  protected get newHeaderTitle(): string {
    return 'Novo';
  }

  protected get hasResourceBeenLoaded(): boolean {
    return !!this.resource.id;
  }

  protected get editHeaderTitle(): string {
    return 'Item';
  }

  protected setTitle() {
    if (this.isEdit) {
      this.title = this.editHeaderTitle;
    } else {
      this.title = this.newHeaderTitle;
    }
  }

  protected createResource() {
    const resource: T = this._jsonConverterFn(this.toSavePattern());

    this._service.create(resource).subscribe(
      () => this.successBehavior(),
      (error) => showErrorMessage()
    );
  }

  protected updateResource() {
    const resource: T = this._jsonConverterFn(this.toSavePattern());

    this._service.update(resource).subscribe(
      () => this.successBehavior(),
      (error) => showErrorMessage()
    );
  }

  protected abstract createForm(): void;
  
  protected toFormPattern(data: T): any {
    return data;
  };

  protected toSavePattern(): any {
    return this.resourceForm.getRawValue();
  };


  private successBehavior(): void {
    showSuccessMessage();
    this.router.navigate([this.activatedRoute.parent.snapshot.url[0].path]);
  }
}
