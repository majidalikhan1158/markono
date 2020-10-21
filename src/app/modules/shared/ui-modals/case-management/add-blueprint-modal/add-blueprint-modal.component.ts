import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../ui-services/modal.service';
import { UIModalID } from '../../../enums/ui-modal-ids';

@Component({
  selector: 'app-add-blueprint-modal',
  templateUrl: './add-blueprint-modal.component.html',
  styleUrls: ['./add-blueprint-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddBlueprintModalComponent implements OnInit {
  rowsToDisplay = [1];
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  addBluePrint() {
    this.modalService.close(UIModalID.ADD_BLUEPRINT_MODAL);
  }

  closeModal() {
    this.modalService.close(UIModalID.ADD_BLUEPRINT_MODAL);
  }

  addRow() {
    const lastIndex = this.rowsToDisplay.length > 0 ? this.rowsToDisplay.length : 1;
    const lastRowId = this.rowsToDisplay[lastIndex - 1];
    this.rowsToDisplay.push(lastRowId + 1);
  }

  deleteRow(rowId) {
    console.log(rowId);
    const rowIndex = this.rowsToDisplay.indexOf(rowId);
    this.rowsToDisplay.splice(rowIndex, 1);
    console.log(this.rowsToDisplay)
  }
}
