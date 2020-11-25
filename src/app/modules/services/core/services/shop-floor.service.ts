import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModal, ShopFloorResponseModal } from '../../shared/classes/response-modal';
import { ApiEndpointsService } from './api-endpoints.service';
import { ApiHttpService } from './api-http.service';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class ShopFloorService {

  constructor(
    private http: ApiHttpService,
    private endPoint: ApiEndpointsService
  ) {}

  getMachines = (): Observable<HttpResponse<ShopFloorResponseModal>> =>
  this.http.get(this.endPoint.getMachinesList())

  getMachineScheduleJobs = (endPoint: string): Observable<HttpResponse<ShopFloorResponseModal>> =>
  this.http.get(endPoint)

  setScheduleJob = (endPoint: string): Observable<HttpResponse<any>> =>
  this.http.post(endPoint, null)

  getCurretnMachineJob = (endPoint: string): Observable<HttpResponse<ShopFloorResponseModal>> =>
  this.http.get(endPoint)

  getCurrentJobUnits = (endPoint: string): Observable<HttpResponse<ShopFloorResponseModal>> =>
  this.http.get(endPoint)

  setMachineAction = (endPoint: string): Observable<HttpResponse<any>> =>
  this.http.post(endPoint, null)

  getMachineStatus = (endPoint: string): Observable<HttpResponse<ShopFloorResponseModal>> =>
  this.http.get(endPoint)

  setMachineActionStatus = (endPoint: string): Observable<HttpResponse<any>> =>
  this.http.post(endPoint, null)

  setMachineJobActionState = (endPoint: string): Observable<HttpResponse<any>> =>
  this.http.post(endPoint, null)
}
