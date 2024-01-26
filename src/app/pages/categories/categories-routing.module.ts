import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { EmptyComponent } from 'src/app/shared/shared.module';



const routes: Routes = [
  {
    path: 'categories',
    component: EmptyComponent,
    data: {
      breadcrumb: 'Lista de categorias',
    },
    children: [
      {
        path: '',
        component: CategoryListComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: ':id',
        component: CategoryFormComponent,
        data: {
          breadcrumb: 'Categoria',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
