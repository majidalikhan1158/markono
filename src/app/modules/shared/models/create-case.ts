export class CreateCaseViewModel {
    id: number;
    customerInfo: CustomerInfoVM;
    productDetailsList: ProductDetailsVM[];
    shippingInfoList: ShippingInfoVM[];
    miscCostList: MiscCostViewModel[];
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
    orderQty: string;
    margin: string;
    sellingPrice: string;
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
    shippingItems: ShippingItemsModel;
    shippingSpecificCost: ShippingSpecificCostModel[];
    shipmentAddress: ShipmentToAddress;
    shipmentBillingDetails: ShipmentBillingDetails;
}

export interface ShipingDetailsModel {
    billable: number;
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
    shipmentQty: string;
}

export interface ShippingSpecificCostModel {
    id: number;
    costCategory: string;
    description: string;
    subTotal: string;
}

export interface ShipmentToAddress {
    attentionTo: string;
    contactPeron: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    postCode: string;
    state: string;
    country: string;
}

export interface ShipmentBillingDetails {
    billToNumber: string;
    attentionTo: string;
    contactPeron: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    postCode: string;
    state: string;
    country: string;
    coordinator: string;
    salesPerson: string;
}

export interface MiscCostViewModel {
    id: number;
    costCategory: number;
    description: string;
    subTotal: string;
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



