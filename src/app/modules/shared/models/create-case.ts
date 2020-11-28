export class CreateCaseViewModel {
    id: number;
    customerInfo: CustomerInfoVM;
    productDetailsList: ProductDetailsVM[];
    shippingInfoList: ShippingInfoVM[];
    miscCostList: MiscCostVM[];
    invoiceList: InvoiceViewModel[];
    specialInstructionList: SpecialInstructionViewModel[];
    overallCostVM: OverAllCostVM;
}

export interface CustomerInfoVM {
    id: number;
    caseType: number;
    referenceNumber: string;
    customerId: string;
    customerDetail: CustomerDetailVM;
}

export interface CustomerDetailVM {
    CompanyCode: string;
    CompanyName: string;
    PrintFileFolder: string;
    CurrencyCode: string;
    Contact: string;
    Address: string;
    Address2: string;
    PostCode: string;
    City: string;
    CountryRegionCode: string;
    County: string;
    PhoneNo: string;
    State: string;
    Email: string;
    SalesPerson: string;
    Coordinator: string;
}


export interface ProductDetailsVM {
    id: number;
    isbn: string;
    printType: number;
    orderQty: number;
    prodQty: number;
    margin: number;
    sellingPrice: number;
    subTotal: number;
    productISBNDetail: ProductISBNDetailVM;
}

export interface ProductDetailModals {
    id: number;
    requiredDate: string;
    forWho: string;
    quantity: number;
    specialInstructions: string;
}

export interface ProductISBNDetailVM {
    id: string;
    title: string;
    totalExtent: number;
    bindingType: string;
    productGroup: string;
    samplesRequired: number;
    bluePrintRequired: number;
    specsVersionNo: string;
    owner: string;
    jobType: string;
    weight: number;
    fGRequired: number;
    advancesRequired: number;
    quoteNo: string;
    estimatedPrice: number;
    additionalUnitPrice: number;
    sampleList: ProductDetailModals[];
    bluePrintList: ProductDetailModals[];
    fgList: ProductDetailModals[];
    advancesList: ProductDetailModals[];
    spineWidth: number;
}

export interface ShippingInfoVM {
    shipmentId: number;
    boxId: number;
    shippingDetails: ShipingDetailsModel;
    shippingItems: ShippingItemsModel[];
    shippingSpecificCost: ShippingSpecificCostModel[];
    shipmentAddress: ShipmentToAddress;
    shipmentBillingDetails: ShipmentBillingDetails;
}

export interface ShipingDetailsModel {
    billable: boolean;
    shippmentPromisedDate: string;
    shipmentMode: string;
    shippingTerms: string;
    shippingAgent: string;
    accountNumber: string;
    shipmentCategory: string;
    storerKey: string;
    isShipmentModeInternalTransfer: boolean;
    isShipmentModeLibrary: boolean;
}

export interface ShippingItemsModel {
    id: number;
    productNumber: string;
    title: string;
    availableQty: number;
    shipmentQty: number;
    maximumAllowed: number;
}

export interface ShippingSpecificCostModel {
    id: number;
    costCategory: string;
    description: string;
    subTotal: number;
}

export interface ShipmentToAddress {
    AttentionTo: string;
    BillToNumber: string;
    CompanyCode: string;
    CompanyName: string;
    PrintFileFolder: string;
    CurrencyCode: string;
    Contact: string;
    Address: string;
    Address2: string;
    PostCode: string;
    City: string;
    CountryRegionCode: string;
    County: string;
    PhoneNo: string;
    State: string;
    Email: string;
    SalesPerson: string;
    Coordinator: string;
}

export interface ShipmentBillingDetails {
    AttentionTo: string;
    BillToNumber: string;
    CompanyCode: string;
    CompanyName: string;
    PrintFileFolder: string;
    CurrencyCode: string;
    Contact: string;
    Address: string;
    Address2: string;
    PostCode: string;
    City: string;
    CountryRegionCode: string;
    County: string;
    PhoneNo: string;
    State: string;
    Email: string;
    SalesPerson: string;
    Coordinator: string;
}

export interface MiscCostVM {
    id: number;
    costCategory: number;
    description: string;
    subTotal: number;
}

export interface InvoiceViewModel {
    id: number;
    position: string;
    notes: string;
}

export interface SpecialInstructionViewModel {
    id: number;
    department: string;
    instructions: string;
}

export interface OverAllCostVM {
    printAndBind: number;
    subTotal: number;
    otherCharges: OtherCharges[];
    otherChargesTotal: number;
    discount: number;
    tax: number;
    total: number;
}

export interface OtherCharges {
    type: string;
    total: number;
}

export interface QuotationListVM {
    id: number;
    dateCreated: number;
    caseNo: string;
    customer: string;
    salesPerson: string;
    estNo: string;
    quoteNo: string;
    status: string;
    orderNo: string;
    printType: string;
    productGroup: string;
    sellToNo: string;
    billToNo: string;
    requestedDeliveryDate: string;
    coordinator: string;
    yourReference: string;
    weight: string;
    specialInstructions: string;
    discount: number;
    tax: string;
    notesOnInvoiceBottom: string;
    notesOnInvoiceTop: string;
    quoteDate: number;
    quoteSentDate: number;
    quoteExpireDate: number;
    orderDate: number;
    currentActivityId: string;
    currentActivityStatusName: string;
    createdByUser: string;
    createdBy: string;
    createdDateTime: string;
    updatedByUser: string;
    updatedBy: string;
    updatedDateTime: string;
    syncWMS: string;
    syncWMSDateTime: string;
    syncERP: string;
    syncERPDateTime: string;
    isDeleted: string;
    companyCode: string;
    currencyCode: string;
    companyName: string;
    address1: string;
    address2: string;
}
export interface ProductVersionVM {
    id: string;
    isSpecsInView: boolean;
    isbn: string;
    versionNo: string;
    createdDate: string;
    createdBy: string;
    versionDescription: string;
    productDescription: string;
    statusDescription: string;
}

