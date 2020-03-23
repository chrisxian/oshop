import { Routes, RouterModule } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { LoginComponent } from "./login/login.component";
import { ProductFormComponent } from "./admin/product-form/product-form.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'check-out', component: CheckOutComponent },
    { path: 'order-success', component: OrderSuccessComponent },
    { path: 'my/orders', component: MyOrdersComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin/products/new', component: ProductFormComponent },
    { path: 'admin/products/:id', component: ProductFormComponent },
    { path: 'admin/products', component: AdminProductsComponent },
    { path: 'admin/orders', component: AdminOrdersComponent },
];

export const appRoutingModule = RouterModule.forRoot(routes);