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
