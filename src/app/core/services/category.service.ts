import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Category } from '../models/category.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiPath = 'api/categories';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Category[]> {
    return this.http
      .get(this.apiPath)
      .pipe(catchError(this.handleError), map(this.jsonToArray));
  }

  public getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonToObject));
  }

  public create(category: Category): Observable<Category> {
    return this.http
      .post(this.apiPath, category)
      .pipe(catchError(this.handleError), map(this.jsonToObject));
  }

  public update(category: Category): Observable<Category> {
    return this.http.put(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(() => category)
    );
  }

  public delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private jsonToArray(data: any[]): Category[] {
    const categories: Category[] = [];

    data.forEach((el) => categories.push(el as Category));

    return categories;
  }

  private jsonToObject(data: any): Category {
    return data as Category;
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
