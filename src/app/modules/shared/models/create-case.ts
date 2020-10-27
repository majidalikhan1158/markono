export class CreateCaseViewModel {
    id: number;
    customerInfo: CustomerInfoViewModel;
    productDetailsList: ProductDetailsViewModel[];
    shippingInfoList: ShippingInfoViewModel[];
    miscCostList: MiscCostViewModel[];
    invoiceList: InvoiceViewModel[];
    specialInstructionList: SpecialInstructionViewModel[];
}

export interface CustomerInfoViewModel {
    caseType: number;
    referenceNumber: string;
    customerSearchString: string;
}

export interface ProductDetailsViewModel {
    id: number;
    isbn: string;
    printType: number;
    orderQty: string;
    margin: string;
    sellingPrice: string;
}

export interface ShippingInfoViewModel {
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

