import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Observable, from } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
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
    return this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product): Observable<any> {
    return this.updateItemQuantity(product, -1);
  }

  private updateItemQuantity(product, change: number): Observable<any> {
    return this.getOrCreateCart().pipe(
      tap(cartId => localStorage.setItem('cartId', cartId)),
      switchMap(cartId => this.get(cartId)),
      switchMap(cart => {
        if (!cart.items) {
          var item = { productId: product.id, quantity: 0 };
          cart.items = [item];
        }
        var itemInCart = cart.items.find(x => x.productId == product.id);
        if (!itemInCart) {
          itemInCart = { productId: product.id, quantity: 1 };
          cart.items.push(itemInCart);
        } else {
          itemInCart.quantity += change;
        }
        return this.update(cart.id, cart);
      })
    );
  }

  update(cartId, cart: any): Observable<any> {
    const url = `${this.cartsURL}/${cartId}`;
    return this.http.put(url, cart, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated shoppingCart, id=${cart.id}`)),
        catchError(this.handleError<any>('updateShoppingCart', cart))
      );
  }

  getCart(): Observable<any> {
    return this.getOrCreateCart().pipe(
      tap(cartId => {
        localStorage.setItem('cartId', cartId);
      }),
      switchMap(cartId => this.get(cartId))
    );
  }

  private get(cartId: string): Observable<any> {
    const url = `${this.cartsURL}/${cartId}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched ShoppingCart, id=${cartId}`)),
      catchError(this.handleError<Product>(`get ShoppingCart with Id=${cartId}`))
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

  // deprecated: url is not RESTful
  private addProductToCart(cardId: string, product: Product): Observable<any> {
    const url = `${this.cartsURL}/${cardId}/${product.id}`;
    return this.http.put(url, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addProductToCart', {}))
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
