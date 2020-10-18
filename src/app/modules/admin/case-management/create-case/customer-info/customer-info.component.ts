import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { MatRadioChange } from '@angular/material/radio';
import { CaseTypes } from 'src/app/modules/shared/enums/case-types';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {
  isShowExternalReferenceNumberBox = false;
  isShowSearchCustomerBox = false;
  isShowCustomerInfoBox = false;
  txtReferenceNumber = '';
  txtSearchCustomer = '';
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  handleCaseTypeChange(event: MatRadioChange) {
    if (CaseTypes.PRINT_ORDER.toString() === event.value || CaseTypes.WAREHOUSE_ORDER.toString() === event.value) {
      this.isShowExternalReferenceNumberBox = true;
    }
  }

  handleReferenceNumberChange() {
    if (this.txtReferenceNumber !== '') {
      this.isShowSearchCustomerBox = true;
    }
  }

  handleCustomerSearch() {
    if (this.txtSearchCustomer !== '') {
      this.isShowCustomerInfoBox = true;
    }
  }

  handleAddCustomerEvent(modalId: string) {

  }

  handleModalRejectEvent(modalId: string) {

  }

  openUiModal(modalId: string){
    this.modalService.open(modalId);
  }
}
