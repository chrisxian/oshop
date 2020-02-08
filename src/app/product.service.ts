import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from './model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  list: Product[];
  readonly productsURL = 'https://localhost:5001/api/products';
  //after adapting the server side to Enable Cross-Origin Request, 
  //still only https schema request are allowed, otherise there will still be
  //problem with the response from that server the lack of the necessary Access-Control-Allow-Origin header!

  //web API expects a special header in HTTP post/put/delete requests??
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

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
        tap((newProduct: Product) => console.log(`added hero w/ id=${newProduct.title}`)),
        catchError(this.handleError<Product>('create'))
      );
  }

  update(productId, product: Product): Observable<any> {
    return this.http.put(this.productsURL, product, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated product id=${product.title}`)),
        catchError(this.handleError<any>('updateProduct'))
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

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
