import { Injectable } from '@angular/core';
import { OrderService } from '../../services/core/services/order.service';
import { CaseStore } from '../../shared/ui-services/create-case.service';
import { DDLListModal } from '../../services/shared/classes/case-modals/case-modal';
import { RecordType } from '../../shared/enums/app-enums';
import { AppAuthService } from '../../services/core/services/app-auth.service';

@Injectable({
  providedIn: 'root',
})
export class CaseBaseService {
  constructor(
    private orderService: OrderService,
    private caseService: CaseStore,
    private appAuth: AppAuthService
  ) {}

  getServerData() {
    this.orderService.getCaseTypes().subscribe((result) => {
      if (result.body.success) {
        this.caseService.setCaseDropDownsDataSource(
          result.body.result.data as DDLListModal[], RecordType.GET_CASE_TYPE
        );
      }
    });
    this.appAuth.orderToken.subscribe(resp => {
      if (resp !== null && resp.result !== null && resp.result.token) {
        this.getOrderServicesData();
      }
    });
  }

  getOrderServicesData() {
    this.orderService.getShipmentTerms().subscribe((result) => {
      if (result.body.success) {
        this.caseService.setCaseDropDownsDataSource(
          result.body.result.data as DDLListModal[], RecordType.SHIPMENT_TERM
        );
      }
    });

    this.orderService.getShipmentModes().subscribe((result) => {
      if (result.body.success) {
        this.caseService.setCaseDropDownsDataSource(
          result.body.result.data as DDLListModal[], RecordType.SHIPMENT_MODE
        );
      }
    });

    this.orderService.getShipmentAgents().subscribe((result) => {
      if (result.body.success) {
        this.caseService.setCaseDropDownsDataSource(
          result.body.result.data as DDLListModal[], RecordType.SHIPMENT_AGENT
        );
      }
    });
  }

}
