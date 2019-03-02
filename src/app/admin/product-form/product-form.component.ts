import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<Category[]>;
  product = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) 
    { 
      this.categories$ = categoryService.getCategories();
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id){
        this.product =  this.productService.get(this.id).pipe(take(1));
      }
  }

  ngOnInit() {
    this.categories$.subscribe(
      (next)=>{console.log(next)}
    );
  }

  save(product){
    // console.log(product);
    if(this.id){
      this.productService.update(this.id, product);
    }else{
      this.productService.create(product);      
    }
    this.router.navigate(['/admin/products']);   
  }

  delete(){
    //this simple confirm popup will be later replaced by bootstrap popup.
    if(!confirm("Are you sure you want to delete this product ?"))
      return;
    
    this.productService.delete(this.id);
    //afterwards, redirect to product list.
    this.router.navigate(['/admin/products']);  
    
  }
}
