import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { UIModalID } from '../../../enums/app-constants';
import { CreateCaseDataType } from '../../../enums/app-enums';
import { ProductVersionMockDataList } from '../../../mock-data/product-versions-data-list';
import { ProductDetailModals, ProductDetailsVM } from '../../../models/create-case';
import { CaseStore } from '../../../ui-services/create-case.service';
import { ModalService } from '../../../ui-services/modal.service';

@Component({
  selector: 'app-view-all-modal',
  templateUrl: './view-all-modal.component.html',
  styleUrls: ['./view-all-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewAllModalComponent implements OnInit, OnDestroy {
  @Input() recordId: number;
  @Output() acceptEvent = new EventEmitter<ProductDetailModals[]>();

  displayedColumns = ['isSpecsInView', 'versionNo', 'dateCreated', 'createdBy', 'versionDescription', 'estimateNo'];
  dataSource = ProductVersionMockDataList;
  constructor(private modalService: ModalService, private store: CaseStore) { }

  ngOnInit(): void {
    console.log('kkkkkk', this.recordId)
  }

  Save() {
    // const actualList = this.samplesListVM.filter(x => x.quantity > 0);
    // this.acceptEvent.emit(actualList);
    this.modalService.close(UIModalID.VIEW_ALL_MODAL);
  }

  ngOnDestroy(): void {
  }
}

