import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-special-instructions',
  templateUrl: './special-instructions.component.html',
  styleUrls: ['./special-instructions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpecialInstructionsComponent implements OnInit {
  columnsToDisplay = ['#', 'Department', 'Instructions', ''];
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
