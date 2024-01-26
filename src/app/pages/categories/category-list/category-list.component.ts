import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  public categories: Category[];
  public currentCategory: Category;

  constructor(
    private _service: CategoryService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._service.getAll().subscribe(
      (data) => (this.categories = data),
      (error) => alert('Erro ao carregar a listagem')
    );
  }

  public deleteCategory(id: number) {
    this._confirmationService.confirm({
      message: 'Deseja realmente excluir esse item?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this._service
          .delete(id)
          .subscribe(
            () =>
              (this.categories = this.categories.filter((el) => el.id != id))
          );
      },
    });
  }
}
