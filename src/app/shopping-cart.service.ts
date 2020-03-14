import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  readonly cartsURL = 'https://localhost:5001/api/shoppingCarts';

  // web API expects a special header in HTTP post/put/delete requests??
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ShoppingCartService');
  }

  create(): Observable<any> {
    let time = new Date().getTime();
    let cartNode = { dateCreated: time.toString() };
    return this.http.post<any>(this.cartsURL, cartNode, this.httpOptions)
      .pipe(
        tap((newNode) => console.log(`added cartNode w/ id=${newNode.id}`)),
        catchError(this.handleError<any>('create', cartNode))
      );
  }
}
