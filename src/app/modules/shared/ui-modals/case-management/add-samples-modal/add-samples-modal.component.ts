import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UIModalID } from '../../../enums/app-constants';
import { CreateCaseDataType } from '../../../enums/app-enums';
import { ProductDetailModals, ProductDetailsVM } from '../../../models/create-case';
import { CaseStore } from '../../../ui-services/create-case.service';
import { ModalService } from '../../../ui-services/modal.service';

@Component({
  selector: 'app-add-samples-modal',
  templateUrl: './add-samples-modal.component.html',
  styleUrls: ['./add-samples-modal.component.scss']
})
export class AddSamplesModalComponent implements OnInit, OnDestroy {
  @Input() recordId: number;
  @Output() acceptEvent = new EventEmitter<ProductDetailModals[]>();
  samplesListVM: ProductDetailModals[] = [];
  productDetailsVMList: ProductDetailsVM[] = [];
  constructor(private modalService: ModalService, private store: CaseStore) { }

  ngOnInit(): void {
    this.getDefaultRecord();
  }

  getDefaultRecord = () => {
    this.store.createCaseStore.subscribe((resp) => {
      if (
        resp &&
        resp.productDetailsList &&
        resp.productDetailsList.length > 0
      ) {
        this.productDetailsVMList = resp.productDetailsList;
        const productRecord = this.productDetailsVMList.find(x => x.id === this.recordId);
        if (productRecord && productRecord.productISBNDetail && productRecord.productISBNDetail.sampleList.length > 0) {
          this.samplesListVM = productRecord.productISBNDetail.sampleList;
        }
      }
      if (this.samplesListVM.length === 0) {
        this.samplesListVM.push(this.initialObject());
      }
    });
  }

  addSample() {
    const actualList = this.samplesListVM.filter(x => x.quantity > 0);
    this.acceptEvent.emit(actualList);
    this.modalService.close(UIModalID.ADD_SAMPLES_MODAL);
  }

  addRow() {
    this.samplesListVM.push(this.initialObject());
  }

  initialObject = (): ProductDetailModals => {
    return {
      id: this.samplesListVM.length + 1,
      requiredDate: '',
      forWho: '',
      quantity: 0,
      specialInstructions: ''
    };
  }

  deleteRow(rowId) {
    this.samplesListVM = this.samplesListVM.filter(x => x.id !== rowId);
  }

  ngOnDestroy(): void {
  }
}
