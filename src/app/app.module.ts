import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './product-card/product-card.component'
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ShoppingCartService } from './shopping-cart.service';
import { appRoutingModule } from './app.routing';
import { httpInterceptorProviders } from './http-interceptors';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ProductCardComponent,
    ProductFilterComponent,
    ShoppingCartComponent,
    ProductQuantityComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFormsModule,
    HttpClientModule,
    NgbModule,
    appRoutingModule
  ],
  providers: [
    CategoryService,
    ProductService,
    HttpErrorHandler,
    ShoppingCartService,
    httpInterceptorProviders,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }