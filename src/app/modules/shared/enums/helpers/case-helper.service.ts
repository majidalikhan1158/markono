import { Injectable } from '@angular/core';
import { CaseTypes } from '../case-management/case-contants';
import {
  CreateCaseViewModel,
  InvoiceViewModel,
  ProductDetailModals,
  ProductISBNDetailVM,
  ProductRevisionVM,
  ProductVersionVM,
  ShippingItemsModel,
  ShippingSpecificCostModel,
  SpecialInstructionViewModel
} from '../../models/create-case';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CaseHelperService {
  constructor() { }


  public transPoductDetailToProductISBNDetailVM = (data: any): ProductISBNDetailVM => {
    return {
      id: data.Id,
      title: data.ProductDescription,
      totalExtent: data.ProductDetail?.length > 0 ? data.ProductDetail[0].TxtTotalExtent : 0,
      bindingType: data.ProductDetail?.length > 0 ? data.ProductDetail[0].BindingType : '',
      productGroup: data.ProductGroupName,
      carrierSheet: data.carrierSheet,
      samplesRequired: 0,
      bluePrintRequired: 0,
      specsVersionNo: data.VersionNo,
      owner: data.ISBNOwner,
      jobType: '',
      weight: data.ProductDetail?.length > 0 ? data.ProductDetail[0].Weight : 0,
      fGRequired: 0,
      advancesRequired: 0,
      quoteNo: '',
      estimatedPrice: data.ProductDetail?.length > 0 ? data.ProductDetail[0].EstimatedPrice : 0,
      additionalUnitPrice: 0,
      sampleList: [],
      bluePrintList: [],
      fgList: [],
      advancesList: [],
      spineWidth: data.ProductDetail?.length > 0 ? data.ProductDetail[0].SpineWidth : 0,
      revisionNo: data.Revision ?? '',
    };
  }

  public transToProductISBNDetailVM = (data: any): ProductISBNDetailVM => {
    return {
      id: data.id,
      title: data.attributes['product-description'],
      totalExtent: data.attributes['txt-total-extent'] ?? 0,
      bindingType: data.attributes['binding-type'],
      productGroup: data.attributes['product-group'],
      carrierSheet: data.carrierSheet,
      samplesRequired: 0,
      bluePrintRequired: 0,
      specsVersionNo: data.attributes['version-no'],
      owner: data.attributes['isbn-owner'],
      jobType: '',
      weight: data.attributes['weight'] ?? 0,
      fGRequired: 0,
      advancesRequired: 0,
      quoteNo: '',
      estimatedPrice: data.attributes['estimated-price'] ?? 0,
      additionalUnitPrice: 0,
      sampleList: [],
      bluePrintList: [],
      fgList: [],
      advancesList: [],
      spineWidth: data.attributes['spine-width'] ?? 0,
      revisionNo: data.attributes['revision'] ?? '',
    };
  }

  public transToProductISBNDetailVMViaRevisionChange = (data: any): ProductISBNDetailVM => {
    console.log('data is=>', data);
    const p = data?.ProductDetail && data?.ProductDetail.length > 0 ? data?.ProductDetail[0] : null;
    return {
      id: data?.Id,
      title: data?.ProductDescription ?? '',
      totalExtent: p?.TxtTotalExtent ?? 0,
      bindingType: p?.BindingType ?? '',
      productGroup: data?.ProductGroupName,
      carrierSheet: data?.carrierSheet,
      samplesRequired: 0,
      bluePrintRequired: 0,
      fGRequired: 0,
      advancesRequired: 0,
      specsVersionNo: data?.VersionNo ?? '',
      owner: data?.ISBNOwner ?? '',
      jobType: '',
      weight: p?.Weight ?? 0,
      quoteNo: '',
      estimatedPrice: p?.EstimatedPrice ?? 0,
      additionalUnitPrice: 0,
      sampleList: [],
      bluePrintList: [],
      fgList: [],
      advancesList: [],
      spineWidth: p?.SpineWidth ?? 0,
      revisionNo: data?.Revision ?? '',
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
      yourReference: data.customerInfo.referenceNumber?.substring(0, 32),
      departmentSpecialInstructions: this.getSpecialInstructions(data.specialInstructionList),
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
    const otherChargesList = [];
    if (!data.miscCostList || data.miscCostList.length === 0) {
      return otherChargesList;
    }
    data.miscCostList.forEach(item => {
      otherChargesList.push({
        chargesCode: item.costCategory, // change to text see from doc
        value: item.subTotal,
        description: item.description
      });
    });
    // obj.push({
    //   item: 'print and bind',
    //   value: data.overallCostVM.printAndBind,
    //   description: 'test'
    // });
    return otherChargesList;
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
        productRevision: item.productISBNDetail.revisionNo,
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
        carrierSheet: item.productISBNDetail.carrierSheet,
        createdByUser: 'DevUI',
        createdBy: 'DevUI',
        updatedByUser: 'DevUI',
        updatedBy: 'DevUI',
        samplesReq: this.getModalData(item.productISBNDetail.sampleList, 'Sample'),
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
        requiredDate: moment(new Date(item.requiredDate)).add(6, 'hours').add(30, 'minutes'),
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
    const specialInstructionsList = [];
    if (!specialInstructionList || specialInstructionList.length === 0) {
      return specialInstructionsList;
    }

    specialInstructionList.forEach(item => {
      specialInstructionsList.push({
        dept: item.department,
        instructions: item.instructions
      });
    });
    return specialInstructionsList;
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
    return list.sort((a, b) => {
      return (new Date(b.createdDate) as any) - (new Date(a.createdDate) as any);
    });
  }

  transProductRevisionApiToProductRevisionModal = (data: any[]) => {
    const list: ProductRevisionVM[] = [];
    data.forEach(item => {
      list.push({
        id: item.Id,
        isSpecsInView: false,
        isbn: item.ISBN,
        versionNo: item.VersionNo,
        revision: item.Revision,
        createdDate: item.CreatedDateTime,
        createdBy: item.CreatedBy,
        versionDescription: item.VersionDescription
      });
    });
    return list.sort((a, b) => {
      return (new Date(b.createdDate) as any) - (new Date(a.createdDate) as any);
    });
  }

  // Create Shipment Api Intergation
  public transToCreateShipment = (mainData: CreateCaseViewModel, caseId: string, caseDetailResp: any) => {
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
        shipmentPromisedDate: moment(new Date(data.shippingDetails.shippmentPromisedDate)).add(6, 'hours').add(30, 'minutes'),
        shipmentMode: data.shippingDetails.shipmentMode,
        shippingAgent: data.shippingDetails.shippingAgent,
        shippingMethod: data.shippingDetails.shippingTerms,
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
        shipmentNote: data.shipmentAddress.shipmentNote,
        yourReference: mainData.customerInfo.caseType.toString() === CaseTypes.PRINT_ORDER
        ? mainData.customerInfo?.referenceNumber?.substring(0, 32)
        : '',
        expectedDeliveryDate: moment(new Date(data.shippingDetails.shippmentExpectedDeliveryDate)).add(6, 'hours').add(30, 'minutes'),
        shipmentTypeGroup: data.shippingDetails.shipmentCategory,
        miscBilling: this.getShipmentSpecificCost(data.shippingSpecificCost, caseId),
        shipmentDetail: this.getShipmentItems(data.shippingItems, caseId, caseDetailResp),
        createdByUser: 'DevUI',
        currentActivityId: caseId,
        createdBy: 'DevUI',
        createdDateTime: new Date(),
        updatedByUser: 'DevUI',
        updatedBy: 'DevUI',
        updatedDateTime: new Date(),
        currentActivityStatus: '',
        createdDateTimeGE: '',
        createdDateTimeLE: '',
        deliveryOrderNo: '',
        id: caseId,
        isDeleted: false,
        glossWeightKg: '',
        getStatus: '',
        shipmentNo: '',
        trackingNo: '',
        wmsStorerKey: '',
        noOfCartons: '',
        netWeightKg: '',
      });
    });
    return dataArray;
  }

  getShipmentSpecificCost = (data: ShippingSpecificCostModel[], caseId: string) => {
    if (!data || data.length === 0) {
      return [];
    }
    const dataArray = [];
    data.forEach(item => {
      dataArray.push({
        description: item.description,
        chargesCode: item.costCategory,
        value: item.subTotal
      });
    });
    return dataArray;
  }

  getShipmentItems = (data: ShippingItemsModel[], caseId: string, caseDetailResp: any) => {
    if ( !data || data.length === 0) {
      return [];
    }
    const dataArray = [];
    data.forEach((item, i) => {
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
          jobNo: caseDetailResp[i]?.jobNo ?? '',
          requestedQty: item.shipmentQty,
          requestedDate: new Date(),
          shippedQty: item.shipmentQty,
          title: item.title,
          totalRemaining: item.availableQty,
          updatedByUser: 'DevUI',
          updatedBy: 'DevUI',
          updatedDateTime: new Date(),
          caseDetailNo: caseDetailResp[i]?.caseDetailNo ?? ''
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
