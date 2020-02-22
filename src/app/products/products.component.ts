import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  categoryId: string;

  constructor(route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService) {
    productService.getAll().subscribe(products => this.products = products);
    //here do not need to subscribe, the async pipe will also trigger the request.
    this.categories$ = categoryService.getAll();

    route.queryParamMap.subscribe(params => {
      this.categoryId = params.get('category');

      this.filteredProducts = this.categoryId ?
        this.products.filter(p => p.category === this.categoryId) :
        this.products;
    });
  }

  ngOnInit() {
  }

}
