import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { ConfirmationService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ButtonsHeaderComponent } from './components/buttons-header/buttons-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { FormFooterComponent } from './components/form-footer/form-footer.component';

@Component({
  template: `<router-outlet></router-outlet> `,
})
export class EmptyComponent {}

@NgModule({
  declarations: [
    BreadcrumbComponent,
    EmptyComponent,
    ButtonsHeaderComponent,
    FormFieldErrorComponent,
    FormFooterComponent,
  ],
  imports: [CommonModule, MenubarModule, BreadcrumbModule, ButtonModule],
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
    IMaskModule,
    ButtonsHeaderComponent,
    FormFieldErrorComponent,
    FormFooterComponent,
  ],
})
export class SharedModule {}
