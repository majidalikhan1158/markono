import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'src/app/modules/shared/ui-services/modal.service';
import { CustomerDetailVM, CustomerInfoVM } from 'src/app/modules/shared/models/create-case';
import { CaseStore } from 'src/app/modules/shared/ui-services/create-case.service';
import {
  CreateCaseMode,
  CreateCaseDataType,
  CreateCaseSteps,
} from 'src/app/modules/shared/enums/app-enums';
import { DDLListModal } from 'src/app/modules/services/shared/classes/case-modals/case-modal';
import { CaseTypes } from 'src/app/modules/shared/enums/case-management/case-contants';
import { OrderService } from 'src/app/modules/services/core/services/order.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatRadioChange } from '@angular/material/radio';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
  @Input() createCaseMode: CreateCaseMode;
  @Output() stepperNextEvent = new EventEmitter<CreateCaseSteps>();
  @ViewChild('trigger') trigger: MatAutocompleteTrigger;
  @ViewChild('trigger2') trigger2: MatAutocompleteTrigger;
  modes = CreateCaseMode;
  disabled = false;
  caseTypeConstant = CaseTypes;
  caseTypeList: DDLListModal[] = [];
  customerDetailVMList: CustomerDetailVM[] = [];
  customerDetailVMList2: CustomerDetailVM[] = [];
  shouldShowSearchCustomerBox = false;
  shouldShowCustomerInfoBox = false;
  customerInfoVM: CustomerInfoVM;
  customerInfoVM2: CustomerInfoVM;
  searchCustomerInfo = new FormControl();
  searchCustomerInfo2 = new FormControl();
  isLoading = false;
  isLoading2 = false;
  editBillingInfo = false;
  previousValue = '';
  selectedCaseType = '';
  matAutoCompleteSubscription: Subscription;
  referenceNumber: string;
  subscription: Subscription;
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
    this.shouldShowSearchCustomerBox = this.customerInfoVM.referenceNumber !== '' && this.createCaseMode !== CreateCaseMode.EDIT;
  }

  handleCustomerSearch() {
    if (this.customerInfoVM.customerId !== '' && this.customerInfoVM.customerId !== this.previousValue) {
      this.matAutoCompleteSubscription?.unsubscribe();
      this.customerDetailVMList = [];
      this.ref.detectChanges();
      this.previousValue = this.customerInfoVM.customerId;
      this.isLoading = true;
      setTimeout(_ => this.trigger.openPanel());
      // call api to get customer results
      this.matAutoCompleteSubscription = this.orderService.getCustomerDetail({CustCode: this.customerInfoVM.customerId}).subscribe(resp => {
        const details = resp.body as unknown as CustomerDetailVM[];
        this.customerDetailVMList = details && details.length > 0 ? details.sort((a, b) => (a.CompanyCode > b.CompanyCode) ? 1
        : ((b.CompanyCode > a.CompanyCode) ? -1 : 0)) : [];
        if (this.customerDetailVMList.length === 0) {
          const customerObj = this.getEmptyDetails();
          customerObj.CompanyName = 'No record found';
          customerObj.CompanyCode = '-1';
          this.customerDetailVMList.push(customerObj);
        }
        this.isLoading = false;
        this.ref.detectChanges();
      }, (err: HttpErrorResponse) => {
        this.customerDetailVMList = [];
        this.isLoading = false;
        if (this.customerDetailVMList.length === 0) {
          const customerObj = this.getEmptyDetails();
          customerObj.CompanyName = 'No record found';
          customerObj.CompanyCode = '-1';
          this.customerDetailVMList.push(customerObj);
        }
        this.ref.detectChanges();
      });

    }
  }

  handleCustomerSearch2() {
    console.log('hello2');
    if (this.customerInfoVM2.customerId !== '' && this.customerInfoVM2.customerId !== this.previousValue) {
      this.matAutoCompleteSubscription?.unsubscribe();
      this.customerDetailVMList2 = [];
      this.ref.detectChanges();
      this.previousValue = this.customerInfoVM2.customerId;
      this.isLoading2 = true;
      setTimeout(_ => this.trigger2.openPanel());
      // call api to get customer results
      this.matAutoCompleteSubscription = this.orderService.getCustomerDetail({CustCode: this.customerInfoVM2.customerId}
        ).subscribe(resp => {
        const details = resp.body as unknown as CustomerDetailVM[];
        this.customerDetailVMList2 = details && details.length > 0 ? details.sort((a, b) =>
         (a.CompanyCode > b.CompanyCode) ? 1 : ((b.CompanyCode > a.CompanyCode) ? -1 : 0)) : [];
        if (this.customerDetailVMList2.length === 0) {
          const customerObj = this.getEmptyDetails();
          customerObj.CompanyName = 'No record found';
          customerObj.CompanyCode = '-1';
          this.customerDetailVMList2.push(customerObj);
        }
        this.isLoading2 = false;
        this.ref.detectChanges();
      }, (err: HttpErrorResponse) => {
        this.customerDetailVMList2 = [];
        this.isLoading2 = false;
        if (this.customerDetailVMList2.length === 0) {
          const customerObj = this.getEmptyDetails();
          customerObj.CompanyName = 'No record found';
          customerObj.CompanyCode = '-1';
          this.customerDetailVMList2.push(customerObj);
        }
        this.ref.detectChanges();
      });

    }
  }

  handleSelectedCustomer = (customerId: string) => {
    if (customerId === '0') {
      setTimeout(_ => this.trigger.openPanel());
      return;
    }
    if (customerId === '-1') {
      return;
    }
    this.customerInfoVM.customerId = customerId;
    this.customerInfoVM.customerDetail = this.customerDetailVMList.find(x => x.CompanyCode === customerId);
    this.customerInfoVM2.customerId = customerId;
    this.customerInfoVM2.customerDetail = this.customerDetailVMList.find(x => x.CompanyCode === customerId);
    this.shouldShowCustomerInfoBox = true;
  }

  handleSelectedCustomer2 = (customerId: string) => {
    if (customerId === '0') {
      setTimeout(_ => this.trigger.openPanel());
      return;
    }
    if (customerId === '-1') {
      return;
    }
    this.customerInfoVM2.customerId = customerId;
    this.customerInfoVM2.customerDetail = this.customerDetailVMList2.find(x => x.CompanyCode === customerId);
    this.shouldShowCustomerInfoBox = true;
    this.editBillingInfo = !this.editBillingInfo;
  }

  displayFn(info: CustomerDetailVM) {
    if (info) { return info.CompanyCode; }
  }

  handleStepperNextEvent = () => {
    this.store.setCreateCaseDataSource(this.customerInfoVM, CreateCaseDataType.CUSTOMER_INFO);
    this.store.setCaseType2(this.selectedCaseType);
    this.stepperNextEvent.emit(CreateCaseSteps.CASE_DETAILS);
  }

  getDefaultRecord = () => {
    this.subscription = this.store.createCaseStore.subscribe((resp) => {
      if (resp && resp.customerInfo && resp.customerInfo.id > 0) {
        this.customerInfoVM = resp.customerInfo;
        this.customerInfoVM2 = resp.customerInfo;
      } else {
        this.customerInfoVM = this.initialObject();
        this.customerInfoVM2 = this.initialObject();
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
    Coordinator: ''
    };
  }

  /**
   * HTTP API CALLS
   */
  private getCaseTypes = () => {
    this.store.caseDropDownStore.subscribe(resp => {
      if (resp != null && resp.data != null && resp.data.caseTypesList && resp.data.caseTypesList.length > 0) {
        this.caseTypeList = resp.data.caseTypesList;
        this.ref.detectChanges();
      }
    });
  }

  handleCaseTypeChange  = (event: MatRadioChange) => {
    this.selectedCaseType = event.value;
    this.store.setCaseType(this.selectedCaseType);
  }

  openUiModal(modalId: string) {
    this.modalService.open(modalId);
  }

  countExternalReferenceCharacters = () => {
    if (this.referenceNumber?.length <= 32) {
      this.customerInfoVM.referenceNumber = this.referenceNumber;
    }
  }

  handleAddCustomerEvent(modalId: string) {}

  handleModalRejectEvent(modalId: string) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
