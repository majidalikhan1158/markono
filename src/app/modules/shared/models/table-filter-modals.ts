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


