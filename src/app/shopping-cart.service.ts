import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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

  addToCart(product: Product) {
    this.getOrCreateCartId();
    // TODO: add product to cart.
  }

  private getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.create().subscribe(cart => {
        localStorage.setItem('cartId', cart.id);
      });
    }
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
