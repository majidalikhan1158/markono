import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { Observable } from 'rxjs';
import { CostCategoryResponseModal, ResponseModal } from '../../shared/classes/response-modal';
import { HttpResponse } from '@angular/common/http';
import { ProductResponseModal } from '../../shared/classes/product-modals/product-modals';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor(
    private http: ApiHttpService,
    private endPoint: ApiEndpointsService
  ) { }

  public getCaseTypes = (): Observable<HttpResponse<ResponseModal>> =>
    this.http.get(this.endPoint.getCaseTypeUrl())

  public getCustomerDetail = (request: any): Observable<HttpResponse<ResponseModal>> =>
    this.http.post(this.endPoint.getCustomerDetailUrl(), request)

  public getShipmentModes = (): Observable<HttpResponse<ResponseModal>> =>
    this.http.get(this.endPoint.getShipmentModeUrl())

  public getShipmentTerms = (): Observable<HttpResponse<ResponseModal>> =>
    this.http.get(this.endPoint.getShipmentTermUrl())

  public getShipmentAgents = (): Observable<HttpResponse<ResponseModal>> =>
    this.http.get(this.endPoint.getShipmentAgentUrl())

  public getMiscBillingCostCategory = (): Observable<HttpResponse<CostCategoryResponseModal>> =>
    this.http.get(this.endPoint.getMiscBillingCostCategoryUrl())

  public getShippingInfoCostCategory = (): Observable<HttpResponse<CostCategoryResponseModal>> =>
    this.http.get(this.endPoint.getShippingInfoCostCategoryUrl())

  public createCase = (request: any): Observable<HttpResponse<ResponseModal>> =>
    this.http.post(this.endPoint.getCreateCaseUrl(), request)

  public createShipment = (request: any): Observable<HttpResponse<ResponseModal>> =>
    this.http.post(this.endPoint.getCreateShipmentUrl(), request)

  // order-management Module
  public getAllOrders = (yourReference: string = '', pagerTop: number = 10, pagerSkip: number = 0): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getAllOrders();
    const YourReference = yourReference === null || yourReference === '' ? `yourReference eq '${yourReference}'or null eq null` : `contains(yourReference, '${yourReference}')`;
    const queryParams = `$top=${pagerTop}&$skip=${pagerSkip}&$filter=${YourReference} and isDeleted ne true and orderNo ne null and CaseDetail/all(cd:cd/CurrentActivityStatusCode eq '207')&$orderby=createdDateTime desc`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getOrderListTotalRecord = (yourReference: string): Observable<HttpResponse<any>> => {
    const YourReference = yourReference === null || yourReference === '' ? `YOURREFERENCE eq '${yourReference}'or null eq null` : `contains(YOURREFERENCE, '${yourReference}')`;
    const url = `${this.endPoint.getAllOrders()}/$count?$filter=${YourReference} and isDeleted ne true and orderNo ne null and CaseDetail/all(cd:cd/CurrentActivityStatusCode eq '207')`;

    return this.http.get(url);
  }

  public getAllOrderDetails = (jobNo: string = '', pagerTop: number = 10, pagerSkip: number = 0): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getAllOrderDetails();
    const JobNo = jobNo === null || jobNo === '' ? `JOBNO eq '${jobNo}'or null eq null` : `contains(JOBNO, '${jobNo}')`;
    const queryParams = `$top=${pagerTop}&$skip=${pagerSkip}&$filter=${JobNo} and currentActivityStatusCode in ('207') eq true and isDeleted ne true&$orderby=jobNo desc`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getAllJobListTotalRecord = (jobNo: string): Observable<HttpResponse<any>> => {
    const JobNo = jobNo === null || jobNo === '' ? `JOBNO eq '${jobNo}'or null eq null` : `contains(JOBNO, '${jobNo}')`;
    const url = `${this.endPoint.getAllOrderDetails()}/$count?$filter=${JobNo} and currentActivityStatusCode in ('207') eq true and isDeleted ne true`;

    return this.http.get(url);
  }

  public getPlanningOrders = (jobno: string = '', top: number = 0, skip: number = 0,
                              isPreprep: boolean = false): Observable<HttpResponse<any>> => {
    const JOBNO = jobno === null || jobno === '' ? `JOBNO eq '${jobno}'or null eq null` : `contains(JOBNO, '${jobno}')`;
    const url = this.endPoint.getPlanningOrder();
    const queryParams = isPreprep ? `$top=${top}&$skip=${skip}&$filter=currentActivityStatusCode in ('207','301') eq true and isDeleted ne true&$orderby=jobNo desc`
    : `$top=${top}&$skip=${skip}&$filter=${JOBNO} and currentActivityStatusCode in ('101','102','103','201','202','203','204','205','206') eq false and isDeleted ne true&$orderby=jobNo desc`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  getPlannigListTotalRecord = (jobno: string, isPreprep: boolean = false): Observable<HttpResponse<any>> => {
    const JOBNO = jobno === null || jobno === '' ? `JOBNO eq '${jobno}'or null eq null` : `contains(JOBNO, '${jobno}')`;
    const url =  isPreprep ? `${this.endPoint.getPlanningOrder()}/$count?$filter=${JOBNO}  and currentActivityStatusCode in ('207','301') eq false and isDeleted ne true` :
    `${this.endPoint.getPlanningOrder()}/$count?$filter=${JOBNO}  and currentActivityStatusCode in ('101','102','103','201','202','203','204','205','206') eq false and isDeleted ne true`;
    return this.http.get(url);
  }

  public getPlanningJobDetail = (jobNo: any): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getPlanningOrder();
    const queryParams = `$filter=JobNo eq '${jobNo}'`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  public getCaseDetail = (jobNo: any): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getCaseDetails().replace('Job_No', jobNo).replace('Job_No', jobNo);
    return this.http.get(url);
  }

  public getOrderDeatils = (request: any): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getOrderDeatils();
    const queryParams = `$filter=id eq ${request} and isDeleted ne true & $expand = CaseDetail($filter=isDeleted ne true ;$expand = CaseDetailAdditional($orderby=LnNo); $orderby = LnNo),OtherCharge,DepartmentSpecialInstructions`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  public getShipmentDetails = (request: any): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getShipmentDetails();
    const queryParams = `$filter=caseID eq ${request} and isDeleted eq false &$expand=ShipmentDetail($filter= isDeleted eq false;$orderby=LnNo),MiscBilling&$orderby=CreatedDateTime`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  public getAllIssueOrders = (): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getAllOrders();
    const queryParams = `?$top=100&$filter=isDeleted ne true and orderNo ne null and CaseDetail/any(cd:cd/CurrentActivityStatusCode in ('21','22','23','24','25'))&$expand=CaseDetail &$orderby=createdDateTime desc`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  public getShipmentModesList = (): Observable<HttpResponse<ResponseModal>> =>
    this.http.get(this.endPoint.getShipmentModesList())

  public getShipmentAgentsList = (): Observable<HttpResponse<ResponseModal>> =>
    this.http.get(this.endPoint.getShipmentAgentsList())

  public getShipmentTermsList = (): Observable<HttpResponse<ResponseModal>> =>
    this.http.get(this.endPoint.getShipmentTermsList())

  getShipToCodes(value: string) {
    const url = `${this.endPoint.getShipToCodeUrl()}?$filter=code eq '${value}'`;
    return this.http.get(url);
  }

  getProductSpecData = (caseDetailNo: string) => {
    const url = `${this.endPoint.getProductSpecViaCaseDetailUrl().replace('CASE_DETAIL_NO', caseDetailNo)}`;
    return this.http.get(url);
  }

  createCaseLayout = (reqObj) => {
    const url = this.endPoint.getCreateCaseLayoutUrl();
    return this.http.post(url, reqObj);
  }
}
