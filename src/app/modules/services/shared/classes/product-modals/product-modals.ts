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

export interface ChildIsbnModal {
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
    toggleLabel: boolean;
}

export interface ProductSpecsList {
    activeVersion: boolean;
    createdBy: string;
    createdDateTime: Date;
    deleted: boolean;
    externalPartNo: string;
    isbn: string;
    isbnOwner: string;
    printType: string;
    productDescription: string;
    productGroup: string;
    productGroupName: string;
    layoutReady: boolean;
    statusCode: number;
    status: string;
    updatedDateTime: Date;
    versionNo: string;
    versionDescription: string;
    updatedBy: string;
    fileChecked: boolean;
    completeSetup: any;
    productDetail: string;
    productWebCode: string;
    productVolumeSet: string;
    productAdditionalComponent: string;
    productCD: string;
    id: string;
}
