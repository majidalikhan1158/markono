export interface ApiAuthToken {
    result: {
        token: string;
        expire: string;
    };
    success: boolean;
    error: any;
}

export interface ShopFloorApiToken {
    token: string;
    expiry: Date;
}
