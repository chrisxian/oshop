import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: AngularFirestoreCollection<Product>;
  constructor(private db: AngularFirestore) { 
    this.products = db.collection<Product>("products");
  }

  create(product){
    this.products.add(product);
  }

  getAll(){
    return this.products.valueChanges();
  }

  get(productId){
    return this.products.doc(`products/${productId}`).valueChanges();
  }

  update(productId, product){
    //id or $key cannot be in a object that passed to firebase update method, otherwise runtime exception!
    return this.products.doc(`products/${productId}`).update(product);
  }

  delete(productId){
    return this.products.doc(`products/${productId}`).delete();
    //return a Promise.
  }

}
