import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  columnsToDisplay = ['#', 'ISBN', 'Print Type', 'Order Qty', 'Prod Qty', 'Margin(%)', 'Sekking Price', 'Sub-Total'];
  constructor() { }

  ngOnInit(): void {
  }

}
