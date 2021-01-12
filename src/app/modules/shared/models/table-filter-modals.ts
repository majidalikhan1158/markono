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
    orderType: string;
    customerPoNo: string;
    customerName: string;
    orderDate: string;
    rddDate: string;
    status: string;
}

export const OrderSearchFilterTypes = {
    ORDER_TYPE: 'ORDER_TYPE',
    CUSTOMER_PONO: 'CUSTOMER_PONO',
    ORDER_DATE: 'ORDER_DATE',
    STATUS: 'STATUS',
    CUSTOMER_NAME: 'CUSTOMER_NAME',
    RDD_DATE: 'RDD_DATE'
};

export interface OrdersWithIssueSearchFilters {
    currentSelectedFilter: string;
    orderType: string;
    customerPoNo: string;
    orderDate: string;
    rddDate: string;
    status: string;
    isbn: string;
    printVisJobNo: string;
    printAiJobNo: string;
}

export const OrdersWithIssueSearchFilterTypes = {
    ORDER_TYPE: 'ORDER_TYPE',
    CUSTOMER_PONO: 'CUSTOMER_PONO',
    ORDER_DATE: 'ORDER_DATE',
    STATUS: 'STATUS',
    RDD_DATE: 'RDD_DATE',
    ISBN: 'ISBN',
    PRINT_VIS_JOBNO: 'PRINT_VIS_JOBNO',
    PRINTAI_JOBNO: 'PRINTAI_JOBNO'
};

export interface OrderInfoDetailSearchFilters {
    currentSelectedFilter: string;
    jobNo: string;
    isbn: string;
    orderDate: string;
    rddDate: string;
    qty: string;
    jobType: string;
    status: string;
};

export const OrdersInfoDetailSearchFilterTypes = {
    ORDER_DATE: 'ORDER_DATE',
    STATUS: 'STATUS',
    RDD_DATE: 'RDD_DATE',
    ISBN: 'ISBN',
    JOBNO: 'JOBNO',
    QTY: 'QTY',
    JOB_TYPE: 'JOB_TYPE'
};

