import { Injectable, Injector } from '@angular/core';
import { Entry } from '../models/entry.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(protected readonly injector: Injector) {
    super('api/entries', injector, Entry.fromJson);
  }
}
