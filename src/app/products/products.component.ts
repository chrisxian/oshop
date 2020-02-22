import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$;
  categories$;
  
  constructor(private productService: ProductService, private categoryService: CategoryService) { 
    this.products$ = productService.getAll();
    //here do not need to subscribe, the async pipe will also trigger the request.
    this.categories$ = categoryService.getAll();
  }

  ngOnInit() {
  }

}
