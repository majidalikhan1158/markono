import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ProductSpecTypes } from 'src/app/modules/shared/enums/app-enums';
import { WebCodeVM } from 'src/app/modules/shared/models/product-spec';
import { ProductSpecStore } from '../../../../../shared/ui-services/product-spec.service';

@Component({
  selector: 'app-spec-webcode',
  templateUrl: './spec-webcode.component.html',
  styleUrls: ['./spec-webcode.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SpecWebcodeComponent implements OnInit, OnDestroy {
  columnsToDisplay = ['#', 'WebCode Location', 'No. of WebCode', 'X Coordinate', 'Y Coordinate', 'Special Instruction'];
  viewModal: WebCodeVM[] = [];
  constructor(private store: ProductSpecStore) { }

  ngOnInit(): void {
    this.getDefaultRecord();
  }

  getDefaultRecord = () => {
    this.store.$productSpecStore.subscribe(resp => {
      if (resp && resp.webCodeVM && resp.webCodeVM.length > 0) {
        this.viewModal = resp.webCodeVM;
      } else {
        this.initialObject();
      }
    });
  }

  initialObject = () => {
    const totalRows = this.viewModal.length;
    this.viewModal.push({
      id: totalRows + 1,
      webcodeLocation: '',
      noOfWebcode: '',
      xCoordinate: 0,
      ycoordinate: 0,
      specialInstructions: ''
    });
  }

  addRow() {
   this.initialObject();
  }

  deleteRow(recordId) {
    const filteredRows = this.viewModal.filter((x) => x.id !== recordId);
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.viewModal = filteredRows;
  }

  ngOnDestroy(): void {
    this.store.setProductSpecStore(this.viewModal, ProductSpecTypes.WEBCODE);
  }

}
