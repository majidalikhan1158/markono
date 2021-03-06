import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIModalID } from '../../../enums/app-constants';
import { ProductDetailModals, ProductDetailsVM } from '../../../models/create-case';
import { CaseStore } from '../../../ui-services/create-case.service';
import { ModalService } from '../../../ui-services/modal.service';

@Component({
  selector: 'app-add-fg-required-modal',
  templateUrl: './add-fg-required-modal.component.html',
  styleUrls: ['./add-fg-required-modal.component.scss']
})
export class AddFgRequiredModalComponent implements OnInit, OnDestroy {
  recordId: number;
  @Output() acceptEvent = new EventEmitter<ProductDetailModals[]>();
  fgRequiredListVM: ProductDetailModals[] = [];
  productDetailsVMList: ProductDetailsVM[] = [];
  subscription: Subscription; 
  enableDeleteButton = false;
  constructor(private modalService: ModalService, private store: CaseStore) { }

  ngOnInit(): void {
    this.store.productDetailsId.subscribe(x => {
      this.recordId = x;
      this.getDefaultRecord();
    });
  }

  getDefaultRecord = () => {
    this.subscription = this.store.createCaseStore.subscribe((resp) => {
      if (
        resp &&
        resp.productDetailsList &&
        resp.productDetailsList.length > 0
      ) {
        this.productDetailsVMList = resp.productDetailsList;
        const productRecord = this.productDetailsVMList.find(x => x.id === this.recordId);
        if (productRecord && productRecord.productISBNDetail && productRecord.productISBNDetail.fgList.length > 0) {
          this.fgRequiredListVM = productRecord.productISBNDetail.fgList;
          this.enableDeleteButton = true;
        }
      }
      if (this.fgRequiredListVM.length === 0) {
        this.fgRequiredListVM.push(this.initialObject());
      }
    });
  }

  addFG(isAddMode: number) {
    const actualList = this.fgRequiredListVM.filter(x => x.quantity > 0);
    this.acceptEvent.emit(actualList);
    this.fgRequiredListVM = [];
    this.enableDeleteButton = false;
    this.modalService.close(UIModalID.ADD_FG_REQUIRED_MODAL);
  }

  addRow() {
    this.fgRequiredListVM.push(this.initialObject());
  }

  initialObject = (): ProductDetailModals => {
    return {
      id: this.fgRequiredListVM.length + 1,
      requiredDate: '',
      forWho: '',
      quantity: 0,
      specialInstructions: ''
    };
  }

  deleteRow(rowId) {
    const filteredRows = this.fgRequiredListVM.filter((x) => x.id !== rowId);
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.fgRequiredListVM = filteredRows;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
