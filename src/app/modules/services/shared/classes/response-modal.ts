export interface ResponseModal {
    error: any;
    result: {
        data: any
    };
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
}
