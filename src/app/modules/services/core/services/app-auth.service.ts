import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { Constants } from '../../config/constants';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiAuthToken } from '../../shared/classes/Auth/auth-token';
import { TokenType } from 'src/app/modules/shared/enums/app-enums';
import { StorageKeys } from 'src/app/modules/shared/enums/app-constants';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppAuthService {
  public orderToken: Observable<ApiAuthToken>;
  public productToken: Observable<ApiAuthToken>;
  private orderTokenSubject = new BehaviorSubject<ApiAuthToken>(null);
  private productTokenSubject = new BehaviorSubject<ApiAuthToken>(null);
  private storagePrefix = StorageKeys.SUFFIX;
  constructor(
    private http: ApiHttpService,
    private endPoint: ApiEndpointsService,
    private constants: Constants
  ) {
    this.orderToken = this.orderTokenSubject.asObservable();
    this.productToken = this.productTokenSubject.asObservable();
  }

  public getTokenFromServer = (tokenType: TokenType): Observable<HttpResponse<any>> =>
    tokenType === TokenType.ORDER ?
    this.getOrderToken() :
    this.getProductToken()

  public getOrderToken = (): Observable<HttpResponse<any>> =>
     this.http.post(this.endPoint.getOrderServicesTokenUrl(), this.constants.AUTH_CRED_ORDER_TOKEN)

  public getProductToken = (): Observable<HttpResponse<any>> =>
     this.http.post(this.endPoint.getProductServicesTokenUrl(), this.constants.AUTH_CRED_PRODUCT_TOKEN)

  public saveToken = (resp: ApiAuthToken, tokenType: TokenType) => {
    if (tokenType === TokenType.ORDER) {
      this.orderTokenSubject.next(resp);
      localStorage.setItem(
        `${this.storagePrefix}_${StorageKeys.ORDER_TOKEN_EXPIRY}`,
        resp.result.expire
      );
      localStorage.setItem(
        `${this.storagePrefix}_${StorageKeys.ORDER_TOKEN}`,
        resp.result.token
      );
    } else {
      this.productTokenSubject.next(resp);
      localStorage.setItem(
        `${this.storagePrefix}_${StorageKeys.PRODUCT_TOKEN_EXPIRY}`,
        resp.result.expire
      );
      localStorage.setItem(
        `${this.storagePrefix}_${StorageKeys.PRODUCT_TOKEN}`,
        resp.result.token
      );
    }

  }

  public getToken = (tokenType: TokenType): any => {
    const token = this.isTokenExist(tokenType);
    if (token && !this.isTokenExpired(tokenType)) {
      return token;
    }
    return '';
  }

  private getExpiresAt(tokenType: TokenType): Date {
    const tokenKey =
      tokenType === TokenType.ORDER
        ? StorageKeys.ORDER_TOKEN_EXPIRY
        : StorageKeys.PRODUCT_TOKEN_EXPIRY;
    const storageKey = `${this.storagePrefix}_${tokenKey}`;
    let expiresAtStr: string = null;
    let expiresAtDat: Date = null;
    expiresAtStr = localStorage.getItem(storageKey);
    if (expiresAtStr) {
      expiresAtDat = new Date(expiresAtStr);
    }
    return expiresAtDat;
  }

  public isTokenExpired = (tokenType: TokenType): boolean => {
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

  private isTokenExist = (tokenType: TokenType): string => {
    const tokenKey =
      tokenType === TokenType.ORDER
        ? StorageKeys.ORDER_TOKEN
        : StorageKeys.PRODUCT_TOKEN;
    const token = localStorage.getItem(`${this.storagePrefix}_${tokenKey}`);
    return token;
  }

  private getRemaining = (tokenType: TokenType): number => {
    let remaining = 0;
    let now = 0;
    let max: Date = null;
    now = Date.now();
    max = this.getExpiresAt(tokenType);

    if (!max) {
      return null;
    }
    remaining = max.getTime() - now;
    if (remaining <= 0) {
      return null;
    }
    return remaining;
  }
}
