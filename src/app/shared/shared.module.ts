import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { MegaMenuModule } from 'primeng/megamenu';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import { IMaskModule } from 'angular-imask';

@Component({
  template: `<router-outlet></router-outlet> `,
})
export class EmptyComponent {}

@NgModule({
  declarations: [BreadcrumbComponent, EmptyComponent],
  imports: [CommonModule, MenubarModule, BreadcrumbModule],
  providers: [ConfirmationService],
  exports: [
    MenubarModule,
    TabViewModule,
    BreadcrumbModule,
    BreadcrumbComponent,
    PanelModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    BlockUIModule,
    MegaMenuModule,
    CalendarModule,
    InputSwitchModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    IMaskModule
  ],
})
export class SharedModule {}
