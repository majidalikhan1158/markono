import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateCaseViewModel, CustomerInfoViewModel, MiscCostViewModel, InvoiceViewModel,
   SpecialInstructionViewModel, ProductDetailsViewModel, ShippingInfoViewModel } from '../models/create-case';
import { CreateCaseDataType, RecordType } from '../enums/app-enums';
import { DDLObjectModal, DDLListModal, DDLObjectModalProp } from '../../services/shared/classes/case-modals/case-modal';

@Injectable({
  providedIn: 'root'
})
export class CaseStore {
  public createCaseStore: Observable<CreateCaseViewModel>;
  public caseDropDownStore: Observable<DDLObjectModal>;
  private createCaseStoreSubject = new BehaviorSubject<CreateCaseViewModel>(new CreateCaseViewModel());
  private caseDropDownStoreSubject = new BehaviorSubject<DDLObjectModal>(null);
  private currentData: CreateCaseViewModel;
  private currentDropDownStoreState: DDLObjectModal;
  constructor() {
    this.createCaseStore = this.createCaseStoreSubject.asObservable();
    this.caseDropDownStore = this.caseDropDownStoreSubject.asObservable();
    this.createCaseStore.subscribe(data => {
      this.currentData = data;
    });
    this.caseDropDownStore.subscribe(data => {
      this.currentDropDownStoreState = data;
    });
  }

  setCreateCaseDataSource(data: any, type: CreateCaseDataType) {
    if (type === CreateCaseDataType.CUSTOMER_INFO) {
      this.setCustomerInfo(data as CustomerInfoViewModel);
    } else if (type === CreateCaseDataType.PRODUCT_DETAILS) {
      this.setProductDetails(data as ProductDetailsViewModel[]);
    } else if (type === CreateCaseDataType.SHIPPING_INFO) {
      this.setShippingInfo(data as ShippingInfoViewModel[]);
    } else if (type === CreateCaseDataType.MISC_COST) {
      this.setMiscCost(data as MiscCostViewModel[]);
    } else if (type === CreateCaseDataType.INVOICE) {
      this.setInvoice(data as InvoiceViewModel[]);
    } else if (type === CreateCaseDataType.SPECIAL_INSTRUCTIONS) {
      this.setSpecialInstruction(data as SpecialInstructionViewModel[]);
    }
  }

  private setCustomerInfo(dataSubject: CustomerInfoViewModel) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    this.currentData.customerInfo = dataSubject;
    this.createCaseStoreSubject.next(this.currentData);
  }

  private setProductDetails(dataSubject: ProductDetailsViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.isbn !== '');

    if (validRecords.length > 0) {
      this.currentData.productDetailsList = validRecords;
      this.createCaseStoreSubject.next(this.currentData);
    }
  }

  private setShippingInfo(dataSubject: ShippingInfoViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject?.filter(x => x.shippingDetails.billable > 0);
    if (validRecords.length > 0) {
      this.currentData.shippingInfoList = validRecords;
      this.createCaseStoreSubject.next(this.currentData);
    }
  }

  private setMiscCost(dataSubject: MiscCostViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.costCategory > 0);
    this.currentData.miscCostList = validRecords;
    this.createCaseStoreSubject.next(this.currentData);
  }

  private setInvoice(dataSubject: InvoiceViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.position > 0);
    this.currentData.invoiceList = validRecords;
    this.createCaseStoreSubject.next(this.currentData);
  }

  private setSpecialInstruction(dataSubject: SpecialInstructionViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.department !== '');
    this.currentData.specialInstructionList = validRecords;
    this.createCaseStoreSubject.next(this.currentData);
  }

  public setCaseDropDownsDataSource(modal: DDLListModal[], recordType: RecordType) {
    if (!this.currentDropDownStoreState) {
      this.currentDropDownStoreState = {data: new DDLObjectModalProp(), type: RecordType.GET_CASE_TYPE};
    }

    if (recordType === RecordType.GET_CASE_TYPE) {
      this.currentDropDownStoreState.data.caseTypesList = modal;
    } else if (recordType === RecordType.SHIPMENT_TERM) {
      this.currentDropDownStoreState.data.shipmentTermList = modal;
    } else if (recordType === RecordType.SHIPMENT_MODE) {
      this.currentDropDownStoreState.data.shipmentModeList = modal;
    } else if (recordType === RecordType.SHIPMENT_AGENT) {
      this.currentDropDownStoreState.data.shipmentAgentList = modal;
    }
    this.currentDropDownStoreState.type = recordType;
    this.caseDropDownStoreSubject.next(this.currentDropDownStoreState);
  }
}
