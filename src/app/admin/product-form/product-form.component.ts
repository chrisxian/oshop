import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<Category[]>;
  product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) 
    { 
      this.categories$ = categoryService.getCategories();
      let id = this.route.snapshot.paramMap.get('id');
      if(id){
        this.productService.get(id).subscribe(p=> this.product = p );
      }
  }

  ngOnInit() {
    this.categories$.subscribe(
      (next)=>{console.log(next)}
    );
  }

  save(product){
    // console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

}
