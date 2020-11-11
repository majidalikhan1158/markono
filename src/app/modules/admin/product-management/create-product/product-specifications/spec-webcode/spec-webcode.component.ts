import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WebCodeVM } from 'src/app/modules/shared/models/product-spec';

@Component({
  selector: 'app-spec-webcode',
  templateUrl: './spec-webcode.component.html',
  styleUrls: ['./spec-webcode.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecWebcodeComponent implements OnInit {
  columnsToDisplay = ['#', 'WebCode Location', 'No. of WebCode', 'X Coordinate', 'Y Coordinate', 'Special Instruction'];
  rowsToDisplay: WebCodeVM[] = [];
  constructor() { }

  ngOnInit(): void {
    this.addRow();
  }

  addRow() {
    const totalRows = this.rowsToDisplay.length;
    this.rowsToDisplay.push({
      id: totalRows + 1,
      webcodeLocation: '',
      noOfWebcode: '',
      xCoordinate: 0,
      ycoordinate: 0,
      specialInstructions: ''
    });
  }

  deleteRow(recordId) {
    const filteredRows = this.rowsToDisplay.filter((x) => x.id !== recordId);
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.rowsToDisplay = filteredRows;
  }

}
