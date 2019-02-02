import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<Category[]>;
  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
    this.categories$.subscribe(
      (next)=>{console.log(next)}
    );
  }

  save(product){
    console.log(product);
  }

}
