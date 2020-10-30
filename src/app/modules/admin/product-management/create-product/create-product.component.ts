import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
export interface PeriodicElement {
  id: number;
  isbn: string;
  productTitle: string;
  dateCreated: number;
  createdBy: string;
  isbnOwner: string;
  printingType: string;
  version: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, isbn: '8888889999990', productTitle: 'TestUATFinal_all components copy from 9783573894712', dateCreated: Date.now(), createdBy: 'John Doe', isbnOwner: 'DPE101US', printingType: 'Offset', version: 'V00001'},
  {id: 2, isbn: '9999998888887', productTitle: 'TestUATFinal_all components copy from 9783573894712', dateCreated: Date.now(), createdBy: 'Alina Mil', isbnOwner: 'DPB073', printingType: 'Offset', version: 'V00002'},
  {id: 3, isbn: '9999998888887', productTitle: 'Passer: Psychology 3e', dateCreated: Date.now(), createdBy: 'Milenda Cerny', isbnOwner: 'DPE082', printingType: 'Offset', version: 'V00003'},
];
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['id', 'isbn', 'productTitle', 'dateCreated', 'createdBy', 'isbnOwner', 'printingType', 'version'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
