import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Observable, from } from 'rxjs';
import { tap, catchError, take, map, concatMap } from 'rxjs/operators';
import { Product } from './model/product';

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

  addToCart(product: Product): Observable<any> {
    return this.getOrCreateCart().pipe(
      tap(cartId => {
        localStorage.setItem('cartId', cartId);
      }),
      concatMap(cartId =>
        this.addProductToCart(cartId, product)
      )
    );
  }

  private getOrCreateCart(): Observable<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return from([cartId])
    } else {
      return this.create().pipe(
        map(cart => cart.id)
      );
    }
  }

  private addProductToCart(cardId: string, product: Product): Observable<any> {
    const url = `${this.cartsURL}/${cardId}/${product.id}`;
    return this.http.put(url, {}, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated product id=${product.id}`)),
        catchError(this.handleError<any>('updateProduct', product))
      );
  }

  private create(): Observable<any> {
    let time = new Date().getTime();
    let cartNode = { dateCreated: time.toString() };
    return this.http.post<any>(this.cartsURL, cartNode, this.httpOptions)
      .pipe(
        tap((newNode) => console.log(`added cartNode w/ id=${newNode.id}`)),
        catchError(this.handleError<any>('create', cartNode))
      );
  }


}
