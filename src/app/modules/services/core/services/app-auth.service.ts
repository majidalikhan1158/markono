import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { Constants } from '../../config/constants';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiAuthToken, ShopFloorApiToken } from '../../shared/classes/Auth/auth-token';
import { TokenType } from 'src/app/modules/shared/enums/app-enums';
import { StorageKeys } from 'src/app/modules/shared/enums/app-constants';
import { HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppAuthService {
  orderToken: Observable<ApiAuthToken>;
  productToken: Observable<ApiAuthToken>;
  shopFloorToken: Observable<ShopFloorApiToken>;
  estimationToken: Observable<ApiAuthToken>;

  private orderTokenSubject = new BehaviorSubject<ApiAuthToken>(null);
  private productTokenSubject = new BehaviorSubject<ApiAuthToken>(null);
  private shopFloorTokenSubject = new BehaviorSubject<ShopFloorApiToken>(null);
  private estimationTokenSubject = new BehaviorSubject<ApiAuthToken>(null);

  constructor(
    private http: ApiHttpService,
    private endPoint: ApiEndpointsService,
    private constants: Constants
  ) {
    this.orderToken = this.orderTokenSubject.asObservable();
    this.productToken = this.productTokenSubject.asObservable();
    this.shopFloorToken = this.shopFloorTokenSubject.asObservable();
    this.estimationToken = this.estimationTokenSubject.asObservable();
  }

  getTokenFromServer = (tokenType: TokenType): Observable<HttpResponse<any>> =>
    tokenType === TokenType.ORDER
      ? this.getOrderToken()
      : tokenType === TokenType.PRODUCT
      ? this.getProductToken()
      : tokenType === TokenType.ESTIMATION
      ? this.getEstimationToken()
      : this.getShopFloorToken()

  getOrderToken = (): Observable<HttpResponse<any>> =>
    this.http.post(
      this.endPoint.getOrderServicesTokenUrl(),
      this.constants.AUTH_CRED_ORDER_TOKEN
    )

  getProductToken = (): Observable<HttpResponse<any>> =>
    this.http.post(
      this.endPoint.getProductServicesTokenUrl(),
      this.constants.AUTH_CRED_PRODUCT_TOKEN
    )

  getEstimationToken = (): Observable<HttpResponse<any>> =>
    this.http.post(
      this.endPoint.getEstimationServicesTokenUrl(),
      this.constants.AUTH_CRED_ESTIMATION_TOKEN
    )

  getShopFloorToken = (): Observable<HttpResponse<any>> => {
    const body = new HttpParams()
    .set('username', 'operator1')
    .set('password', 'AhET0@!D')
    .set('grant_type', 'password')
    .set('client_id', 'mpmui');
    return this.http.post(
      this.endPoint.getShopFloorTokenUrl(),
      body.toString()
    );
  }

  saveToken = (resp: any, tokenType: TokenType) => {
    if (tokenType === TokenType.ORDER) {
      this.orderTokenSubject.next(resp as ApiAuthToken);
      localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.ORDER_TOKEN_EXPIRY}`, resp.result.expire);
      localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.ORDER_TOKEN}`, resp.result.token);
    } else if (tokenType === TokenType.PRODUCT) {
      this.productTokenSubject.next(resp as ApiAuthToken);
      localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.PRODUCT_TOKEN_EXPIRY}`, resp.result.expire);
      localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.PRODUCT_TOKEN}`, resp.result.token);
    } else if (tokenType === TokenType.SHOPFLOOR) {
      const tokenObj: ShopFloorApiToken = {
        token: resp['access_token'],
        expiry: this.getTokenExpiryTime(resp['expires_in'])
      };
      this.shopFloorTokenSubject.next(tokenObj);
      localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.SHOP_FLOOR_TOKEN}`, tokenObj.token);
      localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.SHOP_FLOOR_TOKEN_EXPIRY}`, tokenObj.expiry.toString());
    } else if (tokenType === TokenType.ESTIMATION) {
      this.estimationTokenSubject.next(resp as ApiAuthToken);
      localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.ESTIMATION_TOKEN_EXPIRY}`, resp.result.expire);
      localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.ESTIMATION_TOKEN}`, resp.result.token);
    }
  }

  private getTokenExpiryTime = (expirySeconds: number) => {
    const t = new Date();
    t.setMinutes(t.getMinutes() + (expirySeconds / 60));
    return  new Date(t.toISOString());
  }

  getToken = (tokenType: TokenType): string => {
    const token = this.isTokenExist(tokenType);
    if (token && !this.isTokenExpired(tokenType)) {
      return token;
    }
    return '';
  }

  private isTokenExist = (tokenType: TokenType): string => {
    return localStorage.getItem(`${StorageKeys.SUFFIX}_${this.getTokenKey(tokenType)}`);
  }

  isTokenExpired = (tokenType: TokenType): boolean => {
    const expiresAt = this.getExpiresAt(tokenType);
    if (!expiresAt) {
      return true;
    }
    const timeDiff = expiresAt.getTime() - Date.now() - 60000; // 1 min
    if (timeDiff < 0) {
      return true;
    }
    return false;
  }

  private getExpiresAt(tokenType: TokenType): Date {
    const storageKey = `${StorageKeys.SUFFIX}_${this.getTokenExpiryKey(tokenType)}`;
    let expiresAtStr: string = null;
    let expiresAtDat: Date = null;
    expiresAtStr = localStorage.getItem(storageKey);
    if (expiresAtStr) {
      expiresAtDat = new Date(expiresAtStr);
    }
    return expiresAtDat;
  }

  private getTokenKey = (tokenType: TokenType) => {
    if (tokenType === TokenType.ORDER) {
      return StorageKeys.ORDER_TOKEN;
    } else if (tokenType === TokenType.PRODUCT) {
      return StorageKeys.PRODUCT_TOKEN;
    } else if (tokenType === TokenType.SHOPFLOOR) {
      return StorageKeys.SHOP_FLOOR_TOKEN;
    } else if (tokenType === TokenType.ESTIMATION) {
      return StorageKeys.ESTIMATION_TOKEN;
    }
    return '';
  }

  private getTokenExpiryKey = (tokenType: TokenType) => {
    if (tokenType === TokenType.ORDER) {
      return StorageKeys.ORDER_TOKEN_EXPIRY;
    } else if (tokenType === TokenType.PRODUCT) {
      return StorageKeys.PRODUCT_TOKEN_EXPIRY;
    } else if (tokenType === TokenType.SHOPFLOOR) {
      return StorageKeys.SHOP_FLOOR_TOKEN_EXPIRY;
    } else if (tokenType === TokenType.ESTIMATION) {
      return StorageKeys.ESTIMATION_TOKEN_EXPIRY;
    }
    return '';
  }
}
