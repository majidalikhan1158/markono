import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExpansionIcons } from 'src/app/modules/shared/enums/dynamic-icons';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  columnsToDisplay = ['#', 'ISBN', 'Print Type', 'Order Qty', 'Prod Qty', 'Margin(%)', 'Selling Price', 'Sub-Total'];
  rowsToDisplay = [1];
  rowIdToExpand = 0;
  shouldShowProductDetails = false;
  ExpansionIcons =  ExpansionIcons;
  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  showProductDetails(rowId: number) {
    if (this.rowIdToExpand === rowId) {
      this.rowIdToExpand = 0;
      this.shouldShowProductDetails = !this.shouldShowProductDetails;
    } else {
      this.rowIdToExpand = rowId;
      this.shouldShowProductDetails = true;
    }
  }

  addRow() {
    const lastRowId = this.rowsToDisplay[this.rowsToDisplay.length - 1];
    this.rowsToDisplay.push(lastRowId + 1);
    this.rowIdToExpand = 0;
  }

  handleAddBluePrintEvent(modalId: string) {

  }

  handleModalRejectEvent(modalId: string) {

  }

  openUiModal(modalId: string){
    this.modalService.open(modalId);
  }
}
