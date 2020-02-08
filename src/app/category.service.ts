import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Category } from './model/category';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly categoriesURL = 'https://localhost:5001/api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesURL)
      .pipe(
        tap(_ => console.log('fetched categories')),
        catchError(this.handleError('getCategories', []))
      );
  }

  /**
  * todo: to be extract to base class.
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

  // constructor(private db: AngularFirestore) { }

  // getCategories():Observable<Category[]>{
  //   return this.db.collection("categories", ref => ref.orderBy('name'))
  //   .snapshotChanges()
  //     .pipe(
  //       map(actions=>{
  //         return actions.map(a=>{
  //           //get document data
  //           const data = a.payload.doc.data();
  //           //get document id
  //           const id = a.payload.doc.id;
  //           //Spread syntax ( 展开语法)： 还可以在构造字面量对象时, 将对象表达式按key-value的方式展开
  //           //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  //           return {id, ...data} as Category;
  //         })
  //       })        
  //     );
  // }


}
