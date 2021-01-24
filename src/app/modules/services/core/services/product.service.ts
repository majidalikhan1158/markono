import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ResponseModal } from '../../shared/classes/response-modal';
import { QueryStringParameters } from '../../shared/classes/query-string-parameter';
import { ProductDetailsVM } from 'src/app/modules/shared/models/create-case';
import { HelperService } from './helper.service';
import { ProductResponseModal, SpineWidthThicknessParamHistory, SpineWidthParamHistory } from '../../shared/classes/product-modals/product-modals';
import { GetPaperRequest, LayoutPrepVM } from 'src/app/modules/shared/models/estimation';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(
    private http: ApiHttpService,
    private endPoint: ApiEndpointsService,
    private helper: HelperService
  ) { }

  getLiveVersion = (
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

  setLiveVersion = (reqObj: { isbn: string; versionNo: string; }) => {
    const url = this.endPoint.setLiveVersion();
    const obj = {
      isbnList: [
        reqObj
      ],
      actionUser: 'CCE'
    };
    return this.http.post(url, obj);
  }

  getProductVersions = (isbn: string): Observable<HttpResponse<ResponseModal>> => {
    const url = this.helper.createUrlWithQueryParameters(
      this.endPoint.getProductVersionUrl(),
      (qs: QueryStringParameters) => {
        qs.push('isbn', isbn);
      }
    );
    return this.http.get(url);
  }

  getProducts = (isbn: string, versionNo: string, expand: string): Observable<HttpResponse<ResponseModal>> => {
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
    const url = this.endPoint.getPaperMaterialUrl();
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

  getFileCheckConfig = (): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getFileCheckConfigUrl();
    return this.http.get(url);
  }

  getThickness = (reqObj: SpineWidthThicknessParamHistory): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getPaperMaterialUrl();
    const queryParams = `$filter=PrintType eq '${reqObj.PrintType}' and ComponentType eq 'Text' and PaperWeight eq '${reqObj.PaperWeight}' and PaperMaterial eq '${reqObj.PaperMaterial}' and PaperBrand eq '${reqObj.PaperBrand}'&$select=thickness`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getUserFileCheck = (productId: string): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getFileCheckUrl();
    const queryParams = `$filter=ProductId eq ${productId} &amp;$expand=fileCheckConfig($select=component,question,remark)`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getSpineWidth = (reqObj: SpineWidthParamHistory): Observable<HttpResponse<ProductResponseModal>> => {
    const obj = {
      noOfColourExtent: reqObj.noOfColourExtent,
      noOfMonoExtent: reqObj.noOfMonoExtent,
      thickness: reqObj.thickness,
      bindingType: reqObj.bindingType
    };
    const url = this.endPoint.getSpineWidthUrl();
    return this.http.post(url, obj);
  }

  getBookWeight = (reqObj: any): Observable<HttpResponse<ProductResponseModal>> => {
    const url = this.endPoint.getBookWeightUrl();
    return this.http.post(url, reqObj);
  }

  createProduct = (reqObj: any): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getCreateProductUrl();
    return this.http.post(url, reqObj);
  }

  getProductId = (reqObj) => {
    const url = this.endPoint.getProductsUrl();
    const queryParams = `$filter=isbn eq '${reqObj.ISBN}' and versionNo eq '${reqObj.versionNo}'
     &$select=id`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  createCheckPrintFile = (reqObj: any): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getCreateCheckPrintFileUrl();
    return this.http.post(url, reqObj);
  }

  getProductSpecList = (): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getProductsUrl();
    return this.http.get(url);
  }

  getProductDetails = (reqObj: any): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getProductsUrl();
    const queryParams = `$expand=productDetail,productWebCode,productAdditionalComponent,productVolumeSet,productCD($expand=ProductCDComponent)&
    $filter=isbn eq '${reqObj.isbn}' and VersionNo eq '${reqObj.VersionNo}'`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getImpositionLayout = (componentType: string): Observable<any>  => {
    const url = this.endPoint.getImpositionLayoutUrl();
    const queryParams = `ComponentType=${componentType}`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getLayoutPrepApiData = (reqObj: { productNumber: string; versionNo: string; }): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getEstimationUrl();
    const queryParams = `$filter=ISBNNo eq '${reqObj.productNumber}'and ISBNVersionNo eq '${reqObj.versionNo}' and EstimationType eq 'Layout' &$expand=Components,ComponentsBreakdown($filter=Deleted ne true),ProductionActivity($filter=Deleted ne true;$expand=ProductionProcesses)`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getPaperList = (reqObj: GetPaperRequest): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getCalculatePaperUrl();
    return this.http.post(url, {postData: reqObj});
  }
}
