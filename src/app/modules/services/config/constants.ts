// Angular Modules
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
  })
export class Constants {
    public readonly API_BASE_ADDRESS: string =  'http://192.168.254.60/';
    public readonly API_ENDPOINT_ORDER_SERVICES: string = 'OrderServicesDev/api/';
    public readonly API_ENDPOINT_PRODUCT_SERVICES: string = 'ProductServicesDev/api/';
    public readonly API_ENDPOINT_LIVE: string = 'app.markono.com';
    public readonly AUTH_CRED_ORDER_TOKEN = {
        username: 'webDev',
        password: '@webdev!'
    };
    public readonly AUTH_CRED_PRODUCT_TOKEN = {
        username: 'webDev',
        password: 'webDev@prod'
    };
}
