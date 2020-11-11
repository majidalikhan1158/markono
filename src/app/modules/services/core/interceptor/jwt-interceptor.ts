import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { filter, take, switchMap, catchError } from 'rxjs/operators';
import { TokenType } from 'src/app/modules/shared/enums/app-enums';
import { Constants } from '../../config/constants';
import { AppAuthService } from '../services/app-auth.service';
import { Endpoints } from '../../config/endpoints';
import { ApiAuthToken } from '../../shared/classes/Auth/auth-token';
@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  private excludedApiCalls = [
    Endpoints.authentication.getOrderServicesToken,
    Endpoints.authentication.getProductServicesToken,
  ];
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<
    string
  >(null);
  private tokenType: TokenType;
  constructor(private constants: Constants, private appAuth: AppAuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.tokenType = (request.url.includes(this.constants.API_ENDPOINT_ORDER_SERVICES) ||
    request.url.includes(this.constants.API_ENDPOINT_LIVE))

      ? TokenType.ORDER
      : TokenType.PRODUCT;
    request = this.addAuthenticationToken(request, this.tokenType);
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(err);
        }
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.refreshTokenInProgress) {
      // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
      // – which means the new token is ready and we can retry the request again
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          console.log(token);
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
          this.appAuth.saveToken(result.body as ApiAuthToken, this.tokenType);
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

  addAuthenticationToken(request, tokenType: TokenType) {
    const userToken = this.appAuth.getToken(tokenType);
    // If token is null this means that user is not logged in
    // And we return the original request
    if (!userToken) {
      return request;
    }
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
         'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
         'Access-Control-Allow-Origin': '*'
      },
    });
  }
}
