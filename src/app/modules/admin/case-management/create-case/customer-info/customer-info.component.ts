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
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
  @Input() createCaseMode: CreateCaseMode;
  @Output() stepperNextEvent = new EventEmitter<CreateCaseSteps>();
  @ViewChild('trigger') trigger: MatAutocompleteTrigger;
  modes = CreateCaseMode;
  disabled = false;
  caseTypeConstant = CaseTypes;
  caseTypeList: DDLListModal[] = [];
  customerDetailVMList: CustomerDetailVM[] = [];
  shouldShowSearchCustomerBox = false;
  shouldShowCustomerInfoBox = false;
  customerInfoVM: CustomerInfoVM;
  searchCustomerInfo = new FormControl();
  isLoading = false;
  previousValue = '';
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
      this.previousValue = this.customerInfoVM.customerId;
      this.isLoading = true;
      setTimeout(_ => this.trigger.openPanel());
      // call api to get customer results
      this.orderService.getCustomerDetail({sellToNo: this.customerInfoVM.customerId}).subscribe(resp => {
        const details = resp.body as unknown as CustomerDetailVM[];
        this.customerDetailVMList = details && details.length > 0 ? details : [];
        this.isLoading = false;
        this.ref.detectChanges();
      }, (err: HttpErrorResponse) => {
        this.customerDetailVMList = [];
        this.isLoading = false;
        this.ref.detectChanges();
      });

    }
  }

  handleSelectedCustomer = (customerId: string) => {
    this.customerInfoVM.customerId = customerId;
    this.customerInfoVM.customerDetail = this.customerDetailVMList.find(x => x.CompanyCode === customerId);
    this.shouldShowCustomerInfoBox = true;
  }

  displayFn(info: CustomerDetailVM) {
    if (info) { return info.CompanyCode; }
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
      if (resp != null && resp.data != null && resp.data.caseTypesList && resp.data.caseTypesList.length > 0) {
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
