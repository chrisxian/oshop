import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, from, Subject } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Product, ShoppingCart, ShoppingCartItem } from '@app/model';
import { HandleError, HttpErrorHandler } from '@app/http-error-handler.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  readonly cartsURL = `${environment.apiUrl}/shoppingCarts`;
  public shoppingCart$: Subject<ShoppingCart>;

  // web API expects a special header in HTTP post/put/delete requests??
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ShoppingCartService');
    this.shoppingCart$ = new Subject<ShoppingCart>();
    this.getCart().subscribe(cartFromBackend =>
      this.shoppingCart$.next(
        new ShoppingCart(cartFromBackend.id, cartFromBackend.dateCreated, cartFromBackend.items)));
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
          var item = new ShoppingCartItem(product, 0);
          cart.items = [item];
        }
        var itemInCart = cart.items.find(x => x.product.id == product.id);
        if (!itemInCart) {
          itemInCart = new ShoppingCartItem(product, 1);
          cart.items.push(itemInCart);
        } else {
          itemInCart.quantity += change;
        }
        return this.update(cart.id, cart);
      })
    );
  }

  getCart(): Observable<ShoppingCart> {
    return this.getOrCreateCart().pipe(
      tap(cartId => {
        localStorage.setItem('cartId', cartId);
      }),
      switchMap(cartId => this.get(cartId))
    );
  }

  private update(cartId, cart: ShoppingCart): Observable<any> {
    const url = `${this.cartsURL}/${cartId}`;
    return this.http.put(url, cart, this.httpOptions)
      .pipe(
        tap(_ => {
          console.log(`updated shoppingCart, id=${cart.id}`);
          this.shoppingCart$.next(new ShoppingCart(cart.id, cart.dateCreated, cart.items));
        }),
        catchError(this.handleError<any>('updateShoppingCart', cart))
      );
  }

  private get(cartId: string): Observable<ShoppingCart> {
    const url = `${this.cartsURL}/${cartId}`;
    return this.http.get<ShoppingCart>(url).pipe(
      tap(_ => console.log(`fetched ShoppingCart, id=${cartId}`)),
      map(cartFromBe => new ShoppingCart(cartFromBe.id, cartFromBe.dateCreated, cartFromBe.items)),
      catchError(this.handleError<ShoppingCart>(`get ShoppingCart with Id=${cartId}`))
    );
  }

  private getOrCreateCart(): Observable<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return from([cartId])
    } else {
      return this.create().pipe(map(cart => cart.id));
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

  private create(): Observable<ShoppingCart> {
    let time = new Date().getTime();
    let cartNode = { dateCreated: time.toString() } as ShoppingCart;
    return this.http.post<ShoppingCart>(this.cartsURL, cartNode, this.httpOptions)
      .pipe(
        tap((newCart) => console.log(`ShoppingCartService create new cart, id=${newCart.id}`)),
        catchError(this.handleError<ShoppingCart>('create', cartNode))
      );
  }
}
