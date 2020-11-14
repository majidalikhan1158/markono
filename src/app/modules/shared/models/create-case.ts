export class CreateCaseViewModel {
    id: number;
    customerInfo: CustomerInfoVM;
    productDetailsList: ProductDetailsVM[];
    shippingInfoList: ShippingInfoVM[];
    miscCostList: MiscCostVM[];
    invoiceList: InvoiceViewModel[];
    specialInstructionList: SpecialInstructionViewModel[];
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
}


export interface ProductDetailsVM {
    id: number;
    isbn: string;
    printType: number;
    orderQty: number;
    margin: number;
    sellingPrice: number;
    productISBNDetail: ProductISBNDetailVM;
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
    weight: string;
    fGRequired: number;
    advancesRequired: number;
    quoteNo: string;
    estimatedPrice: number;
    additionalUnitPrice: number;
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
    position: number;
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
}