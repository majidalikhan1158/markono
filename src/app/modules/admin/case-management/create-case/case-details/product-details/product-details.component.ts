import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExpansionIcons } from 'src/app/modules/shared/enums/dynamic-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  columnsToDisplay = ['#', 'ISBN', 'Print Type', 'Order Qty', 'Prod Qty', 'Margin(%)', 'Sekking Price', 'Sub-Total'];
  shouldShowProductDetails = false;
  rowExpansionIcon = ExpansionIcons.KEYBOARD_ARROW_DOWN;
  constructor() {
  }

  ngOnInit(): void {
  }

  showProductDetails() {
    this.shouldShowProductDetails = !this.shouldShowProductDetails;
    this.rowExpansionIcon = this.shouldShowProductDetails ?
    ExpansionIcons.KEYBOARD_ARROW_UP :
    ExpansionIcons.KEYBOARD_ARROW_DOWN;
  }

}
