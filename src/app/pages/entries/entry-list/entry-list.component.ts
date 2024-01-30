import { Component, Injector, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Entry, EntryType } from 'src/app/core/models/entry.model';
import { EntryService } from 'src/app/core/services/entry.service';
import { BaseResourceListDirective } from 'src/app/shared/components/base-resource-list/base-resource-list.directive';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'],
})
export class EntryListComponent extends BaseResourceListDirective<Entry> {
  public alignRight = 'text-right';

  constructor(protected service: EntryService, protected injector: Injector) {
    super(service, injector);
  }

  public checkEntryType(row: Entry): string {
    return row.type === EntryType.Despesa ? 'text-danger' : 'text-success';
  }
}
