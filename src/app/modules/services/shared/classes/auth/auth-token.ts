export interface ApiAuthToken{
    result: {
        token: string;
        expire: string;
    };
    success: boolean;
    error: any;
}
