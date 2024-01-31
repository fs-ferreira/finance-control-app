import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ChartOverviewComponent } from './chart-overview/chart-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [ChartOverviewComponent],
  imports: [CommonModule, ReportsRoutingModule, SharedModule, CoreModule],
})
export class ReportsModule {}
