export interface ProductResponseModal {
    result: {
        data: any,
    };
    error: any;
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
}


export interface ProductGroupDDL {
    Id: number;
    ProductName: string;
}

export interface MaterialDataList {
    PaperWeight: string;
    PaperMaterial: string;
    PaperBrand: string;
}

export interface ChildIsbnModalList {
    Id: string;
    ISBN: string;
    VersionNo: string;
}