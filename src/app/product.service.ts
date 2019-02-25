import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: AngularFirestoreCollection;
  constructor(private db: AngularFirestore) { 
    this.products = db.collection("products");
  }

  create(product){
    this.products.add(product);
  }

  getAll(){
    return this.products.valueChanges();
  }
}
