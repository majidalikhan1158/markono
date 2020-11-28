import { Injectable } from '@angular/core';
import {
  CreateCaseViewModel,
  InvoiceViewModel,
  ProductDetailModals,
  ProductISBNDetailVM,
  ProductVersionVM,
  QuotationListVM,
  ShippingInfoVM,
  SpecialInstructionViewModel
} from '../../models/create-case';

@Injectable({
  providedIn: 'root',
})
export class CaseHelperService {
  constructor() { }

  public transToProductISBNDetailVM = (data: any): ProductISBNDetailVM => {
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

  public transCaseDataToCaseApiModal = (data: CreateCaseViewModel) => {
    return {
      caseNo: '',
      quoteNo: '',
      orderNo: '',
      printType: 'Digital',
      sellToNo: data.customerInfo.customerId,
      billToNo: data.customerInfo.customerId,
      salesPerson: data.customerInfo.customerDetail.SalesPerson,
      coordinator: data.customerInfo.customerDetail.Coordinator,
      yourReference: '',
      specialInstructions: this.getSpecialInstructions(data.specialInstructionList),
      discount: data.overallCostVM.discount,
      tax: data.overallCostVM.tax,
      notesOnInvoiceBottom: this.getNotes(data.invoiceList, 'Bottom'),
      notesOnInvoiceTop: this.getNotes(data.invoiceList, 'Top'),
      createdByUser: 'DevUI',
      createdBy: 'DevUI',
      updatedByUser: 'DevUI',
      updatedBy: 'DevUI',
      companyName: data.customerInfo.customerDetail.CompanyName,
      address1: data.customerInfo.customerDetail.Address,
      address2: data.customerInfo.customerDetail.Address2,
      otherCharges: this.getOtherCharges(data),
      caseDetails: this.getCaseDetails(data)
    };
  }

  getOtherCharges = (data: CreateCaseViewModel) => {
    const obj = [];
    data.overallCostVM.otherCharges.forEach(item => {
      obj.push({
        item: item.type,
        value: item.total,
        description: 'test'
      });
    });
    obj.push({
      item: 'print and bind',
      value: data.overallCostVM.printAndBind,
      description: 'test'
    });
    return obj;
  }

  getCaseDetails = (data: CreateCaseViewModel) => {
    if (!data.productDetailsList || data.productDetailsList.length === 0) {
      return this.getCaseDetailsFromShippingDetails(data);
    }
    const obj = [];
    data.productDetailsList.forEach(item => {
      obj.push({
        caseDetailNo: '',
        type: data.customerInfo.caseType,
        sellToNo: item.productISBNDetail.owner,
        iSBNPartNo: item.isbn,
        printType: item.printType,
        productVersion: item.productISBNDetail.specsVersionNo,
        parentISBN: '',
        jobType: item.productISBNDetail.jobType,
        productGroup: item.productISBNDetail.productGroup,
        title: item.productISBNDetail.title,
        lnNo: item.id,
        extLnNo: 0,
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
        samplesRequired: item.productISBNDetail.samplesRequired,
        bluePrintRequired: item.productISBNDetail.bluePrintRequired,
        fGRequired: item.productISBNDetail.fGRequired,
        advancesRequired: item.productISBNDetail.advancesRequired,
        carrierSheet: '',
        createdByUser: 'DevUI',
        createdBy: 'DevUI',
        updatedByUser: 'DevUI',
        updatedBy: 'DevUI',
        samplesReq: this.getModalData(item.productISBNDetail.advancesList, 'Sample'),
        bluePrintReq: this.getModalData(item.productISBNDetail.bluePrintList, 'BluePrint'),
        fgReq: this.getModalData(item.productISBNDetail.fgList, 'FG'),
        advancesReq: this.getModalData(item.productISBNDetail.advancesList, 'AD'),
      });
    });
    return obj;
  }

  getCaseDetailsFromShippingDetails = (data: CreateCaseViewModel) => {
    const obj = [];
    if (data && data.shippingInfoList && data.shippingInfoList.length > 0) {
      data.shippingInfoList.forEach(item => {
        obj.push({
          caseDetailNo: '',
          type: data.customerInfo.caseType,
          sellToNo: '',
          iSBNPartNo: data.shippingInfoList[0].shippingItems[0].productNumber,
          printType: '',
          productVersion: '',
          parentISBN: '',
          jobType: '',
          productGroup: '',
          title: '',
          lnNo: 0,
          extLnNo: 0,
          bindingType: '',
          totalExtent: 0,
          weight: 0,
          spine: 0,
          additionalUnitPrice: 0.0,
          additionalQty: 0,
          margin: 0,
          orderQuantity: data.shippingInfoList[0].shippingItems[0].shipmentQty,
          productionQuantity: 0,
          estimatedPrice: 0,
          quotedPrice: 0.0,
          sellingPrice: 0,
          subTotal: 0,
          samplesRequired: 0,
          bluePrintRequired: 0,
          fGRequired: 0,
          advancesRequired: 0,
          carrierSheet: '',
          createdByUser: 'DevUI',
          createdBy: 'DevUI',
          updatedByUser: 'DevUI',
          updatedBy: 'DevUI',
          samplesReq: [],
          bluePrintReq: [],
          fgReq: [],
          advancesReq: [],
        });
      });
    }
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
    return obj.length > 0 ? obj : null;
  }

  getNotes = (invoicesList: InvoiceViewModel[], position: string) => {
    if (!invoicesList || invoicesList.length === 0) {
      return '';
    }
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
    if (!specialInstructionList || specialInstructionList.length === 0) {
      return '';
    }
    let specialInstructions = '';
    if (specialInstructionList && specialInstructionList.length > 0) {
      specialInstructionList.forEach(item => {
        specialInstructions = `${specialInstructions}. ${item.instructions}`;
      });
    }
    return specialInstructions;
  }

  transProductVersionApiToProductVersionModal = (data: any[]) => {
    const list: ProductVersionVM[] = [];
    data.forEach(item => {
      list.push({
        id: item.id,
        isSpecsInView: false,
        isbn: item.attributes['isbn'],
        versionNo: item.attributes['version-no'],
        createdDate: item.attributes['created-date'],
        createdBy: item.attributes['created-by'],
        versionDescription: item.attributes['version-description'],
        productDescription: item.attributes['product-description'],
        statusDescription: item.attributes['status-description'],
      });
    });
    return list;
  }

  // Create Shipment Api Intergation
  public transToCreateShipment = (data: ShippingInfoVM) => {
    return {
      accountNo: data.shippingDetails.accountNumber,
      actualShippingAgentCode: data.shippingDetails.shippingAgent,
      actualShippedDate: data.shippingDetails.shippmentPromisedDate,
      billable: data.shippingDetails.billable,
      billToNo: data.shipmentBillingDetails.BillToNumber,
      billToCompanyName: data.shipmentBillingDetails.CompanyName,
      billToContactPerson: data.shipmentBillingDetails.Contact,
      billToEmail: data.shipmentBillingDetails.Email,
      billToPhoneNo: data.shipmentBillingDetails.PhoneNo,
      billToAddress1: data.shipmentBillingDetails.Address,
      billToAddress2: data.shipmentBillingDetails.Address2,
      billToPostCode: data.shipmentBillingDetails.PostCode,
      billToCity: data.shipmentBillingDetails.City,
      billToState: data.shipmentBillingDetails.State,
      billToCountry: data.shipmentBillingDetails.County,
      billToCoordinator: data.shipmentBillingDetails.Coordinator,
      billToSalesPerson: data.shipmentBillingDetails.SalesPerson,
      sellToNo: '',
      yourReference: '',
      caseID: '',
      createdByUser: '',
      currentActivityId: '',
      companyCode: data.shipmentBillingDetails.CompanyCode,
      createdBy: '',
      createdDateTime: '',
      currentActivityStatus: '',
      createdDateTimeGE: '',
      createdDateTimeLE: '',
      deliveryOrderNo: '',
      expectedDeliveryDate: '',
      id: '',
      isDeleted: '',
      glossWeightKg: '',
      getStatus: '',
      shipmentNo: '',
      shipmentType: '',
      shipmentTypeGroup: '',
      shipmentPromisedDate: '',
      shippingMethod: '',
      shipmentMode: data.shippingDetails.shipmentMode,
      shippingAgent: data.shippingDetails.shippingAgent,
      shipToAttentionTo: '',
      shipToCode: data.shipmentAddress.CompanyCode,
      shipToContactNo: data.shipmentAddress.Contact,
      shipToEmail: data.shipmentAddress.Email,
      shipToAdd1: data.shipmentAddress.Address,
      shipToAdd2: data.shipmentAddress.Address2,
      shipToCity: data.shipmentAddress.City,
      shipToPostCode: data.shipmentAddress.PostCode,
      shipToState: data.shipmentAddress.State,
      shipToCountry: data.shipmentAddress.County,
      trackingNo: '',
      updatedByUser: '',
      updatedBy: '',
      updatedDateTime: '',
      wmsStorerKey: '',
      miscBilling: [
        {
          description: '',
          id: '',
          item: '',
          shipmentOrderID: '',
          value: ''
        }
      ],
      noOfCartons: '',
      netWeightKg: '',
      shipmentDetail: [
        {
          actualShippedDate: '',
          currentActivityId: '',
          ediKey: '',
          currentActivityStatus: '',
          createdByUser: '',
          createdBy: '',
          createdDateTime: '',
          id: '',
          lnNo: '',
          shipmentOrderId: '',
          shipmentDetailNo: '',
          iSBNPartNo: '',
          isDeleted: '',
          jobNo: '',
          requestedQty: '',
          requestedDate: '',
          shippedQty: '',
          title: '',
          totalRemaining: '',
          updatedByUser: '',
          updatedBy: '',
          updatedDateTime: ''
        }
      ]
    };
  }

  getShipmentDetails = (data: CreateCaseViewModel) => {
    if (!data.shippingInfoList || data.shippingInfoList.length === 0) {
      return this.getCaseDetailsFromShippingDetails(data);
    }
    const obj = [];
    data.shippingInfoList.forEach(item => {
      obj.push({
        shipmentId: '',
        boxId: '',
        shippingDetails: this.getShippingDetails(),
        shippingItems: this.getShippingItems(),
        shippingSpecificCost: this.getShippingSpecificCost(),
        shipmentAddress: this.getShippingAddress(),
        shipmentBillingDetails: this.getShippingBillingDetails()
      });
    });
    return obj;
  }

  getShippingDetails = () => {

  }

  getShippingItems = () => {

  }

  getShippingSpecificCost = () => {

  }

  getShippingAddress = () => {

  }

  getShippingBillingDetails = () => {

  }

  mapToQuotationList = (data: any[]): QuotationListVM[] => {
    let qoutationListVM: QuotationListVM[] = [];
    if (!data || data.length === 0) {
      return qoutationListVM;
    }
    data.forEach((item) => {
      qoutationListVM.push({
        id: item.id,
        dateCreated: item.attributes.dateCreated,
        caseNo: item.attributes.caseNo,
        customer: '',
        salesPerson: item.attributes.salesPerson,
        estNo: '',
        quoteNo: item.attributes.quoteNo,
        status: '',
        orderNo: item.attributes.orderNo,
        printType: item.attributes.printType,
        productGroup: item.attributes.productGroup,
        sellToNo: item.attributes.sellToNo,
        billToNo: item.attributes.billToNo,
        requestedDeliveryDate: item.attributes.requestedDeliveryDate,
        coordinator: item.attributes.coordinator,
        yourReference: item.attributes.yourReference,
        weight: item.attributes.weight,
        specialInstructions: item.attributes.specialInstructions,
        discount: item.attributes.discount,
        tax: item.attributes.tax,
        notesOnInvoiceBottom: item.attributes.notesOnInvoiceBottom,
        notesOnInvoiceTop: item.attributes.notesOnInvoiceTop,
        quoteDate: item.attributes.quoteDate,
        quoteSentDate: item.attributes.quoteSentDate,
        quoteExpireDate: item.attributes.quoteExpireDate,
        orderDate: item.attributes.orderDate,
        currentActivityId: item.attributes.currentActivityId,
        currentActivityStatusName: item.attributes.currentActivityStatusName,
        createdByUser: item.attributes.createdByUser,
        createdBy: item.attributes.createdBy,
        updatedByUser: item.attributes.updatedByUser,
        updatedBy: item.attributes.updatedBy,
        updatedDateTime: item.attributes.updatedDateTime,
        syncWMS: item.attributes.syncWMS,
        syncWMSDateTime: item.attributes.syncWMSDateTime,
        syncERP: item.attributes.syncERP,
        syncERPDateTime: item.attributes.syncERPDateTime,
        isDeleted: item.attributes.isDeleted,
        companyCode: item.attributes.companyCode,
        currencyCode: item.attributes.currencyCode,
        companyName: item.attributes.companyName,
        address1: item.attributes.address1,
        address2: item.attributes.address2,
      });
    });
    return qoutationListVM;
  }
}
