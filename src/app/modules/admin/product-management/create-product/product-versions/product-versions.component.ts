import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductVersionMockDataList } from 'src/app/modules/shared/mock-data/product-versions-data-list';

@Component({
  selector: 'app-product-versions',
  templateUrl: './product-versions.component.html',
  styleUrls: ['./product-versions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductVersionsComponent implements OnInit {
  displayedColumns = ['versionNo', 'dateCreated', 'createdBy', 'versionDescription', 'estimateNo', 'isSpecsInView'];
  dataSource = ProductVersionMockDataList;
  constructor() { }

  ngOnInit(): void {
  }

}
