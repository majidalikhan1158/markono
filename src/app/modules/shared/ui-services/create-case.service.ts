import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CreateCaseViewModel, CustomerInfoVM, MiscCostVM, InvoiceViewModel,
  SpecialInstructionViewModel, ProductDetailsVM, ShippingInfoVM, OverAllCostVM
} from '../models/create-case';
import { CreateCaseDataType, RecordType } from '../enums/app-enums';
import { DDLObjectModal, DDLListModal, DDLObjectModalProp } from '../../services/shared/classes/case-modals/case-modal';
import { Operators } from '../models/shop-floor';
import { CostCategory } from '../../services/shared/classes/response-modal';

@Injectable({
  providedIn: 'root'
})
export class CaseStore {

  public productDetailsId: Observable<number>;
  public createCaseStore: Observable<CreateCaseViewModel>;
  public caseDropDownStore: Observable<DDLObjectModal>;
  public viewVersionISBN: Observable<any>;
  public viewRevisionISBN: Observable<any>;
  public caseType: Observable<string>;
  public caseType2: Observable<string>;
  public dashboardEmbededLink: Observable<string>;
  public shopFloorOperators: Observable<Operators[]>;
  public jobNo$: Observable<string>;

  public productDetailsIdSubject = new BehaviorSubject<number>(0);
  private createCaseStoreSubject = new BehaviorSubject<CreateCaseViewModel>(new CreateCaseViewModel());
  private caseDropDownStoreSubject = new BehaviorSubject<DDLObjectModal>(null);
  public viewVersionIBNSubject = new BehaviorSubject<any>(null);
  public viewRevisionIBNSubject = new BehaviorSubject<any>(null);
  public caseTypeSubject = new BehaviorSubject<string>('');
  public caseTypeSubject2 = new BehaviorSubject<string>('');
  public dashboardEmbededLinkSubject = new BehaviorSubject<string>('');
  public shopFloorOperatorsSubject = new BehaviorSubject<Operators[]>([]);
  public jobNoSubject = new BehaviorSubject<string>(null);

  private currentData: CreateCaseViewModel;
  private currentDropDownStoreState: DDLObjectModal;

  constructor() {
    this.createCaseStore = this.createCaseStoreSubject.asObservable();
    this.caseDropDownStore = this.caseDropDownStoreSubject.asObservable();
    this.productDetailsId = this.productDetailsIdSubject.asObservable();
    this.viewVersionISBN = this.viewVersionIBNSubject.asObservable();
    this.viewRevisionISBN = this.viewRevisionIBNSubject.asObservable();
    this.caseType = this.caseTypeSubject.asObservable();
    this.caseType2 = this.caseTypeSubject2.asObservable();
    this.dashboardEmbededLink = this.dashboardEmbededLinkSubject.asObservable();
    this.shopFloorOperators = this.shopFloorOperatorsSubject.asObservable();
    this.jobNo$ = this.jobNoSubject.asObservable();

    this.createCaseStore.subscribe(data => {
      this.currentData = data;
    });
    this.caseDropDownStore.subscribe(data => {
      this.currentDropDownStoreState = data;
    });
  }

  setCreateCaseDataSource(data: any, type: CreateCaseDataType) {
    if (!this.currentData) {
      return;
    }
    if (type === CreateCaseDataType.CUSTOMER_INFO) {
      this.setCustomerInfo(data as CustomerInfoVM);
    } else if (type === CreateCaseDataType.PRODUCT_DETAILS) {
      this.setProductDetails(data as ProductDetailsVM[]);
    } else if (type === CreateCaseDataType.SHIPPING_INFO) {
      this.setShippingInfo(data as ShippingInfoVM[]);
    } else if (type === CreateCaseDataType.MISC_COST) {
      this.setMiscCost(data as MiscCostVM[]);
    } else if (type === CreateCaseDataType.INVOICE) {
      this.setInvoice(data as InvoiceViewModel[]);
    } else if (type === CreateCaseDataType.SPECIAL_INSTRUCTIONS) {
      this.setSpecialInstruction(data as SpecialInstructionViewModel[]);
    } else if (type === CreateCaseDataType.OVERALL_COST) {
      this.setOverAllCost(data as OverAllCostVM);
    }
  }

