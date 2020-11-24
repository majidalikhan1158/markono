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

  public getMachines = (): Observable<HttpResponse<ShopFloorResponseModal>> =>
  this.http.get(this.endPoint.getMachinesList())

  public getMachineScheduleJobs = (endPoint: string): Observable<HttpResponse<ShopFloorResponseModal>> =>
  this.http.get(endPoint)
}
