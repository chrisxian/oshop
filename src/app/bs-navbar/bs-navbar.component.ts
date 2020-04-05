import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@app/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  shoppingCartItemCount: number;

  constructor(private authService: AuthService, private router: Router,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.shoppingCartService.shoppingCart$.subscribe(cart=>{
      this.shoppingCartItemCount = cart.totalItemsCount;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
