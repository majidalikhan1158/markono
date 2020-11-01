export interface ProductSpecFilters {
    currentSelectedFilter: string;
    createdDate: string;
    printingType: string;
    createdBy: string;
    isbnOwner: string;
}

export const ProductSpecFilterTypes =  {
    CREATED_DATE: 'CREATED_DATE',
    PRINTING_TYPE: 'PRINTING_TYPE',
    CREATED_BY: 'CREATED_BY',
    ISBN_OWNER: 'ISBN_OWNER',
};

