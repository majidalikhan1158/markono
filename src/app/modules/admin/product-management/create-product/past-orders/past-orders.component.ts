import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PastOrdersMockDataList } from 'src/app/modules/shared/mock-data/past-orders-data-list';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PastOrdersComponent implements OnInit {
  displayedColumns = ['orderDate', 'jobNo', 'customer', 'existingRefNo', 'quantity', 'jobType'];
  dataSource = PastOrdersMockDataList;
  constructor() { }

  ngOnInit(): void {
  }

}
