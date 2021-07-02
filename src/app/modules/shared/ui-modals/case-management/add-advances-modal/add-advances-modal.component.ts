import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIModalID } from '../../../enums/app-constants';
import { ProductDetailModals, ProductDetailsVM } from '../../../models/create-case';
import { CaseStore } from '../../../ui-services/create-case.service';
import { ModalService } from '../../../ui-services/modal.service';

@Component({
  selector: 'app-add-advances-modal',
  templateUrl: './add-advances-modal.component.html',
  styleUrls: ['./add-advances-modal.component.scss']
})
export class AddAdvancesModalComponent implements OnInit, OnDestroy {
  recordId: number;
  @Output() acceptEvent = new EventEmitter<ProductDetailModals[]>();
  advanceListVM: ProductDetailModals[] = [];
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
        if (productRecord && productRecord.productISBNDetail && productRecord.productISBNDetail.advancesList.length > 0) {
          this.advanceListVM = productRecord.productISBNDetail.advancesList;
          this.enableDeleteButton = true;
        }
      }
      if (this.advanceListVM.length === 0) {
        this.advanceListVM.push(this.initialObject());
      }
    });
  }

  addAdvances(isAddMode: number) {
    const actualList = this.advanceListVM.filter(x => x.quantity > 0);
    this.acceptEvent.emit(actualList);
    this.advanceListVM = [];
    this.enableDeleteButton = false;
    this.modalService.close(UIModalID.ADD_ADVANCE_REQUIRED_MODAL);
  }

  addRow() {
    this.advanceListVM.push(this.initialObject());
  }

  initialObject = (): ProductDetailModals => {
    return {
      id: this.advanceListVM.length + 1,
      requiredDate: '',
      forWho: '',
      quantity: 0,
      specialInstructions: ''
    };
  }

  deleteRow(rowId) {
    const filteredRows = this.advanceListVM.filter((x) => x.id !== rowId);
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.advanceListVM = filteredRows;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
