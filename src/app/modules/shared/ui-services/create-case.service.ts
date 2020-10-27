import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateCaseViewModel, CustomerInfoViewModel, MiscCostViewModel, InvoiceViewModel,
   SpecialInstructionViewModel, ProductDetailsViewModel, ShippingInfoViewModel } from '../models/create-case';
import { CreateCaseDataType } from '../enums/data-source-types';

@Injectable({
  providedIn: 'root'
})
export class CreateCaseService {
  public createCaseDataSource: Observable<CreateCaseViewModel>;
  private createCaseDataSourceSubject = new BehaviorSubject<CreateCaseViewModel>(new CreateCaseViewModel());
  private currentData: CreateCaseViewModel;
  constructor() {
    this.createCaseDataSource = this.createCaseDataSourceSubject.asObservable();
    this.createCaseDataSource.subscribe(data => {
      this.currentData = data;
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
    this.createCaseDataSourceSubject.next(this.currentData);
  }

  private setProductDetails(dataSubject: ProductDetailsViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.isbn !== '');

    if (validRecords.length > 0) {
      this.currentData.productDetailsList = validRecords;
      this.createCaseDataSourceSubject.next(this.currentData);
    }
  }

  private setShippingInfo(dataSubject: ShippingInfoViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject?.filter(x => x.shippingDetails.billable > 0);
    if (validRecords.length > 0) {
      this.currentData.shippingInfoList = validRecords;
      this.createCaseDataSourceSubject.next(this.currentData);
    }
  }

  private setMiscCost(dataSubject: MiscCostViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.costCategory > 0);
    this.currentData.miscCostList = validRecords;
    this.createCaseDataSourceSubject.next(this.currentData);
  }

  private setInvoice(dataSubject: InvoiceViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.position > 0);
    this.currentData.invoiceList = validRecords;
    this.createCaseDataSourceSubject.next(this.currentData);
  }

  private setSpecialInstruction(dataSubject: SpecialInstructionViewModel[]) {
    if (!this.currentData.id) {
      this.currentData.id = 1;
    }
    const validRecords = dataSubject.filter(x => x.department !== '');
    this.currentData.specialInstructionList = validRecords;
    this.createCaseDataSourceSubject.next(this.currentData);
  }
}
