import { Injectable } from '@angular/core';
import { AppAuthService } from './app-auth.service';
import { TokenType } from 'src/app/modules/shared/enums/app-enums';
import { ApiAuthToken } from '../../shared/classes/Auth/auth-token';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenConfigService {
  constructor(private appAuth: AppAuthService) {}

  init() {
    // let promise = new Promise(null);
    // if (this.appAuth.isTokenExpired(TokenType.ORDER)) {
    //   promise = this.appAuth.getOrderToken()
    //   .toPromise()
    //   .then(token => {
    //     this.appAuth.saveToken(
    //       token.body as ApiAuthToken,
    //       TokenType.ORDER
    //     );
    //   });
    // }
    // if (this.appAuth.isTokenExpired(TokenType.PRODUCT)) {
    //   promise = this.appAuth.getProductToken()
    //   .toPromise()
    //   .then(token => {
    //     this.appAuth.saveToken(
    //       token.body as ApiAuthToken,
    //       TokenType.PRODUCT
    //     );
    //   });
    // }
    // return promise;
  }
}
