import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;

  qty: number;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    this.cartService.addToCart(this.product)
      .pipe(
        concatMap((_) => this.cartService.getCart())
      )
      .subscribe(cart =>
        this.qty = this.getQuantity(cart));
  }

  private getQuantity(shoppingCart: any) {
    if (!shoppingCart) {
      return 0;
    }
    let item = shoppingCart.items?.find(x => x.productId == this.product.id);
    return item ? item.quantity : 0
  }

}
