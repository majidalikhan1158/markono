import { Injectable } from '@angular/core';
import {
  CreateCaseViewModel,
  InvoiceViewModel,
  ProductDetailModals,
  ProductISBNDetailVM,
  ProductVersionVM,
  ShippingInfoVM,
  ShippingItemsModel,
  ShippingSpecificCostModel,
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
      yourReference: data.customerInfo.referenceNumber,
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
  public transToCreateShipment = (mainData: CreateCaseViewModel, caseId: string) => {
    if (!mainData || !mainData.shippingInfoList || mainData.shippingInfoList.length === 0) {
      return null;
    }
    const dataArray = [];
    mainData.shippingInfoList.forEach(data => {
      dataArray.push({
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
        billToCountry: data.shipmentBillingDetails.CountryRegionCode,
        billToCoordinator: data.shipmentBillingDetails.Coordinator,
        billToSalesPerson: data.shipmentBillingDetails.SalesPerson,
        sellToNo: data.shipmentBillingDetails.BillToNumber,
        caseID: caseId,
        companyCode: data.shipmentBillingDetails.CompanyCode,
        shipmentType: data.shippingDetails.shipmentCategory,
        shipmentPromisedDate: data.shippingDetails.shippmentPromisedDate,
        shipmentMode: data.shippingDetails.shipmentMode,
        shippingAgent: data.shippingDetails.shippingAgent,
        shipToAttentionTo: data.shipmentAddress.AttentionTo,
        shipToCode: data.shipmentAddress.CompanyCode,
        shipToContactNo: data.shipmentAddress.Contact,
        shipToEmail: data.shipmentAddress.Email,
        shipToAdd1: data.shipmentAddress.Address,
        shipToAdd2: data.shipmentAddress.Address2,
        shipToCity: data.shipmentAddress.City,
        shipToPostCode: data.shipmentAddress.PostCode,
        shipToState: data.shipmentAddress.State,
        shipToCountry: data.shipmentAddress.CountryRegionCode,
        yourReference: mainData.customerInfo?.referenceNumber,
        createdByUser: 'DevUI',
        currentActivityId: caseId,
        createdBy: 'DevUI',
        createdDateTime: new Date(),
        currentActivityStatus: '',
        createdDateTimeGE: '',
        createdDateTimeLE: '',
        deliveryOrderNo: '',
        expectedDeliveryDate: '',
        id: caseId,
        isDeleted: false,
        glossWeightKg: '',
        getStatus: '',
        shipmentNo: '',
        shipmentTypeGroup: '',
        shippingMethod: '',
        trackingNo: '',
        updatedByUser: 'DevUI',
        updatedBy: 'DevUI',
        updatedDateTime: new Date(),
        wmsStorerKey: '',
        miscBilling: this.getShipmentSpecificCost(data.shippingSpecificCost, caseId),
        noOfCartons: '',
        netWeightKg: '',
        shipmentDetail: this.getShipmentItems(data.shippingItems, caseId)
      });
    });
    return dataArray;
  }

  getShipmentSpecificCost = (data: ShippingSpecificCostModel[], caseId: string) => {
    if ( !data || data.length === 0) {
      return [];
    }
    const dataArray = [];
    data.forEach(item => {
      dataArray.push({
        description: item.description,
        item: item.costCategory,
        value: item.subTotal,
        id: caseId,
        shipmentOrderID: caseId
      });
    });
    return dataArray;
  }

  getShipmentItems = (data: ShippingItemsModel[], caseId: string) => {
    if ( !data || data.length === 0) {
      return [];
    }
    const dataArray = [];
    data.forEach(item => {
      dataArray.push(
        {
          actualShippedDate: new Date(),
          currentActivityId: caseId,
          ediKey: '',
          currentActivityStatus: '',
          createdByUser: 'DevUI',
          createdBy: 'DevUI',
          createdDateTime: new Date(),
          id: caseId,
          lnNo: '',
          shipmentOrderId: caseId,
          shipmentDetailNo: '',
          iSBNPartNo: item.productNumber,
          isDeleted: false,
          jobNo: '',
          requestedQty: item.shipmentQty,
          requestedDate: new Date(),
          shippedQty: item.shipmentQty,
          title: item.title,
          totalRemaining: item.availableQty,
          updatedByUser: 'DevUI',
          updatedBy: 'DevUI',
          updatedDateTime: new Date()
        }
      );
    });
    return dataArray;
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

  sum = (firstNumber: number, secondNumber: number) => {
    // tslint:disable-next-line: radix
    firstNumber = parseFloat(firstNumber.toString());
    // tslint:disable-next-line: radix
    secondNumber = parseFloat(secondNumber.toString());
    // tslint:disable-next-line: radix
    return parseFloat(firstNumber.toFixed(2)) + parseFloat(secondNumber.toFixed(2));
  }

  minus = (firstNumber: number, secondNumber: number) => {
    // tslint:disable-next-line: radix
    firstNumber = parseFloat(firstNumber.toString());
    // tslint:disable-next-line: radix
    secondNumber = parseFloat(secondNumber.toString());
    // tslint:disable-next-line: radix
    return parseFloat(firstNumber.toFixed(2)) - parseFloat(secondNumber.toFixed(2));
  }
}
