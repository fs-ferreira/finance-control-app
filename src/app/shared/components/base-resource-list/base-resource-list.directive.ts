import { Directive, Injector, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs/operators';

@Directive()
export abstract class BaseResourceListDirective<T extends BaseResourceModel>
  implements OnInit
{
  public resources: T[];
  public confirmationService: ConfirmationService;
  public isLoading = false;

  constructor(
    protected service: BaseResourceService<T>,
    protected injector: Injector
  ) {
    this.confirmationService = injector.get(ConfirmationService);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.service
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (data) => (this.resources = data),
        (error) => alert('Erro ao carregar a listagem')
      );
  }

  public deleteById(id: number): void {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir esse item?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.service
          .delete(id)
          .subscribe(
            () => (this.resources = this.resources.filter((el) => el.id !== id))
          );
      },
    });
  }
}
