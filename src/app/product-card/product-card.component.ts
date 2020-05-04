import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product, ShoppingCart } from '@app/model';
import { ShoppingCartService } from '../shopping-cart.service';
import { concatMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;

  qty: number = 0;
  subscription: Subscription;

  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.subscription = 
    this.cartService.getCart().subscribe(cart => this.qty = cart.getQuantity(this.product));
    this.cartService.shoppingCart$.subscribe(cart => this.qty = cart.getQuantity(this.product));
  }

  addToCart(): void {
    this.cartService.addToCart(this.product).subscribe(_ => { });
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
