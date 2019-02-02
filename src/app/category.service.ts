import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from './model/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  getCategories():Observable<Category[]>{
    return this.db.collection("categories")
    .snapshotChanges()
      .pipe(
        map(actions=>{
          return actions.map(a=>{
            //get document data
            const data = a.payload.doc.data();
            //get document id
            const id = a.payload.doc.id;
            //Spread syntax ( 展开语法)： 还可以在构造字面量对象时, 将对象表达式按key-value的方式展开
            //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            return {id, ...data} as Category;
          })
        })        
      );
  }
}
