export interface ResponseModal {
    result: {
        data: any,
        status: number,
        errors: any
    };
    error: any;
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
}

export interface ShopFloorResponseModal {
    data: any;
    links: any;
    meta: any;
}

export interface CostCategoryResponseModal {
    result: CostCategory[];
    error: any;
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
}

export interface CostCategory {
    Code: string;
    Description: string;
}
