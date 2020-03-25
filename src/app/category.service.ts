import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Category } from '@app/model';
import { HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from '@app/http-error-handler.service';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly categoriesURL = `${environment.apiUrl}/categories`;

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesURL)
      .pipe(
        tap(_ => console.log('fetched categories')),
        catchError(this.handleError('getCategories', []))
      );
  }
}
