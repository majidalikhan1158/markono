import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, throwError as observableThrowError } from 'rxjs';
import { filter, take, switchMap, catchError } from 'rxjs/operators';
import { TokenType } from 'src/app/modules/shared/enums/app-enums';
import { Constants } from '../../config/constants';
import { AppAuthService } from '../services/app-auth.service';
import { Endpoints } from '../../config/endpoints';
import { environment } from 'src/environments/environment';
import { StorageKeys } from 'src/app/modules/shared/enums/app-constants';
@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  private excludedApiCalls = [
    Endpoints.authentication.getOrderServicesToken,
    Endpoints.authentication.getProductServicesToken,
    Endpoints.authentication.getShopFloorCollectionToken
  ];
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<
    string
  >(null);
  private tokenType: TokenType;
  constructor(private constants: Constants, private appAuth: AppAuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.setTokenType(request);
    request = this.addAuthenticationToken(request, this.tokenType);

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Error(request, next);
        } else {
          if (err.error) {
            localStorage.setItem(`${StorageKeys.SUFFIX}_${StorageKeys.APP_ERRORS}`, JSON.stringify(err.error));
          }
          return observableThrowError(err);
        }
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    this.setTokenType(request);
    if (this.refreshTokenInProgress) {
      // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
      // – which means the new token is ready and we can retry the request again
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          return next.handle(
            this.addAuthenticationToken(request, this.tokenType)
          );
        })
      );
    } else {
      this.refreshTokenInProgress = true;
      // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.refreshTokenSubject.next(null);
      // Call auth.refreshAccessToken(this is an Observable that will be returned)
      return this.appAuth.getTokenFromServer(this.tokenType).pipe(
        switchMap((result: any) => {
          // When the call to refreshToken completes we reset the refreshTokenInProgress to false
          // for the next time the token needs to be refreshed
          this.refreshTokenInProgress = false;
          this.appAuth.saveToken(result.body, this.tokenType);
          return next.handle(
            this.addAuthenticationToken(request, this.tokenType)
          );
        }),
        catchError((err) => {
          this.refreshTokenInProgress = false;
          return throwError(err);
        })
      );
    }
  }

  addAuthenticationToken(request: HttpRequest<any>, tokenType: TokenType) {
    const userToken = this.appAuth.getToken(tokenType);
    let contentType = 'application/json';
    if (request.url.includes(environment.SHOP_FLOOR_AUTH_REALM)) {
      contentType = 'application/x-www-form-urlencoded';
      return request.clone({
        setHeaders: {
          'Content-Type': `${contentType}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        },
      });
    } else {
      return request.clone({
        setHeaders: {
          'Content-Type': `${contentType}`,
          Authorization: `Bearer ${userToken}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        },
      });
      // if (userToken) {
      //   return request.clone({
      //     setHeaders: {
      //       'Content-Type': `${contentType}`,
      //       Authorization: `Bearer ${userToken}`,
      //       'Access-Control-Allow-Origin': '*',
      //       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      //       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      //     },
      //   });
      // } else {
      //   return request.clone({
      //     setHeaders: {
      //       'Content-Type': `${contentType}`,
      //       'Access-Control-Allow-Origin': '*',
      //       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      //       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      //     },
      //   });
      // }
    }
  }

  setTokenType = (request: HttpRequest<any>) => {
    const url = request.url;
    if (url.includes(this.constants.API_ENDPOINT_ORDER_SERVICES) ||
        url.includes(this.constants.API_ENDPOINT_LIVE) ) {
      this.tokenType = TokenType.ORDER;
    } else if (url.includes(this.constants.API_ENDPOINT_PRODUCT_SERVICES)) {
      this.tokenType = TokenType.PRODUCT;
    } else if (url.includes(this.constants.API_ENDPOINT_SHOP_FLOOR_SERVICES)) {
      this.tokenType = TokenType.SHOPFLOOR;
    } else if (url.includes(this.constants.API_ENDPOINT_ESTIMATION_SERVICES)) {
      this.tokenType = TokenType.ESTIMATION;
    }
  }
}
