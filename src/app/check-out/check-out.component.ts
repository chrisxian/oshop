import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '@app/shopping-cart.service';
import { ShoppingCart } from '@app/model';
import { Subscription } from 'rxjs';
import { OrderService } from '@app/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  // initially set shipping to an empty object, 
  // otherwise access property of undefined error will disable the validation feature.
  shipping = {};
  cart: ShoppingCart;
  subscription: Subscription;
  constructor(
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.subscription =
      this.shoppingCartService.shoppingCart$.subscribe(cart => this.cart = cart);
  }

  placeOrder() {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.product.title,
            imageUrl: i.product.imageUrl,
            price: i.product.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    };

    this.orderService.storeOrder(order);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
