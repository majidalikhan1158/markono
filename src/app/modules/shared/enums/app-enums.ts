export enum CreateCaseMode {
    NEW = 0,
    EDIT = 1
}

export enum CreateCaseSteps {
    CUSTOMER_INFO = 0,
    CASE_DETAILS = 1,
    SUMMARY = 2
}

export enum CreateCaseDataType {
    CUSTOMER_INFO,
    PRODUCT_DETAILS,
    SHIPPING_INFO,
    MISC_COST,
    INVOICE,
    SPECIAL_INSTRUCTIONS,
}

export enum TokenType {
    ORDER,
    PRODUCT
}

export enum RecordType {
    GET_CASE_TYPE,
    SHIPMENT_MODE,
    SHIPMENT_TERM,
    SHIPMENT_AGENT
}