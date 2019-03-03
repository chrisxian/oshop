import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: any[];
  
  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe(products => this.products = products)
   }

  ngOnInit() {
  }

  filter(query: string){
    console.log(query);
  }

}
