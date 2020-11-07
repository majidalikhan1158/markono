import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { MatRadioChange } from '@angular/material/radio';
import { CustomerInfoViewModel } from 'src/app/modules/shared/models/create-case';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import {
  CreateCaseMode,
  CreateCaseDataType,
  RecordType,
} from 'src/app/modules/shared/enums/app-enums';
import { DDLListModal } from 'src/app/modules/services/shared/classes/case-modals/case-modal';
import { CaseTypes } from 'src/app/modules/shared/enums/case-management/case-contants';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
  @Input() createCaseMode: CreateCaseMode;
  disabled = false;
  caseTypeConstant = CaseTypes;
  caseTypeList: DDLListModal[] = [];
  shouldShowExternalReferenceNumberBox = false;
  shouldShowSearchCustomerBox = false;
  shouldShowCustomerInfoBox = false;
  customerInfoViewModel: CustomerInfoViewModel;
  constructor(
    private modalService: ModalService,
    private caseStore: CaseStore,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.caseStore.createCaseStore.subscribe((data) => {
      this.customerInfoViewModel = data.customerInfo;
    });
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.disabled = true;
      this.shouldShowExternalReferenceNumberBox = true;
      this.shouldShowSearchCustomerBox = false;
      this.shouldShowCustomerInfoBox = true;
    } else {
      this.customerInfoViewModel = {
        caseType: 0,
        customerSearchString: '',
        referenceNumber: '',
      };
    }
    this.getCaseTypes();
  }

  handleCaseTypeChange(event: MatRadioChange) {
    this.shouldShowExternalReferenceNumberBox = true;
  }

  handleReferenceNumberChange() {
    if (
      this.customerInfoViewModel.referenceNumber !== '' &&
      this.createCaseMode !== CreateCaseMode.EDIT
    ) {
      this.shouldShowSearchCustomerBox = true;
    }
  }

  handleCustomerSearch() {
    if (this.customerInfoViewModel.customerSearchString !== '') {
      this.shouldShowCustomerInfoBox = true;
      this.caseStore.setCreateCaseDataSource(
        this.customerInfoViewModel,
        CreateCaseDataType.CUSTOMER_INFO
      );
    }
  }

  handleAddCustomerEvent(modalId: string) {}

  handleModalRejectEvent(modalId: string) {}

  openUiModal(modalId: string) {
    this.modalService.open(modalId);
  }

  ngOnDestroy(): void {}

  /**
   * HTTP API CALLS
   */
  private getCaseTypes = () => {
    this.caseStore.caseDropDownStore.subscribe(result => {
      if (result != null && result.type === RecordType.GET_CASE_TYPE) {
        this.caseTypeList = result.data.caseTypesList;
        this.ref.detectChanges();
      }
    });
  }
}
