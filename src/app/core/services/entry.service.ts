import { Injectable, Injector } from '@angular/core';
import { Entry } from '../models/entry.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(protected readonly injector: Injector) {
    super('api/entries', injector, Entry.fromJson);
  }

  public getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map((entries) => this.filterByMonthAndYear(entries, month, year))
    );
  }

  private filterByMonthAndYear(
    data: Entry[],
    month: number,
    year: number
  ): Entry[] {
    return data.filter((entry) => {
      const entryDate = moment(entry.date, 'DD/MM/YYYY');
      const monthFilter = entryDate.month() + 1 === month;
      const yearFilter = entryDate.year() === year;

      if (monthFilter && yearFilter) {
        return entry;
      }
    });
  }
}
