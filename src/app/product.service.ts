import { Injectable } from '@angular/core';
import { Product } from './model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  list: Product[];
  readonly productsURL = 'https://localhost:5001/api/products';
  // after adapting the server side to Enable Cross-Origin Request,      
  // still only https schema request are allowed, otherise there will still be
  // problem with the response from that server the lack of the necessary Access-Control-Allow-Origin header!

  // web API expects a special header in HTTP post/put/delete requests??
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ProductService');
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL)
      .pipe(
        tap(_ => console.log('fetched products')),
        catchError(this.handleError('getAll', []))
      );
  }

  get(productId: string): Observable<Product> {
    const url = `${this.productsURL}/${productId}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched Product id=${productId}`)),
      catchError(this.handleError<Product>(`get productId=${productId}`))
    );
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsURL, product, this.httpOptions)
      .pipe(
        tap((newProduct: Product) => console.log(`added product w/ title=${newProduct.title}`)),
        catchError(this.handleError<Product>('create', product))
      );
  }

  update(productId, product: Product): Observable<any> {
    const url = `${this.productsURL}/${productId}`;
    return this.http.put(url, product, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated product id=${product.id}`)),
        catchError(this.handleError<any>('updateProduct', product))
      );
  }

  delete(product: Product | string): Observable<Product> {
    const id = typeof product === 'string' ? product : product.id;
    const url = `${this.productsURL}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted plroduct id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
}