  private setCustomerInfo(dataSubject: CustomerInfoVM) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    this.currentData.customerInfo = dataSubject;
    this.createCaseStoreSubject.next(this.currentData);
  }

  private setProductDetails(dataSubject: ProductDetailsVM[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.isbn !== '' && x.printType && x.productISBNDetail && x.productISBNDetail.id !== '');

    if (validRecords.length > 0) {
      this.currentData.productDetailsList = validRecords;
      this.createCaseStoreSubject.next(this.currentData);
    }
  }

  private setShippingInfo(dataSubject: ShippingInfoVM[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    this.currentData.shippingInfoList = dataSubject;
    this.createCaseStoreSubject.next(this.currentData);
  }

  private setMiscCost(dataSubject: MiscCostVM[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.costCategory);
    this.currentData.miscCostList = validRecords;
    this.createCaseStoreSubject.next(this.currentData);
  }

  private setInvoice(dataSubject: InvoiceViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.position !== '');
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

  setOverAllCost = (dataSubject: OverAllCostVM) => {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    this.currentData.overallCostVM = dataSubject;
    this.createCaseStoreSubject.next(this.currentData);
  }

  public setCaseDropDownsDataSource(modal: DDLListModal[], recordType: RecordType, costCategoryList: CostCategory[] = null) {
    if (!this.currentDropDownStoreState) {
      this.currentDropDownStoreState = { data: new DDLObjectModalProp(), type: RecordType.GET_CASE_TYPE };
    }

    if (recordType === RecordType.GET_CASE_TYPE) {
      this.currentDropDownStoreState.data.caseTypesList = modal;
    } else if (recordType === RecordType.SHIPMENT_TERM) {
      this.currentDropDownStoreState.data.shipmentTermList = modal;
    } else if (recordType === RecordType.SHIPMENT_MODE) {
      this.currentDropDownStoreState.data.shipmentModeList = modal;
    } else if (recordType === RecordType.SHIPMENT_AGENT) {
      this.currentDropDownStoreState.data.shipmentAgentList = modal;
    } else if (recordType === RecordType.MISC_BILLING_COST_CATEGORY) {
      this.currentDropDownStoreState.data.miscBillingCostCategoryList = costCategoryList;
    } else if (recordType === RecordType.SHIPPING_INFO_COST_CATEGORY) {
      this.currentDropDownStoreState.data.shippingInfoCostCategoryList = costCategoryList;
    }

    this.currentDropDownStoreState.type = recordType;
    this.caseDropDownStoreSubject.next(this.currentDropDownStoreState);
  }

  setProductDetailsId = (id: number) => {
    this.productDetailsIdSubject.next(id);
  }

  setViewVersionISBN = (obj: any) => {
    this.viewVersionIBNSubject.next(obj);
  }

  setViewRevisionISBN = (obj: any) => {
    this.viewRevisionIBNSubject.next(obj);
  }

  setCaseType = (caseType) => {
    this.caseTypeSubject.next(caseType);
  }

  setCaseType2 = (caseType) => {
    this.caseTypeSubject2.next(caseType);
  }

  setEditEmbeddedLinkButton = (caseType) => {
    this.dashboardEmbededLinkSubject.next(caseType);
  }

  setShopFloorOperators = (operators: Operators[]) => {
    this.shopFloorOperatorsSubject.next(operators);
  }

  resetCreateCaseStore = () => {
    this.createCaseStoreSubject.next(null);
  }

  setJobNo(caseDetailNo: string) {
    this.jobNoSubject.next(caseDetailNo);
  }

}
