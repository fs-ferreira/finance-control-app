import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryService } from './services/category.service';
import { EntryService } from './services/entry.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { ThemeService } from './services/theme.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
  ],
  providers: [CategoryService, EntryService, ThemeService],
  exports: [HttpClientModule],
})
export class CoreModule {}
