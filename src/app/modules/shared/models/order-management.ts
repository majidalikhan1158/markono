export interface OrdersModel {
    id: number;
    customerPoNo: string;
    orderDate: number;
    rdd: number;
    noOfTitles: string;
    qty: string;
    type: string;
    status: string;
}
export interface OrderVM {
    id: number;
    caseNo: string;
    quoteNo: string;
    orderNo: string;
    printType: string;
    productGroup: string;
    sellToNo: string;
    billToNo: string;
    requestedDeliveryDate: number;
    salesPerson: string;
    coordinator: string;
    yourReference: string;
    weight: string;
    specialInstructions: string;
    discount: string;
    tax: string;
    notesOnInvoiceBottom: string;
    notesOnInvoiceTop: string;
    quoteDate: number;
    quoteSentDate: number;
    quoteExpireDate: number;
    orderDate: number;
    currentActivityId: string;
    currentActivityStatusCode: string;
    currentActivityStatusName: string;
    createdByUser: string;
    createdBy: string;
    createdDateTime: number;
    updatedByUser: string;
    updatedBy: string;
    updatedDateTime: number;
    syncWMS: boolean;
    syncWMSDateTime: number;
    syncERP: boolean;
    syncERPDateTime: number;
    isDeleted: boolean;
    currencyCode: string;
    companyCode: string;
    companyName: string;
    address1: string;
    address2: string;
    qty: number;
    noOfTitles: number;
    type: string;
    caseDetail: CaseDetail[];
    otherCharge: OtherCharge[];
}
export interface OtherCharge {
    id: number;
    item: string;
    value: number;
    description: string;
    caseID: number;
}
export interface CaseDetail {
    Id: number;
    CaseID: string;
    CaseDetailNo: string;
    ISBNPartNo: string;
    PrintType: string;
    ProductVersion: string;
    ParentISBN: string;
    Type: string;
    ComponentType: string;
    JobType: string;
    ProductGroup: string;
    YourReference: string;
    Title: string;
    LnNo: string;
    ExtLnNo: string;
    JobNo: string;
    ExtJobNo: null;
    SellToNo: string;
    BindingType: string;
    TotalExtent: number;
    Weight: string;
    Spine: string;
    AdditionalUnitPrice: number;
    AdditionalQty: number;
    Margin: number;
    OrderQuantity: string;
    ProductionQuantity: number;
    EstimatedPrice: number;
    QuotedPrice: number;
    SellingPrice: number;
    SubTotal: number;
    SamplesRequired: number;
    BluePrintRequired: number;
    FGRequired: number;
    AdvancesRequired: number;
    CarrierSheet: string;
    IsDeleted: boolean;
    CurrentActivityId: number;
    CurrentActivityStatusCode: number;
    CurrentActivityStatusName: string;
    CreatedByUser: string;
    CreatedBy: string;
    CreatedDateTime: number;
    CpdatedByUser: string;
    CpdatedBy: string;
    CpdatedDateTime: number;
    CequestedDeliveryDate: number
    CaseDetailAddiotional: CaseDetailAdditional[];
}
export interface CaseDetailAdditional {
    id: number;
    caseDetailID: number;
    forWho: string;
    item: string;
    lnNo: number;
    quantity: number;
    specialInstruction: string;
    requiredDate: number;
}

export const StatusTypesArray = [
    {
        text: 'PO',
        value: 'PO',
    },
    {
        text: 'Job',
        value: 'Job',
    },
    {
        text: 'App Job',
        value: 'App Job',
    }
];

export const ViewByArray = {
    PO: 'PO',
    JOB: 'Job',
    APPJOB: 'App Job',
};

export interface OrderJobModel {
    Id: number;
    JobNo: string;
    ISBNPartNo: string;
    // orderDate: number;
    // rdd: number;
    OrderQuantity: string;
    PrintType: string;
    CurrentActivityStatusCode: string;
}
export interface OrdersIssueModel {
    id: number;
    jobNo: string;
    customerPoNo: string;
    isbn: string;
    orderDate: number;
    rdd: number;
    qty: string;
    type: string;
    status: string;
}
export interface ActivityLogModel {
    id: number;
    actionDate: number;
    actionBy: string;
    source: string;
    duration: string;
    status: string;
    activity: string;
}
export interface JobInfoHeaderModel {
    id: number;
    isbn: string;
    jobNo: string;
    jobType: string;
    orderDate: number;
    rdd: number;
    qty: string;
    orderStatus: string;
}
export interface JobInfoDetailModel {
    id: number;
    jobNo: string;
    isbn: string;
    orderDate: number;
    rdd: number;
    qty: string;
    jobType: string;
    status: string;
}

export const OrderInfoStatusTypesArray = [
    {
        text: 'Shipped',
        value: 'Shipped',
    },
    {
        text: 'Printing',
        value: 'Printing',
    },
];

export const OrderInfoJobType = {
    OFFSET: 'Offset',
};

export const OrderStatusTypes = {
    ALL: 'ALL',
    101: 'Case Created',
    CASE_REJECTED: 'Case Rejected',
    201: 'RFQ',
    202: 'Pending Est',
    203: 'Est. Compl',
    EST_RECOMMIT: 'Est. Recommit.',
    QUOTE_SENT: 'Quote Sent',
    QUOTE_REJECTED: 'Quote Rejected',
    207: 'Order Confirmed',
    301: 'Pending File Prep',
    FILE_PREPARING: 'File Preparing',
    FILE_ISSUE: 'File Issue',
    FILE_PREP_COMPL: 'File Prep Compl.',
    PLANNING: 'Planning',
    SCHEDULING: 'Scheduling',
    SCHEDULED_TO_SF: 'Scheduled to SF',
    PENDING_PLATES: 'Pending Plates',
    PLATES_PRODUCED: 'Plates Produced',
    503: 'Printing',
    PRINTING_COMPL: 'Printing Compl.',
    FOLDING: 'Folding',
    602: 'Folding Compl',
    BINDING: 'Binding',
    801: 'Bind Compl',
    REJECT: 'Reject (Prod)',
    PENDING_RECEIPT: 'Pending Receipt',
    RECEIVING: 'Receiving',
    RECEIPT_COMPL: 'Receipt Compl.',
    806: 'Shipped',
    PENDING_INVOICING: 'Pending Invoicing',
    INVOICED: 'Invoiced',
    PAID: 'Paid',
    ORDER_ON_HOLD: 'Order On-hold',
    ORDER_CANCELLED: 'Order cancelled',
};
