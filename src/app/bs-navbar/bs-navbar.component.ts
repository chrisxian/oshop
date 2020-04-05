import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@app/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '@app/model';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  shoppingCart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService, private router: Router,
    private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.shoppingCart$ = this.shoppingCartService.shoppingCart$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
