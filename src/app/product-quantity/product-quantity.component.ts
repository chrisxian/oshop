import { Component, OnInit, Input } from '@angular/core';
import { Product, ShoppingCart } from '@app/model';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '@app/shopping-cart.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product;
  qty: number = 0;
  subscription: Subscription;

  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.subscription = this.cartService.getCart()
      .subscribe(cart => this.qty = cart.getQuantity(this.product));

    this.cartService.shoppingCart$.
      subscribe(cart => this.qty = cart.getQuantity(this.product));
  }


  addToCart(): void {
    this.cartService.addToCart(this.product).subscribe();
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.product).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
