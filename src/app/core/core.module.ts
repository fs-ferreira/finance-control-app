import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryService } from './services/category.service';
import { EntryService } from './services/entry.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [CategoryService, EntryService],
})
export class CoreModule {}
