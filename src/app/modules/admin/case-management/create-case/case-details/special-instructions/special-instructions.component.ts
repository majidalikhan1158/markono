import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-instructions',
  templateUrl: './special-instructions.component.html',
  styleUrls: ['./special-instructions.component.scss']
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
