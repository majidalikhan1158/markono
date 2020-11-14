import { BindingType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CreateCaseViewModel, InvoiceViewModel, ProductDetailModals, ProductISBNDetailVM, SpecialInstructionViewModel } from '../../models/create-case';

@Injectable({
  providedIn: 'root',
})
export class CaseHelperService {
  constructor() {}

  public TransToProductISBNDetailVM = (data: any): ProductISBNDetailVM => {
    return {
      id: data.id,
      title: data.attributes['product-description'],
      totalExtent: data.attributes['txt-total-extent'],
      bindingType: data.attributes['binding-type'],
      productGroup: data.attributes['product-group'],
      samplesRequired: 0,
      bluePrintRequired: 0,
      specsVersionNo: data.attributes['version-no'],
      owner: data.attributes['isbn-owner'],
      jobType: '',
      weight: data.attributes['weight'],
      fGRequired: 0,
      advancesRequired: 0,
      quoteNo: '',
      estimatedPrice: data.attributes['estimated-price'],
      additionalUnitPrice: 0,
      sampleList: [],
      bluePrintList: [],
      fgList: [],
      advancesList: [],
      spineWidth: data.attributes['spine-width'],
    };
  }

  public TransCaseDataToCaseApiMolda = (data: CreateCaseViewModel) => {
    return {
      id: '00000000-0000-0000-0000-000000000000',
      caseNo: '000196',
      quoteNo: null,
      orderNo: null,
      printType: 'Digital',
      productGroup: '1000',
      sellToNo: data.customerInfo.customerId,
      billToNo: data.customerInfo.customerId,
      requestedDeliveryDate: '0001-01-01T00:00:00',
      salesPerson: data.customerInfo.customerDetail.SalesPerson,
      coordinator: data.customerInfo.customerDetail.Coordinator,
      yourReference: '',
      weight: null,
      custCode: null,
      specialInstructions: this.getSpecialInstructions(data.specialInstructionList),
      discount: data.overallCostVM.discount,
      tax: data.overallCostVM.tax,
      notesOnInvoiceBottom: this.getNotes(data.invoiceList , 'Bottom'),
      notesOnInvoiceTop: this.getNotes(data.invoiceList, 'Top'),
      quoteDate: '0001-01-01T00:00:00',
      quoteSentDate: '0001-01-01T00:00:00',
      quoteExpireDate: '0001-01-01T00:00:00',
      orderDate: '0001-01-01T00:00:00',
      currentActivityId: '00000000-0000-0000-0000-000000000000',
      createdByUser: 'CCE',
      createdBy: null,
      createdDateTime: null,
      updatedByUser: 'CCE',
      updatedBy: null,
      updatedDateTime: null,
      syncWMS: false,
      syncWMSDateTime: null,
      syncERP: false,
      syncERPDateTime: null,
      isDeleted: false,
      countryCode: data.customerInfo.customerDetail.CountryRegionCode,
      currencyCode: data.customerInfo.customerDetail.CurrencyCode,
      companyCode: data.customerInfo.customerDetail.CompanyCode,
      companyName: data.customerInfo.customerDetail.CompanyName,
      address1: data.customerInfo.customerDetail.Address,
      address2: data.customerInfo.customerDetail.Address2,
      currentActivityStatusName: null,
      otherCharge: this.getOtherCharges(data),
      caseDetail: this.getCaseDetails(data)
    };
  }

  getOtherCharges = (data: CreateCaseViewModel) => {
    const obj = [];
    data.overallCostVM.otherCharges.forEach(item => {
      obj.push({
        id: '00000000-0000-0000-0000-000000000000',
        caseID: '00000000-0000-0000-0000-000000000000',
        item: item.type,
        value: item.total,
        description: ''
      });
    });
    obj.push({
      id: '00000000-0000-0000-0000-000000000000',
      caseID: '00000000-0000-0000-0000-000000000000',
      item: 'print and bind',
      value: data.overallCostVM.printAndBind,
      description: ''
    });
    return obj;
  }

  getCaseDetails = (data: CreateCaseViewModel) => {
    const obj = [];
    data.productDetailsList.forEach(item => {
      obj.push({
        caseDetailNo: '',
        iSBNPartNo: item.isbn,
        printType: item.printType,
        productVersion: item.productISBNDetail.specsVersionNo,
        parentISBN: null,
        type: data.customerInfo.caseType,
        componentType: null,
        jobType: item.productISBNDetail.jobType,
        productGroup: item.productISBNDetail.productGroup,
        yourReference: null,
        title: item.productISBNDetail.title,
        lnNo: item.id,
        extLnNo: 0,
        jobNo: null,
        sellToNo: item.productISBNDetail.owner,
        bindingType: item.productISBNDetail.bindingType,
        totalExtent: item.productISBNDetail.totalExtent,
        weight: item.productISBNDetail.weight,
        spine: item.productISBNDetail.spineWidth,
        additionalUnitPrice: 0.0,
        additionalQty: 0,
        margin: item.margin,
        orderQuantity: item.orderQty,
        productionQuantity: item.prodQty,
        estimatedPrice: item.productISBNDetail.estimatedPrice,
        quotedPrice: 0.0,
        sellingPrice: item.sellingPrice,
        subTotal: item.subTotal,
        carrierSheet: '',
        samplesRequired: item.productISBNDetail.samplesRequired,
        bluePrintRequired: item.productISBNDetail.bluePrintRequired,
        fGRequired: item.productISBNDetail.fGRequired,
        advancesRequired: item.productISBNDetail.advancesRequired,
        isDeleted: false,
        currentActivityId: '00000000-0000-0000-0000-000000000000',
        createdByUser: null,
        createdBy: null,
        createdDateTime: null,
        updatedByUser: null,
        updatedBy: null,
        updatedDateTime: null,
        requestedDeliveryDate: '0001-01-01T00:00:00',
        samplesReq: this.getModalData(item.productISBNDetail.advancesList, 'Sample'),
        bluePrintReq: this.getModalData(item.productISBNDetail.bluePrintList, 'BluePrint'),
        fgReq:  this.getModalData(item.productISBNDetail.fgList, 'FG'),
        advancesReq: this.getModalData(item.productISBNDetail.advancesList, 'AD'),
      });
    });
    return obj;
  }

  getModalData = (data: ProductDetailModals[], itemType: string) => {
    const obj = [];
    data.forEach(item => {
      obj.push({
        item: itemType,
        requiredDate: new Date(item.requiredDate),
        forWho: item.forWho,
        quantity: item.quantity,
        lnNo: item.id,
        specialInstruction: item.specialInstructions
      });
    });
    return obj.length > 0 ?  obj : null;
  }

  getNotes = (invoicesList: InvoiceViewModel[], position: string) => {
    let notes = '';
    if (invoicesList && invoicesList.length > 0) {
      const note = invoicesList.find(x => x.position === position);
      if (note) {
        notes = note.notes;
      }
    }
    return notes;
  }

  getSpecialInstructions = (specialInstructionList: SpecialInstructionViewModel[]) => {
    let specialInstructions = '';
    if (specialInstructionList && specialInstructionList.length > 0) {
      specialInstructionList.forEach(item => {
        specialInstructions = `${specialInstructions}. ${item.instructions}`;
      });
    }
    return specialInstructions;
  }
}
