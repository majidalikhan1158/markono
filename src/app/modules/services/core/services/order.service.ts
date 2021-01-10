import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { ApiEndpointsService } from './api-endpoints.service';
import { Observable } from 'rxjs';
import { ResponseModal } from '../../shared/classes/response-modal';
import { HttpResponse } from '@angular/common/http';

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
}
