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

export interface ProductVersions {
    Id: string;
    VersionNo: string;
    CreatedDateTime: string;
    CreatedBy: string;
    VersionDescription: string;
}


export interface SpineWidthThicknessParamHistory {
    PrintType: string;
    PaperWeight: string;
    PaperMaterial: string;
    PaperBrand: string;
}

export interface SpineWidthParamHistory {
    noOfColourExtent: number;
    noOfMonoExtent: number;
    thickness: number;
    bindingType: string;
}

export interface FileCheckConfig {
    id: number;
    component: string;
    question: string;
    remark: string;
    mandatory: string;
    createdDateTime: string;
    createdBy: string;
    updatedDateTime: string;
    updatedBy: string;
}