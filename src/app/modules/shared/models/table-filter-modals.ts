export interface ProductSpecFilters {
    currentSelectedFilter: string;
    createdDate: string;
    printingType: string;
    createdBy: string;
    isbnOwner: string;
}

export const ProductSpecFilterTypes = {
    CREATED_DATE: 'CREATED_DATE',
    PRINTING_TYPE: 'PRINTING_TYPE',
    CREATED_BY: 'CREATED_BY',
    ISBN_OWNER: 'ISBN_OWNER',
};

export interface QuotationSpecFilters {
    currentSelectedFilter: string;
    createdDate: string;
    status: string;
    salesperson: string;
    customer: string;
}

export const QuotationSpecFilterTypes = {
    CREATED_DATE: 'CREATED_DATE',
    STATUS: 'STATUS',
    SALESPERSON: 'SALESPERSON',
    CUSTOMER: 'CUSTOMER',
};
//Platemaking
export interface PlatemakingSearchFilters {
    currentSelectedFilter: string;
    jobNo: string;
    customer: string;
    platesToBeReadyBy: string;
    printingDate: string;
    status: string;
}

export const PlatemakingnSearchFilterTypes = {
    JOB_NO: 'JOB_NO',
    STATUS: 'STATUS',
    PLATESTOBEREADBY_DATE: 'PLATESTOBEREADBY_DATE',
    SCHEDULEDPRINTING_DATE: 'SCHEDULEDPRINTING_DATE',
    CUSTOMER: 'CUSTOMER',
};
//Orders

export interface OrderSearchFilters {
    currentSelectedFilter: string;
    type: string;
    yourReference: string;
    companyName: string;
    orderDate: string;
    requestedDeliveryDate: string;
    currentActivityStatusName: string;
}

export const OrderSearchFilterTypes = {
    TYPE: 'TYPE',
    YOUR_REFERENCE: 'YOUR_REFERENCE',
    ORDER_DATE: 'ORDER_DATE',
    STATUS: 'STATUS',
    COMPANY_NAME: 'COMPANY_NAME',
    REQUEST_DELIVERYDATE: 'REQUEST_DELIVERYDATE'
};

export const PrintTypes = {
    PRINT: 'PO',
    WAREHOUSE: 'WO',
};

export interface OrdersWithIssueSearchFilters {
    currentSelectedFilter: string;
    yourReference: string;
    orderDate: string;
    requestedDeliveryDate: string;
    currentActivityStatusName: string;
    isbn: string;
    printVisJobNo: string;
    printAiJobNo: string;
    type: string;
    companyName: string;
}

export const OrdersWithIssueSearchFilterTypes = {
    YOURREFERENCE: 'YOUR_REFERENCE',
    ORDERDATE: 'ORDER_DATE',
    REQUESTEDDELIVERYDATE: 'REQUESTEDDELIVERYDATE',
    CURRENTACTIVITYSTATUSNAME: 'CURRENTACTIVITYSTATUSNAME',
    ISBN: 'ISBN',
    PRINTVISJOBNO: 'PRINTVISJOBNO',
    PRINTAIJOBNO: 'PRINTAIJOBNO',
    TYPE: 'TYPE',
    COMPANYNAME: 'COMPANYNAME'
};

export interface OrderJobInfoDetailSearchFilters {
    currentSelectedFilter: string;
    jobNo: string;
    isbn: string;
    orderDate: string;
    rddDate: string;
    qty: string;
    jobType: string;
    status: string;
};

export interface OrderInfoDetailSearchFilters {
    currentSelectedFilter: string;
    JobNo: string;
    ISBNPartNo: string;
    // orderDate: string;
    // requestedDeliveryDate: string;
    OrderQuantity: string;
    PrintType: string;
    CurrentActivityStatusName: string;
};

export const OrdersInfoDetailSearchFilterTypes = {
    // ORDER_DATE: 'ORDER_DATE',
    STATUS: 'STATUS',
    // RDD_DATE: 'RDD_DATE',
    ISBN: 'ISBN',
    JOBNO: 'JOBNO',
    QTY: 'QTY',
    JOB_TYPE: 'JOB_TYPE'
};

