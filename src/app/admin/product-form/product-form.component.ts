import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<Category[]>;
  constructor(categoryService: CategoryService, private productService: ProductService) { 
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
    this.categories$.subscribe(
      (next)=>{console.log(next)}
    );
  }

  save(product){
    // console.log(product);
    this.productService.create(product);
  }

}
