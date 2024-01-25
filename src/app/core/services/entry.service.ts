import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private apiPath = 'api/entries';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Entry[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonToArray));
  }

  public getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonToObject));
  }

  public create(entry: Entry): Observable<Entry> {
    return this.http
      .post(this.apiPath, entry)
      .pipe(catchError(this.handleError), map(this.jsonToObject));
  }

  public update(entry: Entry): Observable<Entry> {
    return this.http.put(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    );
  }

  public delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonToArray(data: any[]): Entry[] {
    const entries: Entry[] = [];

    data.forEach((el) => {
      const entry = Object.assign(new Entry(), el);
      entries.push(entry);
    });

    return entries;
  }

  private jsonToObject(data: any): Entry {
    return Object.assign(new Entry(), data);
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
