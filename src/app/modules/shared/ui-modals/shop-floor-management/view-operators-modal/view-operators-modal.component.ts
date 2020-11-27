import { Component, OnInit } from '@angular/core';
import { UIModalID } from '../../../enums/app-constants';
import { CaseStore } from '../../../ui-services/create-case.service';
import { ModalService } from '../../../ui-services/modal.service';

@Component({
  selector: 'app-view-operators-modal',
  templateUrl: './view-operators-modal.component.html',
  styleUrls: ['./view-operators-modal.component.scss']
})
export class ViewOperatorsModalComponent implements OnInit {

  constructor(public store: CaseStore, private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal = () => {
    this.store.setShopFloorOperators([]);
    this.modalService.close(UIModalID.VIEW_OPERATORS_MODAL);
  }
}
