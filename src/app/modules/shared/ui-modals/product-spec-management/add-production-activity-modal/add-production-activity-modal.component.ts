import { Component, EventEmitter, OnInit, Output, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UIModalID } from '../../../enums/app-constants';
import { ModalService } from '../../../ui-services/modal.service';
import { ProductionActivities } from '../../../models/estimation';

@Component({
  selector: 'app-add-production-activity-modal',
  templateUrl: './add-production-activity-modal.component.html',
  styleUrls: ['./add-production-activity-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProductionActivityModalComponent implements OnInit, OnDestroy {
  @Output() acceptEvent = new EventEmitter<ProductionActivities>();
  productionActivityVM: ProductionActivities;
  constructor(private modalService: ModalService) {
    if (!this.productionActivityVM) {
      this.productionActivityVM = this.getDefaultData();
    }
   }

  ngOnInit() {
  }

  getDefaultData = (): ProductionActivities => {
    return {
      ProductionProcesses: [],
      Id: '',
      ComponentsBreakdownId: '',
      EstimationCaseDetailId: '',
      Dept: '',
      Type: '',
      Qty: 0,
      Layout: '',
      ProcessCode: '',
      Activity: '',
      Unit: 0,
      Duration: 0,
      UnitCost: 0,
      NewUnitCost: 0,
      TotalEstCost: 0,
      ComponentBreakdownSNo: '',
      SNo: 0,
      Deleted: false,
      SheetID: '',
      CreatedBy: '',
      CreatedDateTime: new Date(),
      UpdatedBy: '',
      UpdatedDateTime: new Date(),
    };
  }

  addActivity = () => {
    this.acceptEvent.emit(this.productionActivityVM);
    this.modalService.close(UIModalID.ADD_PRODUCTION_ACTIVITIES_MODAL);
  }

  close = () => {
    this.modalService.close(UIModalID.ADD_PRODUCTION_ACTIVITIES_MODAL);
  }

  ngOnDestroy(): void {
    this.productionActivityVM = null;
  }

}
