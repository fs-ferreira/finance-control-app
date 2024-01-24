import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    TabViewModule
  ],
  exports: [
    MenubarModule,
    TabViewModule
  ]
})
export class SharedModule { }
