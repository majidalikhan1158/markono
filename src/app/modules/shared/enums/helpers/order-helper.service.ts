import { Injectable } from '@angular/core';
import { OrderVM } from '../../models/order-management';

@Injectable({
  providedIn: 'root'
})
export class OrderHelperService {

  constructor() { }

  public transOrderJobVM = (data: any): OrderVM => {
    return {
      id: data.Id,
      caseNo: data.CaseNo,
      quoteNo: data.QuoteNo,
      orderNo: data.OrderNo,
      printType: data.PrintType,
      productGroup: data.ProductGroup,
      sellToNo: data.SellToNo,
      billToNo: data.BillToNo,
      requestedDeliveryDate: data.RequestedDeliveryDate,
      salesPerson: data.SalesPerson,
      coordinator: data.Coordinator,
      yourReference: data.YourReference,
      weight: data.Weight,
      specialInstructions: data.SpecialInstructions,
      discount: data.Discount,
      tax: data.Tax,
      notesOnInvoiceBottom: data.NotesOnInvoiceBottom,
      notesOnInvoiceTop: data.NotesOnInvoiceTop,
      quoteDate: data.QuoteDate,
      quoteSentDate: data.QuoteSentDate,
      quoteExpireDate: data.QuoteExpireDate,
      orderDate: data.OrderDate,
      currentActivityId: data.CurrentActivityId,
      currentActivityStatusCode: data.CurrentActivityStatusCode,
      currentActivityStatusName: data.CurrentActivityStatusName,
      createdByUser: data.CreatedByUser,
      createdBy: data.CreatedBy,
      createdDateTime: data.CreatedDateTime,
      updatedByUser: data.UpdatedByUser,
      updatedBy: data.UpdatedBy,
      updatedDateTime: data.UpdatedDateTime,
      syncWMS: data.SyncWMS,
      syncWMSDateTime: data.SyncWMSDateTime,
      syncERP: data.SyncERP,
      syncERPDateTime: data.SyncERPDateTime,
      isDeleted: data.IsDeleted,
      currencyCode: data.CurrencyCode,
      companyCode: data.CompanyCode,
      companyName: data.CompanyName,
      address1: data.Address1,
      address2: data.Address2,
      qty: data.Qty,
      noOfTitles: data.NoOfTitles,
      caseDetail: data.CaseDetail,
      otherCharge: data.OtherCharge,
      isbnPartNo: data.isbnPartNo,
      type: data.type,
      jobNo: data.jobNo
    };
  }
}
