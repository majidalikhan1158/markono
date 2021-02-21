// Angular Modules
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
  })
export class Constants {
    // http://192.168.254.60/
    public readonly API_BASE_ADDRESS: string =  'https://api.markono.com/';
    public readonly API_ENDPOINT_LIVE: string = 'app.markono.com';
    public readonly API_ENDPOINT_ORDER_SERVICES: string = 'OrderServicesDev/api/';
    public readonly API_ENDPOINT_PRODUCT_SERVICES: string = 'ProductServicesDev/api/';
    public readonly API_ENDPOINT_ESTIMATION_SERVICES: string = 'EstimationServicesDev/api/';
    public readonly API_ENDPOINT_EMOTION_SERVICES: string = 'eMotionAPIDev/api/';
    public readonly API_ENDPOINT_SHOP_FLOOR_SERVICES: string = `${environment.SHOP_FLOOR_CONTEXT_PATH}/api/`;
    public readonly AUTH_CRED_ORDER_TOKEN = {
        username: 'webDev',
        password: '@webdev!'
    };
    public readonly AUTH_CRED_PRODUCT_TOKEN = {
        username: 'webDev',
        password: 'webDev@prod'
    };
    public readonly AUTH_CRED_ESTIMATION_TOKEN = {
        username: 'webDev',
        password: 'webDev@est'
    };
    public readonly AUTH_CRED_SHOP_FLOOR_COLLECTION = {
        username: 'operator1',
        password: 'AhET0@!D',
        grant_type: 'password',
        client_id: 'mpmui'
    };
    public readonly AUTH_CRED_EMOTION_TOKEN = {
        username: 'TestLogin',
        password: 'markono'
    };
}
