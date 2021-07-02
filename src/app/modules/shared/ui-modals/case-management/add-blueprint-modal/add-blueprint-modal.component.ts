import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../ui-services/modal.service';
import { UIModalID } from '../../../enums/app-constants';
import { ProductDetailModals, ProductDetailsVM } from '../../../models/create-case';
import { CaseStore } from '../../../ui-services/create-case.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blueprint-modal',
  templateUrl: './add-blueprint-modal.component.html',
  styleUrls: ['./add-blueprint-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddBlueprintModalComponent implements OnInit, OnDestroy {
  recordId: number;
  @Output() acceptEvent = new EventEmitter<ProductDetailModals[]>();
  bluePrintListVM: ProductDetailModals[] = [];
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
        if (productRecord && productRecord.productISBNDetail && productRecord.productISBNDetail.bluePrintList.length > 0) {
          this.bluePrintListVM = productRecord.productISBNDetail.bluePrintList;
          this.enableDeleteButton = true;
        }
      }
      if (this.bluePrintListVM.length === 0) {
        this.bluePrintListVM.push(this.initialObject());
      }
    });
  }

  addBluePrint(isAddMode: number) {
    const actualList = this.bluePrintListVM.filter(x => x.quantity > 0);
    this.acceptEvent.emit(actualList);
    this.bluePrintListVM = [];
    this.enableDeleteButton = false;
    this.modalService.close(UIModalID.ADD_BLUEPRINT_MODAL);
  }

  addRow() {
    this.bluePrintListVM.push(this.initialObject());
  }

  initialObject = (): ProductDetailModals => {
    return {
      id: this.bluePrintListVM.length + 1,
      requiredDate: '',
      forWho: '',
      quantity: 0,
      specialInstructions: ''
    };
  }

  deleteRow(rowId) {
    const filteredRows = this.bluePrintListVM.filter((x) => x.id !== rowId);
    filteredRows.forEach((x, i) => {
      x.id = i + 1;
    });
    this.bluePrintListVM = filteredRows;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
