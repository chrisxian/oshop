import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;

  @Input('category') categoryId;
  
  constructor(
    private categoryService: CategoryService) { 
      this.categories$ = this.categoryService.getAll();
      // no need to subscribe, the asycn pipe '|' also can unwrap the observable.
  
    }

  ngOnInit(): void {
  }

}
