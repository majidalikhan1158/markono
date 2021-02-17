import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { Observable } from 'rxjs';
import { ResponseModal } from '../../shared/classes/response-modal';
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

  public createCase = (request: any): Observable<HttpResponse<ResponseModal>> =>
    this.http.post(this.endPoint.getCreateCaseUrl(), request)

  public createShipment = (request: any): Observable<HttpResponse<ResponseModal>> =>
    this.http.post(this.endPoint.getCreateShipmentUrl(), request)
  // order-management Module
  public getAllOrders = (): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getAllOrders();
    //const queryParams = `$filter=orderNo ne null`;;
    const queryParams = `?$top=100&$filter=isDeleted ne true and orderNo ne null and CaseDetail/all(cd:cd/CurrentActivityStatusCode eq '207')&$orderby=createdDateTime desc`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  public getOrderDeatils = (request: any): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getOrderDeatils();
    const queryParams = `$filter=id eq ${request} and isDeleted ne true & $expand = CaseDetail($filter=isDeleted ne true ;$expand = CaseDetailAdditional),OtherCharge,SpecialInstructionList`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }
  public getShipmentDetails = (request: any): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getShipmentDetails();
    const queryParams = `$filter=caseID eq ${request}&$expand=ShipmentDetail,MiscBilling`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

  public getAllIssueOrders = (): Observable<HttpResponse<any>> => {
    const url = this.endPoint.getAllOrders();
    //const queryParams = `$filter=orderNo ne null`;;
    const queryParams = `?$top=100&$filter=isDeleted ne true and orderNo ne null and CaseDetail/any(cd:cd/CurrentActivityStatusCode in ('21','22','23','24','25'))&$expand=CaseDetail &$orderby=createdDateTime desc`;
    const urlWithParams = `${url}?${queryParams}`;
    return this.http.get(decodeURI(urlWithParams));
  }

}
