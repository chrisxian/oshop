import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  categoryId: string;

  constructor(route: ActivatedRoute,
    private productService: ProductService) {

    productService.getAll()
      .pipe(switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }))
      .subscribe(params => {
        this.categoryId = params.get('category');

        this.filteredProducts = this.categoryId ?
          this.products.filter(p => p.category === this.categoryId) :
          this.products;
      });
  }

  ngOnInit() {
  }

}
