import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-misc-cost',
  templateUrl: './misc-cost.component.html',
  styleUrls: ['./misc-cost.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MiscCostComponent implements OnInit {
  columnsToDisplay = ['#', 'Cost Category', 'Description', 'Sub-Total', ''];
  rowsToDisplay = [1];
  constructor() { }

  ngOnInit(): void {
  }

  addRow() {
    const lastRowId = this.rowsToDisplay[this.rowsToDisplay.length - 1];
    this.rowsToDisplay.push(lastRowId + 1);
  }

  deleteRow(rowId) {
    const rowIndex = this.rowsToDisplay.indexOf(rowId);
    this.rowsToDisplay.splice(rowIndex, 1);
  }
}
