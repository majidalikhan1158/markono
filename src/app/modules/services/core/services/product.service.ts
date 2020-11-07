import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ResponseModal } from '../../shared/classes/response-modal';
import { QueryStringParameters } from '../../shared/classes/query-string-parameter';
import { ProductDetailsViewModel } from 'src/app/modules/shared/models/create-case';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: ApiHttpService,
    private endPoint: ApiEndpointsService,
    private helper: HelperService
  ) {}

  public getLiveVersion = (
    modal: ProductDetailsViewModel
  ): Observable<HttpResponse<ResponseModal>> => {
    const url = this.helper.createUrlWithQueryParameters(
      this.endPoint.getLiveVersion(),
      (qs: QueryStringParameters) => {
        qs.push('ISBN', modal.isbn);
        qs.push('PrintType', modal.printType);
      }
    );
    return this.http.get(url);
  }
}
