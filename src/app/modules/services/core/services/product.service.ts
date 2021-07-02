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
import { ApprovalParam, CaseActivityRequest, GetPaperRequest, LayoutPrepVM, ReleaseRequest, UpdateCaseProductFileCheckParam } from 'src/app/modules/shared/models/estimation';
import { version } from 'moment';

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

  getProductDeatils = (isbn: string, ver: number): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getProductsUrl();
    const urlWithParams = `${url}?$filter=isbn eq '${isbn}' and printType eq '${ver}'&$expand=productDetail&$orderby=ActiveVersion desc&$top=1`;
    return this.http.get(decodeURI(urlWithParams));
  }

  // tslint:disable-next-line:no-shadowed-variable
  getProductRevisions = (isbn: string, version: string): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getProductsUrl();
    const urlWithParams = `${url}?$filter=isbn eq '${isbn}' and versionNo eq '${version}'&$expand=productDetail`;
    return this.http.get(decodeURI(urlWithParams));
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
     and deleted eq ${reqObj.isDeleted} &$select=id,isbn,versionNo,revision`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getVersions = (reqObj): Observable<HttpResponse<ProductResponseModal>> => {
    const url = this.endPoint.getProductsUrl();
    const queryParams = `$filter=isbn eq '${reqObj.isbn}'
     &$select=id,versionNo,revision,createdDateTime,createdBy,versionDescription`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getFileCheckConfig = (): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getFileCheckConfigUrl();
    return this.http.get(url);
  }

  getFileCheckConfigForFilePrep = (productId: string): Observable<HttpResponse<any>> => {
    const url = this.endPoint.GetCaseFileCheck().replace('Product_Id', productId);
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
      TxtNumberOfOneColurExtent: reqObj.TxtNoOfOneColourExtent,
      TxtNumberOfTwoColurExtent: reqObj.TxtNoOfTwoColourExtent,
      TxtNumberOfFourColurExtent: reqObj.TxtNoOfFourColourExtent,
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

  createProduct = (reqObj: any, isUpdateButtonCall: boolean = false): Observable<HttpResponse<any>> => {
    const url = isUpdateButtonCall
      ? this.endPoint.getCreateProductRevisionUrl()
      : this.endPoint.getCreateProductUrl();
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

  getProductSpecList = (isbn: string, pagerTop: number, pagerSkip: number): Observable<HttpResponse<any>> => {
    const url = !isbn
      ? this.endPoint.getProductsListUrl().replace('PagerTop', pagerTop.toString()).replace('PagerSkip', pagerSkip.toString())
      : this.endPoint.getSearchProductsUrl().replace('ISBN_PLACEHOLDER', `'${isbn}'`)
      .replace('PagerTop', pagerTop.toString()).replace('PagerSkip', pagerSkip.toString());
    return this.http.get(url);
  }

  getProductListTotalRecord = (isbn: string): Observable<HttpResponse<any>> => {
    const ISBN = isbn === null || isbn === '' ? `ISBN eq '${isbn}'or null eq null` : `contains(ISBN, '${isbn}')`;
    const url = `${this.endPoint.getProductList()}/$count?$filter=${ISBN} and deleted eq false`;

    return this.http.get(url);
  }

  getProductDetails = (reqObj: any): Observable<HttpResponse<any>> => {
    const revisionNoParam = reqObj.RevisionNo ? ` and Revision eq '${reqObj.RevisionNo}'` : '';
    const url = this.endPoint.getProductsUrl();
    const queryParams = `$expand=productDetail,productWebCode,productAdditionalComponent,productVolumeSet,productCD($expand=ProductCDComponent)&
    $filter=isbn eq '${reqObj.isbn}' and VersionNo eq '${reqObj.VersionNo}'${revisionNoParam}&$orderby=Revision desc&$top=1`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getImpositionLayout = (componentType: string): Observable<any> => {
    const url = this.endPoint.getImpositionLayoutUrl();
    const queryParams = `ComponentType=${componentType}`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getLayoutPrepApiData = (reqObj): Observable<HttpResponse<any>> => {
    let reqData;
    if (reqObj.jobNo && reqObj.isPlanningModuleState) {
      reqData = this.endPoint.getEstimationUrlViaCaseDetailUrl().replace('JOB_NO', reqObj.jobNo);
    } else {
      const url = this.endPoint.getEstimationUrl();
      const queryParams = `$filter=ISBNNo eq '${reqObj.productNumber}'and ISBNVersionNo eq '${reqObj.versionNo}' and ISBNRevision eq '${reqObj.Revision}' and EstimationType eq 'Layout' &$expand=Components,ComponentsBreakdown($filter=Deleted ne true),ProductionActivity($filter=Deleted ne true;$expand=ProductionProcesses)`;
      const urlWithParams = `${url}?${queryParams}`;
      reqData = decodeURI(urlWithParams);
    }

    return this.http.get(reqData);
  }

  getPaperList = (reqObj: GetPaperRequest): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getCalculatePaperUrl();
    return this.http.post(url, reqObj);
  }

  setVerifyPrintFileList = (reqObj: UpdateCaseProductFileCheckParam): Observable<HttpResponse<any>> => {
    const url = this.endPoint.UpdateCaseProductFileCheckUrl();
    return this.http.post(url, reqObj);
  }

  setProofApproval = (reqObj: ApprovalParam): Observable<HttpResponse<any>> => {
    const url = this.endPoint.CreateProofApprovalUrl();
    return this.http.post(url, reqObj);
  }

  setRelease = (reqObj: ReleaseRequest): Observable<HttpResponse<any>> => {
    const url = this.endPoint.setReleaseUrl();
    return this.http.post(url, reqObj);
  }

  setCaseActivity  = (reqObj: CaseActivityRequest): Observable<HttpResponse<any>> => {
    const url = this.endPoint.setCaseActivityUrl();
    return this.http.post(url, reqObj);
  }

  createLayoutPrep = (reqObj: any) => {
    const url = this.endPoint.getCreateLayoutPrepUrl();
    return this.http.post(url, reqObj);
  }

  setLayoutReady = (reqObj: any) => {
    const url = this.helper.createUrlWithQueryParameters(
      this.endPoint.setLayoutReadyUrl(),
      (qs: QueryStringParameters) => {
        qs.push('ISBN', reqObj.ISBN);
        qs.push('VersionNo', reqObj.VersionNo);
        qs.push('Revision', reqObj.Revision);
      }
    );
    return this.http.post(url, reqObj);
  }

  getActivitySettingsNotUnitOfList = (): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getActivitySettingsNotUnitOfListUrl();
    return this.http.get(url);
  }

  CalculateProductionProcess = (request) => {
    const url = this.endPoint.getCalculateProductionProcessUrl();
    return this.http.post(url, request);
  }

  getEstimatedPriceProductDetails = (request) => {
    const url = this.endPoint.getEstimatedPriceProductDetailUrl();
    return this.http.post(url, request);
  }

  updateLayoutPrep = (reqObj) => {
    const url = this.endPoint.getUpdateLayoutPrepUrl();
    return this.http.post(url, reqObj);
  }

  getProductDetailViaRevisionNo = (reqObj: any) => {
    const url = this.endPoint.getProductsUrl();
    const queryParams = `$filter=isbn eq '${reqObj.ISBN}' and versionNo eq '${reqObj.VERSIONNO}' and revision eq '${reqObj.REVISIONNO}' &$expand=productDetail`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(urlWithParams);
  }

  getEstimateLayout = (reqObj: {
    ISBNNo: string; ISBNVersionNo: string; ISBNRevision: string; Quantity:
      number
  }): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getEstimateLayoutUrl();
    return this.http.post(url, reqObj);
  }
}
