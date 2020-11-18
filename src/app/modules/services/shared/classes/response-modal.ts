export interface ResponseModal {
    error: any;
    result: {
        data: any,
        status: number,
        errors: any
    };
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
}
