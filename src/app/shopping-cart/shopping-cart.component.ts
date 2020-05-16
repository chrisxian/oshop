import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '@app/shopping-cart.service';
import { ShoppingCart } from '@app/model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<ShoppingCart>;
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.cart$ = this.shoppingCartService.shoppingCart$;
  }

  clearCart(){
    this.shoppingCartService.clearCart().subscribe();
  }

}
