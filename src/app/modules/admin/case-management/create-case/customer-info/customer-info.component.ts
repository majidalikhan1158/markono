import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { CustomerDetailVM, CustomerInfoVM } from 'src/app/modules/shared/models/create-case';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import {
  CreateCaseMode,
  CreateCaseDataType,
  RecordType,
  CreateCaseSteps,
} from 'src/app/modules/shared/enums/app-enums';
import { DDLListModal } from 'src/app/modules/services/shared/classes/case-modals/case-modal';
import { CaseTypes } from 'src/app/modules/shared/enums/case-management/case-contants';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
  @Input() createCaseMode: CreateCaseMode;
  @Output() stepperNextEvent = new EventEmitter<CreateCaseSteps>();
  modes = CreateCaseMode;
  disabled = false;
  caseTypeConstant = CaseTypes;
  caseTypeList: DDLListModal[] = [];
  shouldShowSearchCustomerBox = false;
  shouldShowCustomerInfoBox = false;
  customerInfoVM: CustomerInfoVM;
  constructor(
    private modalService: ModalService,
    private store: CaseStore,
    private orderService: OrderService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getDefaultRecord();
    this.getCaseTypes();
    if (this.createCaseMode === CreateCaseMode.EDIT) {
      this.disabled = true;
      this.shouldShowSearchCustomerBox = false;
      this.shouldShowCustomerInfoBox = true;
    }
  }

  handleReferenceNumberChange() {
    if (
      this.customerInfoVM.referenceNumber !== '' &&
      this.createCaseMode !== CreateCaseMode.EDIT
    ) {
      this.shouldShowSearchCustomerBox = true;
    }
  }

  handleCustomerSearch() {
    if (this.customerInfoVM.customerId !== '') {
      // call api to get customer results
      this.orderService.getCustomerDetail({sellToNo: this.customerInfoVM.customerId}).subscribe(resp => {
        const details = resp.body as unknown as CustomerDetailVM[];
        if (details && details.length > 0) {
          this.shouldShowCustomerInfoBox = true;
          this.customerInfoVM.customerDetail = details[0];
        } else {
          this.shouldShowCustomerInfoBox = false;
          // this.customerInfoVM.customerDetail = this.getEmptyDetails();
        }
        this.ref.detectChanges()
      }, (err: HttpErrorResponse) => {
        // this.customerInfoVM.customerDetail = this.getEmptyDetails();
        this.shouldShowCustomerInfoBox = false;
      });
    }
  }

  handleStepperNextEvent = () => {
    this.store.setCreateCaseDataSource(
      this.customerInfoVM,
      CreateCaseDataType.CUSTOMER_INFO
    );
    this.stepperNextEvent.emit(CreateCaseSteps.CASE_DETAILS);
  }

  getDefaultRecord = () => {
    this.store.createCaseStore.subscribe((resp) => {
      if (resp && resp.customerInfo && resp.customerInfo.id > 0) {
        this.customerInfoVM = resp.customerInfo;
      } else {
        this.customerInfoVM = this.initialObject();
      }
    });
  }

  initialObject = (): CustomerInfoVM => {
    return {
      id: 1,
      caseType: 0,
      referenceNumber: '',
      customerId: '',
      customerDetail: this.getEmptyDetails()
    };
  }

  getEmptyDetails = (): CustomerDetailVM => {
    return {
      CompanyCode: '',
    CompanyName: '',
    PrintFileFolder: '',
    CurrencyCode: '',
    Contact: '',
    Address: '',
    Address2: '',
    PostCode: '',
    City: '',
    CountryRegionCode: '',
    County: '',
    PhoneNo: '',
    State: '',
    Email: '',
    SalesPerson: '',
    };
  }
  ngOnDestroy(): void {}

  /**
   * HTTP API CALLS
   */
  private getCaseTypes = () => {
    this.store.caseDropDownStore.subscribe(resp => {
      if (resp != null && resp.data != null && resp.data.caseTypesList.length > 0) {
        this.caseTypeList = resp.data.caseTypesList;
        this.ref.detectChanges();
      }
    });
  }

  /**
   * MODAL EVENTS
   */

  openUiModal(modalId: string) {
    this.modalService.open(modalId);
  }

  handleAddCustomerEvent(modalId: string) {}

  handleModalRejectEvent(modalId: string) {}
}
