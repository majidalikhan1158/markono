import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { MatRadioChange } from '@angular/material/radio';
import { CaseTypes } from 'src/app/modules/shared/enums/case-types';
import { CreateCaseMode } from 'src/app/modules/shared/enums/app-constants';
import { CustomerInfoViewModel } from 'src/app/modules/shared/models/create-case';
import { CreateCaseService } from 'src/app/modules/shared/ui-services/create-case.service';
import { CreateCaseDataType } from 'src/app/modules/shared/enums/data-source-types';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
  @Input() createCaseMode: CreateCaseMode;
  disabled = false;
  caseTypes = CaseTypes;
  shouldShowExternalReferenceNumberBox = false;
  shouldShowSearchCustomerBox = false;
  shouldShowCustomerInfoBox = false;
  customerInfoViewModel: CustomerInfoViewModel;
  constructor(
    private modalService: ModalService,
    private createCaseService: CreateCaseService
  ) {}

  ngOnInit(): void {
    this.createCaseService.createCaseDataSource.subscribe((data) => {
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
      this.createCaseService.setCreateCaseDataSource(
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
}
