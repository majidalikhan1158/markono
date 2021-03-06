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
    OVERALL_COST
}

export enum TokenType {
    ORDER,
    PRODUCT,
    SHOPFLOOR,
    ESTIMATION,
    EMOTION
}

export enum RecordType {
    GET_CASE_TYPE,
    SHIPMENT_MODE,
    SHIPMENT_TERM,
    SHIPMENT_AGENT,
    MISC_BILLING_COST_CATEGORY,
    SHIPPING_INFO_COST_CATEGORY
}

export enum ProductSpecTypes {
    GENERAL,
    COVER,
    TEXT,
    BINDING,
    CHILD_ISBN,
    DVD_CD,
    WEBCODE,
    UNIT_PRICE,
    OTHER_COMPONENT,
    VERIFY_PRINT_FILE,
    BINDING_OTHER_COMPONENT,
    BINDING_DVD_CD,
    LAYOUT_PREP
}
