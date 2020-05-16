import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '@app/shopping-cart.service';
import { ShoppingCart } from '@app/model';
import { Subscription } from 'rxjs';
import { OrderService } from '@app/order.service';
import { AuthService } from '@app/auth/auth.service';
import { Order } from '@app/model/order';
import { Router } from '@angular/router';

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
  userId: number;
  subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.shoppingCartService.shoppingCart$.subscribe(cart =>
        this.cart = cart));

    this.subscriptions.push(
      this.authService.currentUser.subscribe(user =>
        this.userId = user.id));
  }

  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', 'order.Id']) //todo: orderId
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
