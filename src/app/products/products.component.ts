import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$;
  constructor(private productService: ProductService) { 
    this.products$ = productService.getAll();
    //here do not need to subscribe, the async pipe will also trigger the request.
  }

  ngOnInit() {
  }

}
