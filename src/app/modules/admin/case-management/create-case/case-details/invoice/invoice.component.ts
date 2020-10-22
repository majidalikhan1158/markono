import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  columnsToDisplay = ['#', 'Position', 'Notes', ''];
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
