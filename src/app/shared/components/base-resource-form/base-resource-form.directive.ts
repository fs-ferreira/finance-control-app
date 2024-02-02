import {
  AfterContentChecked,
  Directive,
  Injector,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { showErrorMessage, showSuccessMessage } from '../../utils/utils';

@Directive()
export abstract class BaseResourceFormDirective<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked
{
  public isEdit: boolean;
  public isSubmiting: boolean;
  public isLoading: boolean;
  public resourceForm: FormGroup;
  public title: string;

  protected router: Router;
  protected activatedRoute: ActivatedRoute;
  protected fb: FormBuilder;

  constructor(
    public resource: T,
    protected service: BaseResourceService<T>,
    protected jsonConverterFn: (data) => T,
    protected injector: Injector
  ) {
    this.activatedRoute = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.fb = injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.checkIsEditable();
    this.createForm();
    this.loadData();
  }

  ngAfterContentChecked(): void {
    this.setTitle();
  }

  public submitForm(): void {
    this.isSubmiting = true;
    if (this.isEdit) {
      this.updateResource();
    } else {
      this.createResource();
    }
  }

  public onReset(): void {
    const notResetId = this.isEdit && {
      id: this.resourceForm.get('id').value,
    };
    this.resourceForm.reset(notResetId);
  }

  protected checkIsEditable(): void {
    this.activatedRoute.params.subscribe((params) =>
      params.id !== 'new' ? (this.isEdit = true) : (this.isEdit = false)
    );
  }

  protected loadData(): void {
    if (this.isEdit) {
      this.isLoading = true;
      this.activatedRoute.paramMap
        .pipe(switchMap((params) => this.service.getById(+params.get('id'))))
        .subscribe((data: T) => {
          this.resource = data;
          this.isLoading = false;
          this.resourceForm.patchValue(this.toFormPattern(data));
        });
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

  protected setTitle(): void {
    if (this.isEdit) {
      this.title = this.editHeaderTitle;
    } else {
      this.title = this.newHeaderTitle;
    }
  }

  protected createResource(): void {
    const resource: T = this.jsonConverterFn(this.toSavePattern());

    this.service.create(resource).subscribe(
      () => this.successBehavior(),
      (error) => showErrorMessage()
    );
  }

  protected updateResource(): void {
    const resource: T = this.jsonConverterFn(this.toSavePattern());

    this.service.update(resource).subscribe(
      () => this.successBehavior(),
      (error) => showErrorMessage()
    );
  }

  protected toFormPattern(data: T): any {
    return data;
  }

  protected toSavePattern(): any {
    return this.resourceForm.getRawValue();
  }

  protected abstract createForm(): void;

  private successBehavior(): void {
    showSuccessMessage();
    this.router.navigate([this.activatedRoute.parent.snapshot.url[0].path]);
  }
}
