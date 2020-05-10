import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  // initially set shipping to an empty object, 
  // otherwise access property of undefined error will disable the validation feature.
  shipping = {};

  constructor() { }

  ngOnInit() {
  }

}
