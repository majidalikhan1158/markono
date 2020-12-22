import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ResponseModal } from '../../shared/classes/response-modal';
import { QueryStringParameters } from '../../shared/classes/query-string-parameter';
import { ProductDetailsVM } from 'src/app/modules/shared/models/create-case';
import { HelperService } from './helper.service';
import { ProductResponseModal } from '../../shared/classes/product-modals/product-modals';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: ApiHttpService,
    private endPoint: ApiEndpointsService,
    private helper: HelperService
  ) { }

  public getLiveVersion = (
    modal: ProductDetailsVM
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

  public getProductVersions = (isbn: string): Observable<HttpResponse<ResponseModal>> => {
    const url = this.helper.createUrlWithQueryParameters(
      this.endPoint.getProductVersionUrl(),
      (qs: QueryStringParameters) => {
        qs.push('isbn', isbn);
      }
    );
    return this.http.get(url);
  }

  public getProducts = (isbn: string, versionNo: string, expand: string): Observable<HttpResponse<ResponseModal>> => {
    const url = this.helper.createUrlWithQueryParameters(
      this.endPoint.getProductsUrl(),
      (qs: QueryStringParameters) => {
        qs.push('isbn', isbn);
        qs.push('versionNo', versionNo);
        qs.push('expand', expand);
      }
    );
    return this.http.get(url);
  }

  getProductGroups = (reqObj): Observable<HttpResponse<ProductResponseModal>> => {
    const url = this.endPoint.getProductGroupUrl();
    const queryParams = `$filter=printType eq '${reqObj.printType}' and isDeleted eq ${reqObj.isDeleted}&$select=id,productName`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getCoverMaterialWeight = (reqObj): Observable<HttpResponse<ProductResponseModal>> => {
    const url = this.endPoint.getCoverMaterialWeightUrl();
    const queryParams = `$filter=printType eq '${reqObj.printType}' and ComponentType eq '${reqObj.componentType}'
     and isDeleted eq ${reqObj.isDeleted} &$select=paperWeight,paperMaterial,paperBrand`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getFinishingTypes = (reqObj): Observable<HttpResponse<ProductResponseModal>> => {
    const url = this.endPoint.getFinishingTypeUrl();
    const queryParams = `$filter=ComponentType eq '${reqObj.componentType}'
     and isDeleted eq ${reqObj.isDeleted} &$select=finishingName`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getBindingTypes = (reqObj): Observable<HttpResponse<ProductResponseModal>> => {
    const url = this.endPoint.getBindingTypeUrl();
    const queryParams = `$filter=printType eq null and sellToNo eq '${reqObj.sellToNo ?? null}'
    or null eq null and isDeleted eq ${reqObj.isDeleted} &$select=bindingName`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getProductsForChildIsbn = (reqObj): Observable<HttpResponse<ProductResponseModal>> => {
    const url = this.endPoint.getProductsUrl();
    const queryParams = `$filter=contains(isbn,'${reqObj.isbn}')
     and deleted eq ${reqObj.isDeleted} &$select=id,isbn,versionNo`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getVersions = (reqObj): Observable<HttpResponse<ProductResponseModal>> => {
    const url = this.endPoint.getProductsUrl();
    const queryParams = `$filter=isbn eq '${reqObj.isbn}'
     &$select=id,versionNo,createdDateTime,createdBy,versionDescription`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }
}
