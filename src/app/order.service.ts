import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly ordersURL = `${environment.apiUrl}/orders`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ProductService');
  }

  storeOrder(order: { datePlaced: number; shipping: {}; items: { product: { title: string; imageUrl: string; price: number; }; quantity: number; totalPrice: number; }[]; }) {
    return this.http.post<any>(this.ordersURL, order, this.httpOptions)
      .pipe(
        tap((newOrder: any) => console.log(`order stored w/ datePlaced=${newOrder.datePlaced}`)),
        catchError(this.handleError<any>('create', order))
      );
  }
}
