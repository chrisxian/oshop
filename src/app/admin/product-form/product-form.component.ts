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
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      // this.product =  this.productService.get(this.id).pipe(take(1));
      this.productService.get(this.id).subscribe(
        (p) => {
          this.product = p;
          console.log(p);
        }
      );
      /*
      // oops ... subscribe() is missing so nothing happens,
      // the request only happen else a observable is subscribed!!
      // https://angular.io/guide/#http
      */
    }
  }

  ngOnInit() {
    this.categories$.subscribe(
      (next) => { console.log(next) }
    );
  }

  save(product: any) {
    // console.log(product);
    let navigateAfterSave = (_) => {
      this.router.navigate(['/admin/products']);
    }
    if (this.id) {
      product.id = this.id;//product is from ngForm, where id is not bound, has to populate with id property.
      //https://stackoverflow.com/questions/20258994/bind-hidden-inputs-to-model-in-angular
      this.productService.update(this.id, product).subscribe(navigateAfterSave);
    } else {
      this.productService.create(product).subscribe(navigateAfterSave);
    }
    // this.router.navigate(['/admin/products']);   
  }

  delete() {
    //this simple confirm popup will be later replaced by bootstrap popup.
    if (!confirm("Are you sure you want to delete this product ?"))
      return;

    this.productService.delete(this.id).subscribe(
      (_)=> this.router.navigate(['/admin/products'])  //afterwards, redirect to product list.
    );
    //again, no subscription, no request is made!!
  }
}
