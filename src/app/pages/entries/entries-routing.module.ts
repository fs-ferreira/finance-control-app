import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyComponent } from 'src/app/shared/shared.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

const routes: Routes = [
  {
    path: 'entries',
    component: EmptyComponent,
    data: {
      breadcrumb: 'Lista de lançamentos',
    },
    children: [
      {
        path: '',
        component: EntryListComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: ':id',
        component: EntryFormComponent,
        data: {
          breadcrumb: 'Lançamento',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
