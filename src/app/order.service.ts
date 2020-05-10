import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  storeOrder(order: { datePlaced: number; shipping: {}; items: { product: { title: string; imageUrl: string; price: number; }; quantity: number; totalPrice: number; }[]; }) {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
