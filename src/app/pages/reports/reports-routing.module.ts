import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyComponent } from 'src/app/shared/shared.module';
import { ChartOverviewComponent } from './chart-overview/chart-overview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/reports',
    pathMatch: 'full',
  },
  {
    path: 'reports',
    component: EmptyComponent,
    data: {
      breadcrumb: 'Relatórios',
    },
    children: [
      {
        path: '',
        component: ChartOverviewComponent,
        data: {
          breadcrumb: '',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
